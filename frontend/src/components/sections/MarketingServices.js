import { Link } from "react-router-dom";
import SectionLabel from "./SectionLabel";

const cards = [
  {
    num: '01',
    title: 'Generative Engine Optimisation',
    tagline: 'Be the answer AI cites',
    body: "Optimise your brand for ChatGPT, Perplexity, Gemini, and every LLM-powered surface. Own the AI answer layer before your competitors discover it exists.",
    slug: 'geo',
  },
  {
    num: '02',
    title: 'Answer Engine Optimisation',
    tagline: 'Win voice & featured snippets',
    body: "Structure your content so it's chosen by answer engines and voice assistants. Position your brand at zero-click moments of high intent.",
    slug: 'aeo',
  },
  {
    num: '03',
    title: 'Search Engine Optimisation',
    tagline: 'Rank. Convert. Repeat.',
    body: "Technical excellence + conversion-focused copy. We build the SEO foundation that feeds every other channel — from organic to paid.",
    slug: 'seo',
  },
  {
    num: '04',
    title: 'Content Marketing',
    tagline: 'Authority that compounds',
    body: "Multi-format content mapped to buyer intent and business outcomes. Costs less than paid ads, builds lasting brand equity, and feeds your GEO + AEO presence.",
    slug: 'content-marketing',
  },
];

export default function MarketingServices() {
  return (
    <section
      id="marketing-services"
      data-testid="marketing-services-section"
      style={{ background: 'var(--off-white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Header — asymmetric 2-col */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div style={{ maxWidth: 560 }}>
            <SectionLabel text="Marketing Services" />
            <h2
              className="headline-light"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                letterSpacing: '-1px',
                color: 'var(--text-primary)',
                margin: '0 0 10px',
                lineHeight: 1.15,
              }}
            >
              Rank everywhere your customers <em>search</em> and <em>ask.</em>
            </h2>
            <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              We combine GEO, AEO, SEO, and content to build authority that compounds —
              across Google, ChatGPT, Perplexity, and voice interfaces.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 48,
                fontWeight: 600,
                letterSpacing: '-2px',
                color: 'var(--purple)',
                display: 'block',
                lineHeight: 1,
              }}
            >
              156%
            </span>
            <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              Avg. conversion rate increase across clients
            </span>
          </div>
        </div>

        {/* 4-column card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {cards.map((c) => (
            <div
              key={c.num}
              data-testid={`marketing-card-${c.num}`}
              className="card-lift"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                padding: 28,
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--purple)',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                {c.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 4px',
                }}
              >
                {c.title}
              </h3>
              <p
                style={{
                  fontStyle: 'italic',
                  fontSize: 12,
                  color: 'var(--purple-dark)',
                  margin: '0 0 10px',
                }}
              >
                {c.tagline}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: '0 0 14px',
                }}
              >
                {c.body}
              </p>
              <Link
                to={`/solutions/${c.slug}`}
                style={{
                  color: 'var(--purple-dark)',
                  fontSize: 12,
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                Learn more &rarr;
              </Link>
            </div>
          ))}
        </div>

        {/* Compound strip */}
        <div
          data-testid="marketing-compound-strip"
          className="flex items-center gap-4"
          style={{
            background: 'var(--dark)',
            borderRadius: 8,
            padding: '16px 28px',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--purple)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              color: 'rgba(255,255,255,0.68)',
              fontSize: 13,
              fontStyle: 'italic',
            }}
          >
            GEO + AEO + SEO + Content work together — each amplifies the others,
            creating a compounding growth loop.
          </span>
        </div>
      </div>
    </section>
  );
}
