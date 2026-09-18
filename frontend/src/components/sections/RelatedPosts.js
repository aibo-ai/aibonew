import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BACKEND_URL } from '@/lib/constants';

// Maps a blog's category to the most relevant /solutions/ pillar page.
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

function solutionForCategory(category) {
  if (!category) return null;
  return CATEGORY_TO_SOLUTION.find((c) => c.test.test(category)) || null;
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

  const solution = solutionForCategory(currentBlog.category);

  if (loading) return null;

  return (
    <section style={{ background: 'var(--off-white)', padding: '64px 40px 80px' }}>
      <div className="mx-auto" style={{ maxWidth: 800 }}>
        {related.length > 0 && (
          <>
            <h2
              style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 20px' }}
            >
              Related reading
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: solution ? 32 : 0 }}>
              {related.map((post) => (
                <Link
                  key={post.slug}
                  to={`/blog/${post.slug}`}
                  className="card-lift"
                  style={{
                    display: 'block',
                    background: 'var(--white)',
                    border: '1px solid var(--border-clr)',
                    borderRadius: 12,
                    padding: '18px 18px',
                    textDecoration: 'none',
                  }}
                >
                  {post.category && (
                    <div
                      style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 8 }}
                    >
                      {post.category}
                    </div>
                  )}
                  <h3
                    style={{ fontFamily: "'Fraunces', serif", fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.35 }}
                  >
                    {post.title}
                  </h3>
                  <span
                    className="inline-flex items-center gap-1"
                    style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--purple-dark)' }}
                  >
                    Read more <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </>
        )}

        {solution && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 12,
              background: 'var(--purple-light)',
              border: '1px solid rgba(124,59,237,0.25)',
              borderRadius: 12,
              padding: '18px 22px',
            }}
          >
            <span style={{ fontSize: 14, color: 'var(--text-primary)' }}>
              Want help with this? See our <strong>{solution.label}</strong>.
            </span>
            <Link
              to={solution.path}
              className="inline-flex items-center gap-1"
              style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--purple-dark)', textDecoration: 'none', whiteSpace: 'nowrap' }}
            >
              Learn more <ArrowRight size={13} />
            </Link>
          </div>
        )}

        <div style={{ textAlign: 'center', marginTop: 28 }}>
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-1"
            style={{ fontSize: 13.5, fontWeight: 500, color: 'var(--text-secondary)', textDecoration: 'none' }}
          >
            See these results in client work &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
