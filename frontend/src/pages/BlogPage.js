import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import { BACKEND_URL } from '@/lib/constants';

export default function BlogPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlog = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/public/blogs/${slug}`);
      if (!response.ok) throw new Error('Blog post not found');
      const data = await response.json();
      setBlog(data);
    } catch (err) {
      console.error('[BlogPage] Failed to fetch blog:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchBlog();
  }, [fetchBlog]);

  if (loading) {
    return (
      <main style={{ paddingTop: 64 }}>
        <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
          Loading...
        </div>
      </main>
    );
  }

  if (error || !blog) {
    return (
      <main style={{ paddingTop: 64 }}>
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: 'var(--text-primary)', marginBottom: 16 }}>
            Post not found
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
            {error || 'This blog post could not be loaded.'}
          </p>
          <Link
            to="/blogs"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--purple-dark)', textDecoration: 'none', fontWeight: 500 }}
          >
            <ArrowLeft size={16} /> Back to all posts
          </Link>
        </div>
      </main>
    );
  }

  const publishedDate = blog.published_at || blog.created_at;

  return (
    <>
      <SEO
        title={`${blog.title} | MyAibo Blog`}
        description={blog.excerpt || ''}
      />
      <main style={{ paddingTop: 64 }}>
        {/* Hero */}
        <section style={{ background: 'var(--dark)', padding: '80px 40px 60px' }}>
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            {blog.category && (
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'rgba(124,59,237,0.25)',
                  color: '#c4a7f7',
                  borderRadius: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {blog.category}
                </span>
              </div>
            )}
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-1px',
              color: '#fff',
              margin: '0 0 20px',
              lineHeight: 1.2,
            }}>
              {blog.title}
            </h1>
            {blog.excerpt && (
              <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.75)', margin: '0 0 28px', lineHeight: 1.6 }}>
                {blog.excerpt}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
              {blog.author && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <User size={14} />
                  <span>{blog.author}</span>
                </div>
              )}
              {publishedDate && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Calendar size={14} />
                  <span>{new Date(publishedDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
              )}
              {blog.tags && blog.tags.length > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Tag size={14} />
                  <span>{Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured image */}
        {blog.featured_image && (
          <div style={{ background: 'var(--dark-surface)' }}>
            <div className="mx-auto" style={{ maxWidth: 900 }}>
              <img
                src={blog.featured_image}
                alt={blog.title}
                loading="lazy"
                style={{ width: '100%', maxHeight: 480, objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section style={{ background: 'var(--off-white)', padding: '72px 40px 100px' }}>
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            <Link
              to="/blogs"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--purple-dark)',
                textDecoration: 'none',
                marginBottom: 48,
              }}
            >
              <ArrowLeft size={15} /> All posts
            </Link>

            <article
              className="prose"
              style={{
                fontSize: 17,
                lineHeight: 1.8,
                color: 'var(--text-primary)',
              }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </div>
        </section>
      </main>
    </>
  );
}
