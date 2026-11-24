import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import RelatedPosts from '@/components/sections/RelatedPosts';
import { PrintPage, Crumb, CtaSection } from '@/components/print';
import { BACKEND_URL } from '@/lib/constants';
import { slugify } from '@/lib/slug';
import '@/components/print/company/blog.css';
import '@/components/print/company/shared.css';

function ArrowLeft() {
  return <svg className="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" /></svg>;
}

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
      <PrintPage className="pg-blog">
        <section className="pr-state" role="status">
          <div className="wrap"><p className="lead">Loading&hellip;</p></div>
        </section>
      </PrintPage>
    );
  }

  if (error || !blog) {
    return (
      <PrintPage className="pg-blog">
        <section className="pr-state" aria-labelledby="h-nf">
          <div className="wrap">
            <p className="kicker">404</p>
            <h1 className="display" id="h-nf">Post not found.</h1>
            <p className="lead">This post may have moved or been unpublished.</p>
            <div className="actions">
              <Link className="btn btn-primary btn-lg" to="/blogs">Back to all posts</Link>
            </div>
          </div>
        </section>
      </PrintPage>
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
      <PrintPage className="pg-blog">
        {/* Hero: crumb, kicker, Castoro title and lead on paper */}
        <section className="hero-p" aria-labelledby="h-hero">
          <div className="wrap">
            <Crumb items={[{ label: 'Home', to: '/' }, { label: 'Blog', to: '/blogs' }, { label: blog.title }]} />
            <p className="kicker">{blog.category || 'Blog'}</p>
            <h1 className="display" id="h-hero">{blog.title}</h1>
            {blog.excerpt && <p className="lead">{blog.excerpt}</p>}
            <p className="byline">
              {blog.author && <span>By <b>{blog.author}</b></span>}
              {publishedDate && (
                <span>{new Date(publishedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              )}
              {blog.tags && blog.tags.length > 0 && (
                <span>{Array.isArray(blog.tags) ? blog.tags.join(', ') : blog.tags}</span>
              )}
            </p>
          </div>
        </section>

        {/* Article: the body keeps the site's .prose styling */}
        <section className="article paper-white">
          <div className="wrap">
            {blog.featured_image && <img className="feature" src={blog.featured_image} alt={blog.title} />}
            <article className="prose" dangerouslySetInnerHTML={{ __html: blog.content }} />
            <div className="post-foot">
              <Link className="link" to="/blogs"><ArrowLeft /> All posts</Link>
              <span className="by">Written by {blog.author || 'MyAibo Team'}</span>
            </div>
          </div>
        </section>

        <RelatedPosts currentBlog={blog} />
        <CtaSection page={`/blog/${slugify(blog.slug) || slug}`} />
      </PrintPage>
    </>
  );
}
