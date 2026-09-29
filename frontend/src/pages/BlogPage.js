import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import RelatedPosts from '@/components/sections/RelatedPosts';
import TickerCta from '@/components/sections/TickerCta';
import { BACKEND_URL } from '@/lib/constants';
import { slugify } from '@/lib/slug';

export default function BlogPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    try {
      let data = null;
      const response = await fetch(`${BACKEND_URL}/admin/public/blogs/${encodeURIComponent(slug)}`);
      if (response.ok) {
        data = await response.json();
      } else {
        // Legacy posts can have un-normalized slugs stored (stray spaces,
        // pasted labels) that no URL can match exactly, so fall back to
        // matching on the normalized slug across all published posts.
        const list = await fetch(`${BACKEND_URL}/admin/public/blogs`);
        const posts = list.ok ? await list.json() : [];
        const wanted = slugify(slug);
        data = (Array.isArray(posts) ? posts : []).find((b) => slugify(b.slug) === wanted) || null;
      }
      if (!data) throw new Error('Blog post not found');
      setBlog(data);
      const canonical = slugify(data.slug);
      if (canonical && canonical !== slug) navigate(`/blog/${canonical}`, { replace: true });
    } catch (err) {
      console.error('[BlogPage] Failed to fetch blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug, navigate]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (loading) {
    return (
      <main className="hero-dotgrid" style={{ minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', padding: '140px 20px', fontFamily: "'DM Sans'", color: 'var(--text-muted)' }}>
          Loading&hellip;
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main className="hero-dotgrid">
        <div className="mx-auto flex flex-col items-center" style={{ maxWidth: 640, padding: '120px 32px 140px', textAlign: 'center', gap: 18 }}>
          <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', borderRadius: 5, background: 'var(--acc)', color: 'var(--dark)' }}>404</span>
          <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(34px,4vw,48px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
            Post <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>not found.</em>
          </h1>
          <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 17, color: 'var(--text-secondary)' }}>
            This post may have moved or been unpublished.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center"
            style={{ marginTop: 8, gap: 8, padding: '14px 24px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 15, textDecoration: 'none' }}
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = blog.published_at || blog.created_at;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.excerpt || '',
    image: blog.featured_image || 'https://www.myaibo.in/og-default.png',
    datePublished: publishedDate,
    dateModified: blog.updated_at || publishedDate,
    author: {
      '@type': 'Person',
      name: blog.author || 'MyAibo',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MyAibo',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.myaibo.in/myaibo-logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://www.myaibo.in/blog/${slugify(blog.slug) || slug}`,
    },
  };

  return (
    <>
      <SEO
        title={`${blog.title} | MyAibo Blog`}
        description={blog.excerpt || ''}
        path={`/blog/${slugify(blog.slug) || slug}`}
        image={blog.featured_image}
      />
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      <main>
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 72px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link to="/blogs" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Blog</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)', maxWidth: 420, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{blog.title}</span>
            </nav>
            <div className="flex flex-col" style={{ maxWidth: 860, gap: 22 }}>
              {blog.category && (
                <span className="self-start" style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: 'var(--acc)', color: 'var(--dark)' }}>
                  {blog.category}
                </span>
              )}
              <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(32px,4.4vw,56px)', lineHeight: 1.12, letterSpacing: '-1.5px' }}>
                {blog.title}
              </h1>
              {blog.excerpt && (
                <p style={{ margin: 0, maxWidth: 720, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  {blog.excerpt}
                </p>
              )}
              <div className="flex flex-wrap items-center" style={{ gap: 20, fontFamily: "'DM Sans'", fontSize: 13.5, color: 'var(--text-muted)' }}>
                {blog.author && (
                  <span className="flex items-center" style={{ gap: 8 }}>
                    <span className="flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--dark)', color: '#fff' }}><User size={13} /></span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{blog.author}</span>
                  </span>
                )}
                {publishedDate && (
                  <span className="flex items-center" style={{ gap: 6 }}>
                    <Calendar size={14} />
                    {new Date(publishedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                )}
                {blog.tags && blog.tags.length > 0 && (
                  <span className="flex items-center" style={{ gap: 6 }}>
                    <Tag size={14} />
                    {Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLE ── */}
        <section style={{ background: '#fff', borderTop: '1px solid var(--border-clr)', padding: '0 32px 104px' }}>
          <div className="mx-auto" style={{ maxWidth: 1180 }}>
            {blog.featured_image && (
              <img
                src={blog.featured_image}
                alt={blog.title}
                style={{ width: '100%', maxHeight: 520, aspectRatio: '1.875 / 1', objectFit: 'cover', display: 'block', borderRadius: 20, marginTop: -1, boxShadow: '0 30px 60px -20px rgba(15,10,30,.25)' }}
              />
            )}
            <div className="mx-auto" style={{ maxWidth: 760, paddingTop: 64 }}>
              <article
                className="prose"
                style={{ fontSize: 17.5, lineHeight: 1.8, color: 'var(--text-primary)' }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              <div className="flex flex-wrap items-center justify-between" style={{ marginTop: 56, paddingTop: 28, borderTop: '1px solid var(--border-clr)', gap: 16 }}>
                <Link to="/blogs" className="inline-flex items-center" style={{ gap: 6, fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: 'var(--purple-dark)', textDecoration: 'none' }}>
                  <ArrowLeft size={15} /> All posts
                </Link>
                <span style={{ padding: '6px 12px', borderRadius: 999, background: 'var(--acc)', color: 'var(--dark)', fontFamily: "'DM Sans'", fontSize: 12.5, fontWeight: 600 }}>
                  Written by {blog.author || 'MyAibo Team'}
                </span>
              </div>
            </div>
          </div>
        </section>

        <RelatedPosts currentBlog={blog} />
        <TickerCta page={`/blog/${slugify(blog.slug) || slug}`} />
      </main>
    </>
  );
}
