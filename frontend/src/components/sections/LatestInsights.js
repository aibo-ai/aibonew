import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionLabel from './SectionLabel';

// Curated, not fetched: the homepage is the site's highest-authority page,
// and these are the posts we most want it linking straight into, rather than
// routing everything through /blogs two hops deep. Static on purpose, so the
// links are in the prerendered HTML crawlers see, with no API call needed.
// (Restores the section dropped in the Violet + Amber redesign.)
const FEATURED_POSTS = [
  {
    slug: 'website-speed-architecture-seo-ai-ranking-factor',
    category: 'SEO',
    title: 'Website speed & architecture: the ranking factor marketing teams keep outsourcing to no one',
    excerpt: "Site speed and architecture aren't just Google ranking signals anymore. They decide whether AI engines cite you.",
  },
  {
    slug: 'topical-authority-replacing-keywords',
    category: 'SEO',
    title: "What is topical authority, and how it's replacing keywords as the #1 SEO signal",
    excerpt: 'Google no longer rewards pages that mention the right keywords. It rewards websites that genuinely own a subject.',
  },
  {
    slug: 'ai-native-agency-vs-traditional-marketing-agency',
    category: 'AI-Native Agency',
    title: 'AI-native agency vs. traditional marketing agency: how to choose in 2026',
    excerpt: "Every marketing leader evaluating agency partners in 2026 faces a question that didn't exist five years ago.",
  },
];

export default function LatestInsights() {
  return (
    // Extra top padding on md+ clears the testimonial post-it that hangs off
    // the bottom of the Results section above (hidden below md).
    <section id="latest-insights" data-testid="latest-insights-section" className="pt-0 md:pt-44" style={{ paddingLeft: 32, paddingRight: 32, paddingBottom: 112 }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 32 }}>
        <div className="flex flex-wrap items-end justify-between" style={{ gap: 16 }}>
          <div>
            <SectionLabel text="Latest Insights" amber />
            <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
              What we're seeing in <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>GEO, AEO &amp; SEO.</em>
            </h2>
          </div>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-1"
            style={{ fontFamily: "'DM Sans'", fontSize: 14.5, fontWeight: 600, color: 'var(--purple-dark)', textDecoration: 'none', whiteSpace: 'nowrap' }}
          >
            All articles <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 16 }}>
          {FEATURED_POSTS.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="flex flex-col card-lift"
              style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 24, gap: 12, textDecoration: 'none', color: 'var(--text-primary)' }}
            >
              <span
                className="self-start"
                style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: i % 2 === 1 ? 'var(--acc)' : 'var(--purple-light)', color: i % 2 === 1 ? 'var(--dark)' : 'var(--purple-dark)' }}
              >
                {post.category}
              </span>
              <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, lineHeight: 1.3 }}>{post.title}</h3>
              <p style={{ margin: 0, fontFamily: "'DM Sans'", fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{post.excerpt}</p>
              <span className="inline-flex items-center gap-1" style={{ marginTop: 'auto', fontFamily: "'DM Sans'", fontSize: 13.5, fontWeight: 600, color: 'var(--purple-dark)' }}>
                Read more <ArrowRight size={13} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
