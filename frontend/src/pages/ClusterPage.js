import { useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, ArrowDown, Check } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { getCluster, getClustersForPillar, pillarMeta } from '@/data/clusterPagesData';
import SEO from '@/components/SEO';

// Per-cluster "Ready to…" headline shown in the final CTA section.
// Keyed by `${pillar}/${cluster}` to keep the data file untouched.
const FINAL_CTA_HEADLINES = {
  'geo/llmo-company': 'Ready to Be the Answer AI Gives — Not the Footnote?',
  'geo/perplexity-gemini-chatgpt-optimization': 'Ready to Get Cited Before Your Competitor Does?',
  'geo/zero-click-search-synthetic-traffic': 'Ready to Win the Searches Nobody Clicks Through On?',
  'aeo/llm-bot-compliance-llms-txt': 'Ready to Let AI Crawlers In — On Your Terms?',
  'aeo/semantic-faq-knowledge-graph-schema': 'Ready to Make Your Content Machine-Readable?',
  'seo/programmatic-seo-engine': 'Ready to Scale Content Without Scaling Headcount?',
  'seo/topical-authority-entity-seo': 'Ready to Own the Category, Not Just the Keywords?',
  'seo/ai-agent-optimization': 'Ready to Rank for the Agents Doing the Browsing Now?',
  'seo/community-ugc-search-amplification': 'Ready to Let Your Community Do the Ranking?',
  'content-marketing/data-driven-inbound-original-research': 'Ready to Publish the Research Everyone Else Cites?',
  'content-marketing/multi-channel-b2b-saas-growth-loops': 'Ready to Grow on All Fronts?',
  'ai-automations/aiaa-operational-auditing': "Ready to Find Out What Your Automations Are Actually Costing You?",
  'ai-automations/agentic-workflow-consulting': 'Ready to Put Multiple Agents to Work in One System?',
  'ai-automations/n8n-automation-services': "Ready for Automations That Don't Break in Production?",
  'full-stack/ai-native-generative-ui-development': 'Ready to Ship an Interface That Thinks With the User?',
  'full-stack/enterprise-rag-vector-database-architecture': 'Ready to Give Your AI a Memory It Can Trust?',
  'full-stack/ai-solutions-integrator-operations': 'Ready to Stop Duct-Taping Your AI Stack Together?',
  'full-stack/fractional-ai-engineering-cto': 'Ready for Senior AI Engineering Without a Full-Time Hire?',
};

const UNIVERSAL_CTA = 'Book Free Strategy Session';

// Shared design tokens (already declared as CSS vars in index.css)
// --purple, --purple-dark, --purple-light, --dark, --white, --off-white,
// --border-clr, --text-primary, --text-secondary, --text-muted

export default function ClusterPage() {
  const { pillar, cluster } = useParams();
  const data = getCluster(pillar, cluster);
  const pillarInfo = pillarMeta[pillar];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pillar, cluster]);

  if (!pillarInfo) {
    return <Navigate to="/" replace />;
  }
  if (!data) {
    return (
      <div style={{ padding: '160px 40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 300, color: 'var(--text-primary)' }}>
          Page not found
        </h1>
        <Link to={`/solutions/${pillar}`} className="btn-purple inline-flex mt-6" style={{ padding: '12px 24px', fontSize: 14, marginTop: 24 }}>
          Back to {pillarInfo.name}
        </Link>
      </div>
    );
  }

  const siblings = getClustersForPillar(pillar).filter((c) => c.slug !== cluster).slice(0, 3);
  const finalHeadline = FINAL_CTA_HEADLINES[`${pillar}/${cluster}`] || data.geography.headline;

  // JSON-LD structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.subLabel,
    serviceType: data.pillarName,
    provider: {
      '@type': 'Organization',
      name: 'MyAibo',
      url: 'https://myaibo.in',
    },
    description: data.meta.description,
    areaServed: 'Global',
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://myaibo.in/' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://myaibo.in/solutions' },
      { '@type': 'ListItem', position: 3, name: data.pillarName, item: `https://myaibo.in/solutions/${pillar}` },
      { '@type': 'ListItem', position: 4, name: data.subLabel, item: `https://myaibo.in/solutions/${pillar}/${cluster}` },
    ],
  };

  return (
    <>
      <SEO title={data.meta.title} description={data.meta.description} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>

      <main>
        {/* ─── COMPONENT 1: HERO ─── */}
        <section
          className="relative"
          style={{ background: 'var(--dark)', padding: '140px 40px 72px', overflow: 'hidden' }}
        >
          <div
            className="absolute pointer-events-none"
            style={{ width: 560, height: 560, top: -100, right: -100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,59,237,0.18) 0%, transparent 68%)' }}
          />
          <div className="relative z-10 mx-auto" style={{ maxWidth: 800 }}>
            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" className="mb-5" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
              <span className="mx-2">/</span>
              <Link to={`/solutions/${pillar}`} style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>{data.pillarName}</Link>
              <span className="mx-2">/</span>
              <span style={{ color: '#A07AF0' }}>{data.subLabel}</span>
            </nav>

            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-5"
              style={{ background: 'rgba(124,59,237,0.15)', border: '1px solid rgba(124,59,237,0.35)', borderRadius: 20, padding: '5px 14px' }}
            >
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
              <span style={{ color: '#A07AF0', fontSize: 12, fontWeight: 500 }}>{data.eyebrow}</span>
            </div>

            <h1
              className="headline-dark"
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4.6vw, 54px)', letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.1, margin: '0 0 18px' }}
            >
              {data.h1}
            </h1>

            <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, margin: '0 0 28px', maxWidth: 640 }}>
              {data.heroBody}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-purple inline-flex items-center gap-2"
                style={{ padding: '13px 24px', fontSize: 15, fontWeight: 500 }}
              >
                {UNIVERSAL_CTA} <ArrowRight size={15} />
              </a>
              <a
                href="#deep-dive"
                className="btn-outline-light inline-flex items-center gap-2"
                style={{ padding: '12px 22px', fontSize: 15, fontWeight: 500 }}
              >
                See how it works <ArrowDown size={15} />
              </a>
            </div>
          </div>
        </section>

        {/* ─── COMPONENT 2: AEO SAFE-BOX ─── */}
        <section style={{ background: 'var(--white)', padding: '64px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 860 }}>
            <article
              aria-label="Quick summary for AI engines and technical leads"
              itemScope
              itemType="https://schema.org/DefinedTerm"
              style={{
                background: 'var(--off-white)',
                border: '1px solid var(--border-clr)',
                borderLeft: '4px solid var(--purple)',
                borderRadius: 10,
                padding: '28px 32px',
                position: 'relative',
              }}
            >
              <div
                className="inline-flex items-center gap-2 mb-3"
                style={{
                  background: 'var(--purple-light)',
                  border: '1px solid rgba(124,59,237,0.25)',
                  borderRadius: 6,
                  padding: '4px 10px',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--purple-dark)',
                  fontFamily: "'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
                }}
              >
                <span style={{ width: 6, height: 6, background: 'var(--purple)', borderRadius: 2, display: 'block' }} />
                Quick Summary for AI Engines &amp; Technical Leads
              </div>
              <p itemProp="description" style={{ fontSize: 15.5, fontWeight: 400, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
                {data.aeoBox}
              </p>
            </article>
          </div>
        </section>

        {/* ─── COMPONENT 3: DEEP-DIVE CAPABILITIES ─── */}
        <section id="deep-dive" style={{ background: 'var(--off-white)', padding: '80px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="mx-auto text-center mb-12" style={{ maxWidth: 780 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--purple-dark)',
                  marginBottom: 14,
                }}
              >
                Deep-Dive Capabilities
              </div>
              <h2
                className="headline-light"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 16px', lineHeight: 1.2 }}
              >
                {data.deepDive.question}
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {data.deepDive.framing}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.deepDive.pillars.map((p, i) => (
                <article
                  key={`pillar-${i}-${p.title.slice(0, 24)}`}
                  className="card-lift"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-clr)',
                    borderRadius: 12,
                    padding: '28px 26px',
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 10,
                      background: 'var(--purple-light)',
                      color: 'var(--purple-dark)',
                      fontFamily: "'Fraunces', serif",
                      fontSize: 15,
                      fontWeight: 600,
                    }}
                  >
                    0{i + 1}
                  </div>
                  <h3
                    style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 14px', lineHeight: 1.3 }}
                  >
                    {p.title}
                  </h3>
                  <div style={{ marginBottom: 12 }}>
                    <div
                      style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 5 }}
                    >
                      Technical Architecture
                    </div>
                    <p style={{ fontSize: 13.5, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{p.technical}</p>
                  </div>
                  <div>
                    <div
                      style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 5 }}
                    >
                      Human &amp; Operational Impact
                    </div>
                    <p style={{ fontSize: 13.5, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{p.human}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── COMPONENT 4: METRIC-DRIVEN BLUEPRINT ─── */}
        <section style={{ background: 'var(--white)', padding: '80px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="text-center mb-12">
              <div
                style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}
              >
                Metric-Driven Blueprint
              </div>
              <h2
                className="headline-light"
                style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}
              >
                {data.blueprint.title}
              </h2>
            </div>

            {/* Horizontal stepper on desktop, vertical on mobile */}
            <ol className="grid grid-cols-1 md:grid-cols-4 gap-5" style={{ padding: 0, margin: 0, listStyle: 'none' }}>
              {data.blueprint.phases.map((phase, i) => (
                <li
                  key={`phase-${phase.num}-${phase.name.slice(0, 20)}`}
                  className="relative"
                  style={{
                    background: 'var(--off-white)',
                    border: '1px solid var(--border-clr)',
                    borderRadius: 12,
                    padding: '24px 22px',
                    position: 'relative',
                  }}
                >
                  <div
                    className="flex items-center gap-3 mb-3"
                  >
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: '50%',
                        background: 'var(--purple)',
                        color: '#fff',
                        fontFamily: "'Fraunces', serif",
                        fontSize: 14,
                        fontWeight: 600,
                        flexShrink: 0,
                      }}
                    >
                      {phase.num}
                    </div>
                    <div
                      style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--purple-dark)' }}
                    >
                      {phase.timeframe}
                    </div>
                  </div>
                  <h3
                    style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.3 }}
                  >
                    {phase.name}
                  </h3>
                  <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{phase.body}</p>
                  {/* Connector arrow (desktop only, not for last item) */}
                  {i < data.blueprint.phases.length - 1 && (
                    <div
                      aria-hidden
                      className="hidden md:flex"
                      style={{
                        position: 'absolute',
                        right: -18,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--purple)',
                        opacity: 0.55,
                        zIndex: 1,
                      }}
                    >
                      <ArrowRight size={22} />
                    </div>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── SIBLINGS: RELATED CLUSTER PAGES ─── */}
        {siblings.length > 0 && (
          <section style={{ background: 'var(--off-white)', padding: '64px 40px' }}>
            <div className="mx-auto" style={{ maxWidth: 1100 }}>
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
                <h2
                  style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}
                >
                  Continue exploring {data.pillarName}
                </h2>
                <Link
                  to={`/solutions/${pillar}`}
                  style={{ fontSize: 13, fontWeight: 500, color: 'var(--purple-dark)', textDecoration: 'none' }}
                >
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/solutions/${s.pillar}/${s.slug}`}
                    className="card-lift"
                    style={{
                      display: 'block',
                      background: 'var(--white)',
                      border: '1px solid var(--border-clr)',
                      borderRadius: 12,
                      padding: '22px 22px',
                      textDecoration: 'none',
                    }}
                  >
                    <div
                      style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 8 }}
                    >
                      {pillarMeta[s.pillar].short}
                    </div>
                    <h3
                      style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.35 }}
                    >
                      {s.subLabel}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{ fontSize: 13, fontWeight: 500, color: 'var(--purple-dark)' }}
                    >
                      Read more <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── COMPONENT 5: GEOGRAPHY + FINAL CTA ─── */}
        <section
          className="relative"
          style={{ background: 'var(--dark)', padding: '80px 40px', overflow: 'hidden' }}
        >
          <div
            className="absolute pointer-events-none"
            style={{ width: 560, height: 560, top: -140, left: -160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,59,237,0.18) 0%, transparent 68%)' }}
          />
          <div className="relative z-10 mx-auto text-center" style={{ maxWidth: 720 }}>
            <div
              style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 16 }}
            >
              Get Started
            </div>
            <h2
              style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 'clamp(26px, 3.4vw, 38px)', letterSpacing: '-0.6px', color: '#fff', margin: '0 0 14px', lineHeight: 1.2 }}
            >
              {finalHeadline}
            </h2>
            <p style={{ fontSize: 15.5, fontWeight: 300, color: 'rgba(255,255,255,0.7)', lineHeight: 1.65, margin: '0 0 28px' }}>
              {data.geography.body}
            </p>
            <div className="flex justify-center flex-wrap gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-purple inline-flex items-center gap-2"
                style={{ padding: '14px 28px', fontSize: 15, fontWeight: 500 }}
              >
                {UNIVERSAL_CTA} <ArrowRight size={15} />
              </a>
            </div>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: 16 }}>
              <Check size={12} style={{ display: 'inline-block', marginRight: 6, verticalAlign: '-2px' }} />
              NDA-protected &middot; Bengaluru-engineered &middot; Global delivery
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
