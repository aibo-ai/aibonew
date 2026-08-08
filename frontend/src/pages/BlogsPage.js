import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import { BACKEND_URL } from '@/lib/constants';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBlogs = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/public/blogs`);
      const data = await response.json();
      setBlogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('[BlogsPage] Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <>
      <SEO
        title="Blog — AI, Marketing & Technology Insights | MyAibo"
        description="Expert perspectives on GEO, AEO, SEO, AI automation, and full-stack development from the team building systems that actually compound."
      />
      <main style={{ paddingTop: 64 }}>
        <section style={{ background: 'var(--dark)', padding: '100px 40px 60px' }}>
          <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px, 4.5vw, 56px)', letterSpacing: '-1.5px', color: '#fff', margin: '0 0 16px', lineHeight: 1.15 }}>
              Blog & Insights
            </h1>
            <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.85)', margin: 0, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
              Insights on marketing, technology, and AI innovation
            </p>
          </div>
        </section>
        <section style={{ background: 'var(--off-white)', padding: '80px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                Loading blogs...
              </div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                No blog posts available yet
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <article
                    key={blog.id}
                    style={{ background: 'var(--white)', borderRadius: 12, border: '1px solid var(--border-clr)', overflow: 'hidden', transition: 'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
                  >{blog.featured_image && (
                      <img src={blog.featured_image} alt={blog.title} loading="lazy" style={{ width: '100%', height: 200, aspectRatio: '1 / 1', objectFit: 'cover' }} />
                    <div style={{ padding: 24 }}>
                      {blog.category && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span style={{ padding: '4px 10px', fontSize: 11, fontWeight: 600, background: 'var(--purple-light)', color: 'var(--purple-dark)', borderRadius: 6, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            {blog.category}
                          </span>
                        </div>
                      )}
                      <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.3 }}>
                        {blog.title}
                      </h3>
                      <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 16px', lineHeight: 1.6 }}>
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center gap-4 mb-4 text-xs text-gray-500">
                        {(blog.published_at || blog.created_at) && (
                          <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>{new Date(blog.published_at || blog.created_at).toLocaleDateString()}</span>
                          </div>
                        )}
                        {blog.author && (
                          <div className="flex items-center gap-1">
                            <Clock size={14} />
                            <span>{blog.author}</span>
                          </div>
                        )}
                      </div>
                      <Link to={`/blog/${blog.slug}`} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 14, fontWeight: 500, color: 'var(--purple-dark)', textDecoration: 'none' }}>
                        Read More <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}
