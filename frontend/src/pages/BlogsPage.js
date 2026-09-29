import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, User, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/sections/SectionLabel';
import TickerCta from '@/components/sections/TickerCta';
import { BACKEND_URL } from '@/lib/constants';
import { blogPath } from '@/lib/slug';

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

function Meta({ blog, light }) {
  const date = blog.published_at || blog.created_at;
  const color = light ? 'rgba(255,255,255,.6)' : 'var(--text-muted)';
  return (
    <div className="flex flex-wrap items-center" style={{ gap: 16, fontFamily: "'DM Sans'", fontSize: 13, color }}>
      {date && <span className="flex items-center" style={{ gap: 6 }}><Calendar size={14} />{formatDate(date)}</span>}
      {blog.author && <span className="flex items-center" style={{ gap: 6 }}><User size={14} />{blog.author}</span>}
    </div>
  );
}

function CategoryPill({ category, amber }) {
  if (!category) return null;
  return (
    <span
      className="self-start"
      style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: amber ? 'var(--acc)' : 'var(--purple-light)', color: amber ? 'var(--dark)' : 'var(--purple-dark)' }}
    >
      {category}
    </span>
  );
}

function FeaturedPost({ blog }) {
  return (
    <Link
      to={blogPath(blog)}
      className="grid card-lift"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', background: 'var(--dark)', color: '#fff', borderRadius: 20, overflow: 'hidden', textDecoration: 'none' }}
    >
      {blog.featured_image ? (
        <img src={blog.featured_image} alt={blog.title} style={{ width: '100%', height: '100%', minHeight: 280, objectFit: 'cover' }} />
      ) : (
        <div className="hero-dotgrid" style={{ minHeight: 280 }} />
      )}
      <div className="flex flex-col" style={{ padding: 'clamp(28px, 4vw, 44px)', gap: 18 }}>
        <div className="flex flex-wrap items-center" style={{ gap: 10 }}>
          <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', borderRadius: 5, background: 'var(--acc)', color: 'var(--dark)' }}>LATEST</span>
          {blog.category && <span style={{ fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A07AF0' }}>{blog.category}</span>}
        </div>
        <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(26px, 3vw, 36px)', lineHeight: 1.15, letterSpacing: '-0.8px' }}>{blog.title}</h2>
        {blog.excerpt && <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,.72)' }}>{blog.excerpt}</p>}
        <div className="flex flex-wrap items-center justify-between" style={{ marginTop: 'auto', gap: 16, paddingTop: 8 }}>
          <Meta blog={blog} light />
          <span className="inline-flex items-center" style={{ gap: 6, fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: 'var(--acc)' }}>
            Read the post <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ blog, index }) {
  return (
    <Link
      to={blogPath(blog)}
      className="flex flex-col card-lift"
      style={{ background: '#fff', borderRadius: 16, border: '1px solid var(--border-clr)', overflow: 'hidden', textDecoration: 'none', color: 'var(--text-primary)' }}
    >
      {blog.featured_image && (
        <img src={blog.featured_image} alt={blog.title} loading="lazy" style={{ width: '100%', height: 200, objectFit: 'cover' }} />
      )}
      <div className="flex flex-col flex-1" style={{ padding: 24, gap: 12 }}>
        <CategoryPill category={blog.category} amber={index % 2 === 1} />
        <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, lineHeight: 1.3 }}>{blog.title}</h3>
        {blog.excerpt && <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{blog.excerpt}</p>}
        <div className="flex flex-col" style={{ marginTop: 'auto', gap: 14, paddingTop: 8 }}>
          <Meta blog={blog} />
          <span className="inline-flex items-center" style={{ gap: 6, fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: 'var(--purple-dark)' }}>
            Read more <ArrowRight size={16} />
          </span>
        </div>
      </div>
    </Link>
  );
}

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

  const [featured, ...rest] = blogs;

  return (
    <>
      <SEO
        title="Blog — AI, Marketing & Technology Insights | MyAibo"
        description="Expert perspectives on GEO, AEO, SEO, AI automation, and full-stack development from the team building systems that actually compound."
        path="/blogs"
      />
      <main>
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 88px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span><span>Resources</span><span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>Blog</span>
            </nav>
            <div className="flex flex-col" style={{ maxWidth: 820 }}>
              <div className="self-start inline-flex items-center gap-2" style={{ marginBottom: 24, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
                <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
                <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>Resources &middot; Blog</span>
              </div>
              <h1 style={{ margin: '0 0 24px', fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-2px' }}>
                Blog &amp;{' '}
                <span style={{ background: 'var(--acc)', color: 'var(--dark)', padding: '0 12px 4px', borderRadius: 10, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>insights.</span>
              </h1>
              <p style={{ margin: 0, maxWidth: 600, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Insights on marketing, technology, and AI innovation.
              </p>
            </div>
          </div>
        </section>

        {/* ── POSTS ── */}
        <section style={{ padding: '96px 32px 112px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 56 }}>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>Loading posts&hellip;</div>
            ) : blogs.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>No blog posts available yet</div>
            ) : (
              <>
                <FeaturedPost blog={featured} />
                {rest.length > 0 && (
                  <div className="flex flex-col" style={{ gap: 32 }}>
                    <div>
                      <SectionLabel text="All posts" amber />
                      <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(30px,3.6vw,44px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
                        More from <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>the team.</em>
                      </h2>
                    </div>
                    <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 320px), 1fr))', gap: 20 }}>
                      {rest.map((blog, i) => <PostCard key={blog.id} blog={blog} index={i} />)}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        <TickerCta page="/blogs" />
      </main>
    </>
  );
}
