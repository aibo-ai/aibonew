import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Curated, not auto-generated: these are the posts we most want the
// homepage — the site's highest-authority page — linking directly into,
// rather than routing everyone through /blogs two hops deep. Ordered by
// priority: zero-impression posts need the link equity most.
const FEATURED_POSTS = [
  {
    slug: 'website-speed-architecture-seo-ai-ranking-factor',
    category: 'SEO',
    title: 'Website speed & architecture: the ranking factor marketing teams keep outsourcing to no one',
    excerpt: "Site speed and architecture aren't just Google ranking signals anymore — they decide whether AI engines cite you.",
    image: 'https://uymhyszw5ybjqagu.public.blob.vercel-storage.com/blog-images/1784719289368-Thumbnail%20blog%20new-K1ubfHIa6ZUFg1VjDZbYbstE29bSBU.png',
  },
  {
    slug: 'topical-authority-replacing-keywords',
    category: 'SEO',
    title: "What is topical authority, and how it's replacing keywords as the #1 SEO signal",
    excerpt: 'Google no longer rewards pages that mention the right keywords — it rewards websites that genuinely own a subject.',
    image: 'https://uymhyszw5ybjqagu.public.blob.vercel-storage.com/blog-images/1780677529643-Picture%201-iQXiGsppL0xMEgQ1QFSIHBAf6Etd2T.jpg',
  },
  {
    slug: 'ai-native-agency-vs-traditional-marketing-agency',
    category: 'AI Native Agency',
    title: 'AI-native agency vs. traditional marketing agency: how to choose in 2026',
    excerpt: "Every marketing leader evaluating agency partners in 2026 faces a question that didn't exist five years ago.",
    image: 'https://uymhyszw5ybjqagu.public.blob.vercel-storage.com/blog-images/1786377256064-Cover-ab0BrdqUeIIbSUlDELhKoqnUVgkCTv.png',
  },
];

export default function LatestInsights() {
  return (
    <section
      id="latest-insights"
      data-testid="latest-insights-section"
      style={{ background: 'var(--white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        <div className="flex items-baseline justify-between mb-12 flex-wrap gap-4">
          <div>
            <div
              style={{
                fontSize: 13,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color: 'var(--purple-dark)',
                marginBottom: 16,
              }}
            >
              Latest Insights
            </div>
            <h2
              className="headline-light"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.6vw, 42px)',
                letterSpacing: '-1px',
                lineHeight: 1.15,
                color: 'var(--text-primary)',
                margin: 0,
              }}
            >
              What we're seeing in GEO, AEO & SEO
            </h2>
          </div>
          <Link
            to="/blogs"
            style={{ fontSize: 14, fontWeight: 500, color: 'var(--purple-dark)', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            All articles &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURED_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="card-lift"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: 'var(--white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                overflow: 'hidden',
                textDecoration: 'none',
              }}
            >
              <img
                src={post.image}
                alt={post.title}
                loading="lazy"
                style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
              />
              <div style={{ padding: 22, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--purple-dark)',
                    marginBottom: 10,
                  }}
                >
                  {post.category}
                </span>
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 17,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0 0 10px',
                    lineHeight: 1.35,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.6,
                    margin: '0 0 16px',
                  }}
                >
                  {post.excerpt}
                </p>
                <span
                  className="inline-flex items-center gap-1"
                  style={{ fontSize: 13, fontWeight: 500, color: 'var(--purple-dark)', marginTop: 'auto' }}
                >
                  Read more <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
