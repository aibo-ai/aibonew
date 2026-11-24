#!/usr/bin/env python3
"""Recover blog posts from the prerendered build and restore them to Neon.

The blogs/case_studies tables went empty in production (Nov 2026) while the
prerendered pages committed in frontend/build/blog/<slug>/index.html still
held every published post. This script rebuilds the rows from that HTML.

  extract  Parse frontend/build/blog/*/index.html (or a git commit's copy)
           into a JSON backup.
  restore  Insert the backup into the `blogs` table. Needs NEON_DATABASE_URL
           in the environment. Skips slugs that already exist, so it is safe
           to re-run.

Usage:
  python3 backend/recovery/restore_blogs.py extract [--commit 49f950d] [--out FILE]
  NEON_DATABASE_URL=... python3 backend/recovery/restore_blogs.py restore [--in FILE] [--dry-run]
"""
import argparse
import asyncio
import json
import re
import subprocess
import sys
import uuid
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path

REPO = Path(__file__).resolve().parents[2]
DEFAULT_FILE = Path(__file__).resolve().parent / 'blogs-backup.json'
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}


class ArticleExtractor(HTMLParser):
    """Collects the raw inner HTML of <article class="prose">."""

    def __init__(self, raw: str):
        super().__init__(convert_charrefs=False)
        self.raw = raw
        self.lines = raw.splitlines(keepends=True)
        self.depth = 0
        self.start = None
        self.end = None

    def _offset(self) -> int:
        line, col = self.getpos()
        return sum(len(l) for l in self.lines[: line - 1]) + col

    def handle_starttag(self, tag, attrs):
        if self.end is not None:
            return
        if self.start is None:
            classes = (dict(attrs).get('class') or '').split()
            if tag == 'article' and 'prose' in classes:
                self.start = self._offset() + len(self.get_starttag_text())
                self.depth = 1
            return
        if tag == 'article':
            self.depth += 1

    def handle_endtag(self, tag):
        if self.start is None or self.end is not None or tag != 'article':
            return
        self.depth -= 1
        if self.depth == 0:
            self.end = self._offset()

    def content(self) -> str:
        if self.start is None or self.end is None:
            return ''
        return self.raw[self.start:self.end].strip()


def text_of(fragment: str) -> str:
    import html as h
    return re.sub(r'\s+', ' ', h.unescape(re.sub(r'<[^>]+>', ' ', fragment))).strip()


def parse_post(slug: str, page: str) -> dict:
    ld = None
    for block in re.findall(r'<script type="application/ld\+json">(.*?)</script>', page, re.S):
        try:
            data = json.loads(block)
        except json.JSONDecodeError:
            continue
        if isinstance(data, dict) and data.get('@type') == 'BlogPosting':
            ld = data
            break
    if not ld:
        raise ValueError(f'{slug}: no BlogPosting JSON-LD found')

    ex = ArticleExtractor(page)
    ex.feed(page)
    content = ex.content()
    if not content:
        raise ValueError(f'{slug}: no <article class="prose"> content found')

    author = ld.get('author')
    if isinstance(author, dict):
        author = author.get('name')

    # Category: the pill rendered right before the post's <h1>.
    category = None
    m = re.search(r'aria-label="Breadcrumb".*?<div class="flex flex-col"[^>]*>(.*?)<h1', page, re.S)
    if m:
        pill = re.search(r'<span class="self-start"[^>]*>(.*?)</span>', m.group(1), re.S)
        if pill:
            category = text_of(pill.group(1)) or None

    # Tags: comma-separated text after the lucide "tag" icon in the meta row.
    tags = []
    m = re.search(r'class="lucide lucide-tag"[^>]*>.*?</svg>(.*?)</span>', page, re.S)
    if m:
        tags = [t.strip() for t in text_of(m.group(1)).split(',') if t.strip()]

    return {
        'slug': slug,
        'title': ld.get('headline') or '',
        'excerpt': ld.get('description'),
        'content': content,
        'author': author or 'MyAibo Team',
        'category': category,
        'tags': tags,
        'featured_image': (ld.get('image') if isinstance(ld.get('image'), str) else None),
        'published_at': ld.get('datePublished'),
        'published': True,
    }


def read_pages(commit):
    if commit is None:
        for f in sorted((REPO / 'frontend/build/blog').glob('*/index.html')):
            yield f.parent.name, f.read_text(encoding='utf-8')
        return
    listing = subprocess.run(
        ['git', 'ls-tree', '--name-only', f'{commit}:frontend/build/blog'],
        cwd=REPO, check=True, capture_output=True, text=True,
    ).stdout.split('\n')
    for slug in filter(None, listing):
        page = subprocess.run(
            ['git', 'show', f'{commit}:frontend/build/blog/{slug}/index.html'],
            cwd=REPO, check=True, capture_output=True, text=True,
        ).stdout
        yield slug, page


def cmd_extract(args):
    posts = [parse_post(slug, page) for slug, page in read_pages(args.commit)]
    Path(args.out).write_text(json.dumps(posts, indent=2, ensure_ascii=False) + '\n', encoding='utf-8')
    for p in posts:
        print(f"  {p['published_at'] or '?':<26} {p['category'] or '-':<22} {len(text_of(p['content'])):>6} chars  {p['slug']}")
    print(f'Wrote {len(posts)} posts to {args.out}')


def to_dt(value):
    if not value:
        return None
    return datetime.fromisoformat(value.replace('Z', '+00:00'))


async def cmd_restore(args):
    import os
    import asyncpg

    url = os.environ.get('NEON_DATABASE_URL')
    if not url:
        sys.exit('NEON_DATABASE_URL is not set')
    posts = json.loads(Path(args.inp).read_text(encoding='utf-8'))
    conn = await asyncpg.connect(url)
    try:
        existing = {r['slug'] for r in await conn.fetch('SELECT slug FROM blogs')}
        print(f'blogs table currently has {len(existing)} rows')
        added = 0
        for p in posts:
            if p['slug'] in existing:
                print(f"  skip (exists)  {p['slug']}")
                continue
            print(f"  {'would add' if args.dry_run else 'add'}  {p['slug']}")
            if args.dry_run:
                continue
            published_at = to_dt(p.get('published_at'))
            now = datetime.now(timezone.utc)
            await conn.execute(
                """INSERT INTO blogs (id,title,slug,excerpt,content,author,category,tags,
                                      published,featured_image,published_at,created_at,updated_at)
                   VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)""",
                str(uuid.uuid4()), p['title'], p['slug'], p.get('excerpt'), p['content'],
                p.get('author') or 'MyAibo Team', p.get('category'), p.get('tags') or [],
                bool(p.get('published', True)), p.get('featured_image'), published_at,
                published_at or now, now,
            )
            added += 1
        print(f"{'Dry run: ' if args.dry_run else ''}{added} added")
    finally:
        await conn.close()


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest='cmd', required=True)
    e = sub.add_parser('extract')
    e.add_argument('--commit', help='read pages from this git commit instead of the working tree')
    e.add_argument('--out', default=str(DEFAULT_FILE))
    r = sub.add_parser('restore')
    r.add_argument('--in', dest='inp', default=str(DEFAULT_FILE))
    r.add_argument('--dry-run', action='store_true')
    args = ap.parse_args()
    if args.cmd == 'extract':
        cmd_extract(args)
    else:
        asyncio.run(cmd_restore(args))


if __name__ == '__main__':
    main()
