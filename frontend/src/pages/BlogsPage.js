import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { PrintPage, Crumb, SecHead, CtaSection, ArrowRight } from '@/components/print';
import { BACKEND_URL } from '@/lib/constants';
import { blogPath } from '@/lib/slug';
import '@/components/print/company/blog.css';

const formatDate = (d) => new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

// Posters rotate three treatments (paper, lavender, plum ink), each with one
// printed shape. Paper and lavender multiply the shape into the paper; on plum
// ink the shape sits on top, so only shapes that read on a dark ground are used.
const TREATMENTS = ['t-paper', 't-lav', 't-plum'];
const PAPER_SHAPES = ['spec-technology', 'svc-aeo', 'svc-seo', 'svc-content', 'svc-geo', 'spec-marketing'];
const PLUM_SHAPES = ['svc-geo', 'svc-aeo', 'spec-marketing'];

function posterStyle(i) {
  const t = i % 3;
  const row = Math.floor(i / 3);
  if (t === 2) return { treatment: TREATMENTS[t], shape: PLUM_SHAPES[row % PLUM_SHAPES.length], print: false };
  return { treatment: TREATMENTS[t], shape: PAPER_SHAPES[(row * 2 + t) % PAPER_SHAPES.length], print: true };
}

function Poster({ blog, index }) {
  const { treatment, shape, print } = posterStyle(index);
  const date = blog.published_at || blog.created_at;
  const label = [blog.category, date && formatDate(date)].filter(Boolean).join(' · ');
  return (
    <Link className={`poster ${treatment}`} to={blogPath(blog)}>
      <div className="pic">
        <span className="pin" aria-hidden="true" />
        <img className={print ? 'print' : undefined} src={`/home/${shape}.webp`} width="400" height="520" loading="lazy" alt="" />
      </div>
      {label && <p className="n">{label}</p>}
      <h3>{blog.title}</h3>
      {blog.excerpt && <p>{blog.excerpt}</p>}
      <span className="more">Read more <ArrowRight /></span>
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

  return (
    <>
      <SEO
        title="Blog — AI, Marketing & Technology Insights | MyAibo"
        description="Expert perspectives on GEO, AEO, SEO, AI automation, and full-stack development from the team building systems that actually compound."
        path="/blogs"
      />
      <PrintPage className="pg-blogs">
        {/* Hero */}
        <section className="hero-b" aria-labelledby="h-hero">
          <div className="wrap">
            <Crumb items={[{ label: 'Home', to: '/' }, { label: 'Resources' }, { label: 'Blog' }]} />
            <p className="kicker">Resources · Blog</p>
            <h1 className="display" id="h-hero">Blog &amp; insights.</h1>
            <p className="lead">Insights on marketing, technology, and AI innovation.</p>
          </div>
        </section>

        {/* Latest: a wall of pinned posters */}
        <section className="sec paper-white" id="posts" aria-labelledby="h-posts">
          <div className="wrap">
            <SecHead id="h-posts" name="Latest" lead="What we’re seeing in" pay="GEO, AEO & SEO." />
            {loading ? (
              <p className="empty" role="status">Loading posts&hellip;</p>
            ) : blogs.length === 0 ? (
              <p className="empty">No blog posts available yet</p>
            ) : (
              <div className="wall">
                {blogs.map((blog, i) => <Poster key={blog.id} blog={blog} index={i} />)}
              </div>
            )}
          </div>
        </section>

        <CtaSection page="/blogs" />
      </PrintPage>
    </>
  );
}
