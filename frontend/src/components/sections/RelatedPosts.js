import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BACKEND_URL } from '@/lib/constants';
import { clusterPages } from '@/data/clusterPagesData';
import { blogPath } from '@/lib/slug';
import SectionLabel from '@/components/sections/SectionLabel';

// Maps a blog's category to the most relevant /solutions/ PILLAR page.
// Matched by substring so new categories degrade gracefully instead of
// throwing — a category that matches nothing simply renders no service link.
const CATEGORY_TO_SOLUTION = [
  { test: /seo/i, path: '/solutions/seo', label: 'SEO Services' },
  { test: /geo|generative engine/i, path: '/solutions/geo', label: 'Generative Engine Optimization (GEO)' },
  { test: /aeo|answer engine/i, path: '/solutions/aeo', label: 'Answer Engine Optimization (AEO)' },
  { test: /full.?stack|engineering|software|rag/i, path: '/solutions/full-stack', label: 'Full-Stack Development' },
  { test: /automation|agent/i, path: '/solutions/ai-automations', label: 'AI Automations' },
  { test: /content|creative/i, path: '/solutions/content-marketing', label: 'Content Marketing' },
];

const STOPWORDS = new Set([
  'the', 'and', 'for', 'with', 'from', 'that', 'this', 'your', 'you', 'are',
  'how', 'what', 'why', 'when', 'who', 'its', 'it\'s', 'a', 'an', 'to', 'of',
  'in', 'on', 'is', 'as', 'or', 'by', 'at', 'be', 'not', 'no', 'vs', 'vs.',
]);

function significantWords(text) {
  return (text || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));
}

// Prefers a specific cluster sub-page (e.g. "Topical Authority & Entity SEO")
// over the generic pillar page whenever the post's own title/tags clearly
// overlap with one — so a post about topical authority links to that exact
// service page instead of just the general SEO pillar. Falls back to the
// category → pillar mapping when no cluster page overlaps meaningfully.
function bestSolutionMatch(blog) {
  const blogWords = new Set([
    ...significantWords(blog.title),
    ...significantWords(Array.isArray(blog.tags) ? blog.tags.join(' ') : ''),
  ]);

  let best = null;
  let bestScore = 0;
  for (const cluster of clusterPages) {
    const clusterWords = significantWords(`${cluster.subLabel} ${cluster.eyebrow || ''}`);
    const score = clusterWords.filter((w) => blogWords.has(w)).length;
    if (score > bestScore) {
      bestScore = score;
      best = cluster;
    }
  }

  if (best && bestScore >= 2) {
    return { path: `/solutions/${best.pillar}/${best.slug}`, label: best.subLabel };
  }

  if (!blog.category) return null;
  return CATEGORY_TO_SOLUTION.find((c) => c.test.test(blog.category)) || null;
}

// Scores every other published post by shared tags, falling back to shared
// category, so posts with no tags yet (common right after publish) still
// cluster with same-category siblings instead of showing nothing.
function pickRelated(currentBlog, allBlogs, max = 3) {
  const currentTags = new Set(
    (Array.isArray(currentBlog.tags) ? currentBlog.tags : []).map((t) => t.toLowerCase().trim())
  );

  const scored = allBlogs
    .filter((b) => b.slug !== currentBlog.slug)
    .map((b) => {
      const tags = Array.isArray(b.tags) ? b.tags : [];
      const sharedTags = tags.filter((t) => currentTags.has(t.toLowerCase().trim())).length;
      const sameCategory = currentBlog.category && b.category === currentBlog.category ? 1 : 0;
      return { post: b, score: sharedTags * 2 + sameCategory };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.published_at || b.post.created_at) - new Date(a.post.published_at || a.post.created_at));

  const related = scored.slice(0, max).map((s) => s.post);

  // Not enough tag/category matches yet — fill with the most recent other
  // posts so the section never renders empty.
  if (related.length < max) {
    const usedSlugs = new Set(related.map((p) => p.slug));
    const recent = allBlogs
      .filter((b) => b.slug !== currentBlog.slug && !usedSlugs.has(b.slug))
      .sort((a, b) => new Date(b.published_at || b.created_at) - new Date(a.published_at || a.created_at));
    related.push(...recent.slice(0, max - related.length));
  }

  return related;
}

export default function RelatedPosts({ currentBlog }) {
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRelated = useCallback(async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/admin/public/blogs`);
      if (!res.ok) throw new Error('Failed to load related posts');
      const data = await res.json();
      const allBlogs = Array.isArray(data) ? data : data.blogs || [];
      setRelated(pickRelated(currentBlog, allBlogs));
    } catch (err) {
      console.error('[RelatedPosts] Failed to fetch related posts:', err);
    } finally {
      setLoading(false);
    }
  }, [currentBlog]);

  useEffect(() => {
    fetchRelated();
  }, [fetchRelated]);

  const solution = bestSolutionMatch(currentBlog);

  if (loading) return null;

  return (
    <section style={{ background: 'var(--off-white)', borderTop: '1px solid var(--border-clr)', padding: '96px 32px 104px' }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 32 }}>
        {related.length > 0 && (
          <>
            <div>
              <SectionLabel text="Keep reading" amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(30px,3.6vw,44px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
                Related <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>reading.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
              {related.map((post, i) => (
                <Link
                  key={post.slug}
                  to={blogPath(post)}
                  className="flex flex-col card-lift"
                  style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 24, gap: 12, textDecoration: 'none', color: 'var(--text-primary)' }}
                >
                  {post.category && (
                    <span className="self-start" style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: i % 2 === 1 ? 'var(--acc-soft)' : 'var(--purple-light)', color: i % 2 === 1 ? 'var(--acc-ink)' : 'var(--purple-dark)' }}>
                      {post.category}
                    </span>
                  )}
                  <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>{post.title}</h3>
                  <span className="inline-flex items-center gap-1" style={{ marginTop: 'auto', fontFamily: "'DM Sans'", fontSize: 13.5, fontWeight: 600, color: 'var(--purple-dark)' }}>
                    Read more <ArrowRight size={13} />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {solution && (
          <div className="flex flex-wrap items-center justify-between" style={{ gap: 16, background: 'var(--acc-soft)', border: '1px solid rgba(146,64,14,.15)', borderRadius: 16, padding: '22px 26px' }}>
            <span style={{ fontFamily: "'DM Sans'", fontSize: 15.5, color: 'var(--acc-ink)' }}>
              Want help with this? See our <strong style={{ fontWeight: 700 }}>{solution.label}</strong>.
            </span>
            <Link
              to={solution.path}
              className="inline-flex items-center gap-1"
              style={{ padding: '12px 20px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Learn more <ArrowRight size={14} />
            </Link>
          </div>
        )}

        <Link
          to="/case-studies"
          className="self-center inline-flex items-center gap-1"
          style={{ fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}
        >
          See these results in client work &rarr;
        </Link>
      </div>
    </section>
  );
}
