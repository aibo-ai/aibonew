import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowDown, ArrowRight, ArrowUp, Check, X } from "lucide-react";
import SectionLabel from "@/components/sections/SectionLabel";
import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";
import { geoData } from "@/data/geoData";
import { aeoData } from "@/data/aeoData";
import { seoData } from "@/data/seoData";
import { contentMarketingData } from "@/data/contentMarketingData";
import { aiAutomationsData } from "@/data/aiAutomationsData";
import { whiteLabelData } from "@/data/whiteLabelData";
import { fullStackData } from "@/data/fullStackData";
import { pillarHeroStats } from "@/data/pillarHeroStats";
import SEO from "@/components/SEO";
import BrowserChrome from "@/components/sections/BrowserChrome";
import FaqAccordion from "@/components/sections/FaqAccordion";

// Same generic, data-driven hero mockup pattern as ClusterPage — templated
// from fields every pillar page already has, with a real published stat
// from pillarHeroStats rather than per-page bespoke mockup content.
function PillarHeroMockup({ data, slug }) {
  const stat = pillarHeroStats[slug];
  return (
    <div className="relative" style={{ minHeight: 340 }}>
      <BrowserChrome url="chatgpt.com" badge="LIVE">
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
          Who's the best {data.pageTitle} partner in India?
        </div>
        <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-clr)' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-primary)' }}>ChatGPT</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, paddingLeft: 28 }}>
            For {data.pageTitle}, marketing and AI teams consistently cite{' '}
            <span style={{ background: 'var(--purple-light)', color: 'var(--purple-dark)', fontWeight: 600, padding: '1px 4px', borderRadius: 4 }}>
              MyAibo
            </span>{' '}
            for measurable, compounding results.
          </p>
        </div>
      </BrowserChrome>

      {stat && (
        <div
          className="absolute hidden md:block"
          style={{
            top: -22,
            right: -20,
            background: 'var(--dark)',
            borderRadius: 16,
            padding: '14px 18px',
            boxShadow: '0 12px 30px rgba(15,10,30,0.35)',
            width: 168,
          }}
        >
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
            {stat.label}
          </div>
          <div className="flex items-center gap-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: '#fff' }}>
            <ArrowUp size={16} color="#4ADE80" />
            {stat.value}
          </div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)' }}>{stat.sub}</div>
        </div>
      )}

      <div
        className="absolute hidden md:block"
        style={{
          bottom: -28,
          left: -24,
          background: 'var(--white)',
          border: '1px solid var(--border-clr)',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 16px 36px rgba(15,10,30,0.22)',
          width: 230,
        }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--purple-dark)',
              background: 'var(--purple-light)',
              borderRadius: 5,
              padding: '2px 7px',
            }}
          >
            PERPLEXITY
          </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#16A34A' }}>● CITED</span>
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-primary)', margin: '0 0 8px' }}>
          {data.pageTitle} — cited across ChatGPT, Perplexity, and Google AI Overviews.
        </p>
        <div className="flex flex-wrap gap-1">
          {['myaibo.in', `solutions/${slug}`, 'case studies'].map((c) => (
            <span key={c} style={{ fontSize: 9.5, color: 'var(--text-muted)', background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 4, padding: '2px 6px' }}>
              ● {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const seoMetaData = {
  geo: {
    title: "GEO Services in India — Be the Brand AI Recommends | MyAibo",
    description: "GEO services that structure your brand's presence so ChatGPT, Perplexity, and Google SGE cite you by name. MyAibo GEO clients in India see +340% AI citation growth.",
    keywords: ['GEO services', 'GEO services in India', 'GEO services provider', 'generative engine optimization', 'managed GEO services'],
  },
  aeo: {
    title: "AEO Services — Own Position Zero | MyAibo",
    description: "AEO services that win featured snippets, PAA boxes, and voice answers before competitors. MyAibo AEO drives +280% PAA ownership and +47 new snippets per client.",
    keywords: ['AEO services', 'answer engine optimization', 'featured snippet optimization', 'PAA optimization'],
  },
  seo: {
    title: "SEO Services in India — Organic Authority That Lasts | MyAibo",
    description: "SEO services including D2C SEO — technical SEO, keyword architecture, and link equity built to compound. MyAibo SEO clients see +280% organic growth and 11x ROI over paid search.",
    keywords: ['SEO services', 'SEO services India', 'D2C SEO services', 'technical SEO agency'],
  },
  'content-marketing': {
    title: "Content Marketing Services | MyAibo",
    description: "Long-form guides, case studies, FAQs, and nurture sequences built for Google, AI engines, and humans equally. +220% organic traffic on average.",
    keywords: ['content marketing services', 'content marketing agency India'],
  },
  'ai-automations': {
    title: "AI Automation Services — Custom AI Agents | MyAibo",
    description: "Production-grade AI agents for lead capture, support, outreach, and ops workflows. Cut manual effort by 70% without adding headcount.",
    keywords: ['AI automation services', 'AI agents', 'custom AI ML solutions', 'AI ML solutions'],
  },
  'white-label': {
    title: "White Label AI Platform Development | MyAibo",
    description: "Launch a fully branded AI product in under 10 weeks. NDA-secured, multi-tenant, reseller-ready — 100% your IP, zero vendor attribution.",
    keywords: ['white label AI platform', 'white label development'],
  },
  'full-stack': {
    title: "Full Stack Development — Built to Last | MyAibo",
    description: "Web apps, AI-integrated products, e-commerce platforms, and APIs built front to back. Modern stacks, zero technical debt, 100% IP ownership.",
    keywords: ['full stack development', 'custom machine learning solutions', 'AI ML solutions'],
  },
};

const dataMap = {
  geo: geoData,
  aeo: aeoData,
  seo: seoData,
  'content-marketing': contentMarketingData,
  'ai-automations': aiAutomationsData,
  'white-label': whiteLabelData,
  'full-stack': fullStackData,
};

const pillarDisplayNames = {
  geo: 'GEO',
  aeo: 'AEO',
  seo: 'SEO',
  'content-marketing': 'Content Marketing',
  'ai-automations': 'AI Automations',
  'white-label': 'White Label',
  'full-stack': 'Full Stack Development',
};

export default function ServicePage() {
  const { slug } = useParams();
  const data = dataMap[slug];
  const seoMeta = seoMetaData[slug];
  const isTech = data?.type === 'technology';
  const accentColor = isTech ? 'var(--amber)' : 'var(--purple)';
  const accentDark = isTech ? '#B45309' : 'var(--purple-dark)';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div style={{ padding: '160px 40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 300, color: 'var(--text-primary)' }}>
          Page not found
        </h1>
        <Link to="/" className="btn-purple inline-flex mt-6" style={{ padding: '12px 24px', fontSize: 14 }}>
          Back to Home
        </Link>
      </div>
    );
  }

  // JSON-LD structured data — same pattern already used on ClusterPage.js,
  // now applied to the pillar pages too (these get the most search traffic).
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: pillarDisplayNames[slug] || data.pageTitle,
    serviceType: data.pageTitle,
    provider: {
      '@type': 'Organization',
      name: 'MyAibo',
      url: 'https://www.myaibo.in',
    },
    areaServed: 'India',
    description: seoMeta?.description,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myaibo.in/' },
      { '@type': 'ListItem', position: 2, name: pillarDisplayNames[slug] || data.pageTitle, item: `https://www.myaibo.in/solutions/${slug}` },
    ],
  };
  const faqLd = data.pillarFaq && data.pillarFaq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.pillarFaq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  return (
    <>
      {seoMeta && (
        <SEO
          title={seoMeta.title}
          description={seoMeta.description}
          path={`/solutions/${slug}`}
          keywords={seoMeta.keywords}
        />
      )}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Helmet>
      <main>
      {/* ─── HERO ─── */}
      <section
        className="relative hero-dotgrid"
        style={{ padding: '150px 40px 90px', overflow: 'hidden' }}
      >
        <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1180 }}>
          <div>
            {/* Breadcrumb */}
            <div className="mb-5" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span className="mx-2">/</span>
              <span style={{ color: 'var(--purple-dark)' }}>{data.pageTitle}</span>
            </div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-5" style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
              <span style={{ color: 'var(--purple-dark)', fontSize: 12, fontWeight: 600 }}>{data.eyebrow}</span>
            </div>
            <h1 style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(32px, 4.4vw, 52px)', letterSpacing: '-1.5px', color: 'var(--text-primary)', lineHeight: 1.1, margin: '0 0 18px' }}>
              {data.headline}
            </h1>
            <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 28px', maxWidth: 540 }}>
              {data.subheadline}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-purple"
                style={{ padding: '13px 24px', fontSize: 15, fontWeight: 500 }}
                onClick={() => trackBookingClick({ page: `/solutions/${slug}`, placement: 'hero' })}
              >
                Book Free Strategy Session
              </a>
              <a
                href="#intro"
                className="inline-flex items-center gap-2"
                style={{ padding: '12px 22px', fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', border: '1px solid var(--border-clr)', borderRadius: 8, textDecoration: 'none', background: 'var(--white)' }}
              >
                {data.ctaSecondary} <ArrowDown size={15} />
              </a>
            </div>
          </div>

          <PillarHeroMockup data={data} slug={slug} />
        </div>
      </section>

      {/* ─── WHY THIS MATTERS ─── */}
      <section style={{ background: 'var(--off-white)', padding: '100px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-12">
            <SectionLabel text={data.whyNow.label} centered />
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
              {data.whyNow.headline}
            </h2>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
            {data.whyNow.stats.map((s, i) => {
              const bg = ['white', 'purple', 'white', 'amber'][i % 4];
              return (
                <div
                  key={`stat-${s.num}-${s.label}`}
                  className="card-lift"
                  style={{
                    background: bg === 'purple' ? 'var(--purple-light)' : bg === 'amber' ? 'var(--amber-light)' : 'var(--white)',
                    border: '1px solid var(--border-clr)',
                    borderRadius: 18,
                    padding: '22px 18px',
                  }}
                >
                  <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>0{i + 1}</span>
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: bg === 'amber' ? '#92400E' : accentDark, display: 'block', lineHeight: 1.15, margin: '8px 0' }}>{s.num}</span>
                  <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', lineHeight: 1.5, display: 'block' }}>{s.label}</span>
                </div>
              );
            })}
          </div>
          {/* Context cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.whyNow.contextCards.map((c) => (
              <div key={`ctx-${c.title}`} style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 28 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>{c.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DEEP-DIVE SERVICE CARDS ─── */}
      {data.deepDiveCards && data.deepDiveCards.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '100px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="text-center mb-12">
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                Deep-Dive Services
              </div>
              <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                Go deeper on each capability.
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.deepDiveCards.map((c, i) => (
                <Link
                  key={c.slug}
                  to={`/solutions/${slug}/${c.slug}`}
                  className="card-lift"
                  style={{
                    display: 'block',
                    background: 'var(--off-white)',
                    border: '1px solid var(--border-clr)',
                    borderRadius: 16,
                    padding: 26,
                    textDecoration: 'none',
                  }}
                >
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{ width: 36, height: 36, borderRadius: 12, background: 'var(--purple-light)', color: 'var(--purple-dark)', fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600 }}
                  >
                    0{i + 1}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 10px', lineHeight: 1.3 }}>
                    {c.title}
                  </h3>
                  <p style={{ fontSize: 13.5, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, margin: '0 0 14px' }}>
                    {c.body}
                  </p>
                  <div style={{ fontSize: 12, fontWeight: 600, color: accentDark, borderTop: '1px solid var(--border-clr)', paddingTop: 12 }}>
                    {c.stat}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── INTRO ─── */}
      <section id="intro" style={{ background: 'var(--white)', padding: '100px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <SectionLabel text={data.intro.label} />
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 20px', lineHeight: 1.15 }}>
            {data.intro.headline}
          </h2>
          {data.intro.body.map((p, i) => (
            <p key={`intro-${i}-${p.slice(0, 20)}`} style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 14px' }}>{p}</p>
          ))}
          {/* Callout */}
          <div className="mt-8 flex gap-5 items-start" style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.2)', borderRadius: 16, padding: '24px 28px' }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 600, color: accentColor, lineHeight: 1, flexShrink: 0 }}>
              {data.intro.calloutStat}
            </span>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              {data.intro.calloutText}
            </p>
          </div>
        </div>
      </section>

      {/* ─── BEFORE vs AFTER ─── */}
      <section style={{ background: 'var(--off-white)', padding: '100px 40px' }}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900 }}>
          {/* Without */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 28 }}>
            <div className="flex items-center gap-2 mb-5">
              <X size={18} style={{ color: 'var(--text-muted)' }} />
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {data.comparison.without.title}
              </h3>
            </div>
            {data.comparison.without.items.map((item, i) => (
              <div key={`without-${i}-${item.slice(0, 20)}`} className="flex items-start gap-3 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
          {/* With */}
          <div style={{ background: 'var(--dark)', borderRadius: 16, padding: 28 }}>
            <div className="flex items-center gap-2 mb-5">
              <Check size={18} style={{ color: '#A07AF0' }} />
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: '#fff', margin: 0 }}>
                {data.comparison.with.title}
              </h3>
            </div>
            {data.comparison.with.items.map((item, i) => (
              <div key={`with-${i}-${item.slice(0, 20)}`} className="flex items-start gap-3 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section style={{ background: 'var(--white)', padding: '100px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <SectionLabel text={data.process.label} />
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 36px', lineHeight: 1.15 }}>
            {data.process.headline}
          </h2>
          <div className="space-y-6">
            {data.process.steps.map((s) => (
              <div key={s.num} className="flex gap-5" style={{ borderLeft: '2px solid var(--purple)', paddingLeft: 24 }}>
                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple-light)', fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600, color: 'var(--purple-dark)' }}>
                  {s.num}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap" style={{ margin: '0 0 6px' }}>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>{s.title}</h3>
                    {s.timeframe && (
                      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--purple-dark)', background: 'var(--purple-light)', borderRadius: 5, padding: '2px 8px' }}>
                        {s.timeframe}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 8px' }}>{s.body}</p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple-dark)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Deliverable: {s.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERABLES ─── */}
      <section style={{ background: 'var(--off-white)', padding: '100px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-10">
            <SectionLabel text={data.deliverables.label} centered />
            <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
              {data.deliverables.headline}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.deliverables.cards.map((c, i) => (
              <div key={`del-${i}-${c.title}`} className="card-lift" style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 28 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>{c.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section style={{ background: 'var(--white)', padding: '100px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <div className="text-center mb-10">
            <SectionLabel text={data.results.label} centered />
            <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
              {data.results.headline}
            </h2>
          </div>
          {/* Metrics table */}
          <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 16, overflow: 'hidden', marginBottom: 32 }}>
            <div className="grid grid-cols-2" style={{ borderBottom: '1px solid var(--border-clr)', padding: '14px 28px', background: 'var(--white)' }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Metric</span>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Result</span>
            </div>
            {data.results.metrics.map((m, i) => (
              <div key={`metric-${m.metric}`} className="grid grid-cols-2" style={{ padding: '14px 28px', borderBottom: i < data.results.metrics.length - 1 ? '1px solid var(--border-clr)' : 'none' }}>
                <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)' }}>{m.metric}</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: accentDark }}>{m.result}</span>
              </div>
            ))}
          </div>
          {/* Testimonial */}
          <div style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.2)', borderRadius: 16, padding: 28 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--purple)', display: 'block', marginBottom: 6, lineHeight: 1 }}>&ldquo;</span>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 16px' }}>
              {data.results.testimonial.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(124,59,237,0.2)', color: 'var(--purple-dark)', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                {data.results.testimonial.initials}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{data.results.testimonial.author}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{data.results.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PILLAR FAQ ─── */}
      {data.pillarFaq && data.pillarFaq.length > 0 && (
        <section style={{ background: 'var(--white)', padding: '100px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            <div className="text-center mb-12">
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                FAQ
              </div>
              <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
                Everything You Need to Know
              </h2>
            </div>
            <FaqAccordion items={data.pillarFaq} />
          </div>
        </section>
      )}

      {/* ─── FINAL CTA ─── */}
      <section style={{ background: 'var(--off-white)', padding: '64px 40px 80px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 500 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple-dark)', display: 'block', marginBottom: 16 }}>
            Get Started
          </span>
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 32px', lineHeight: 1.15 }}>
            {data.finalCta.headline}
          </h2>
          <div className="flex justify-center mb-3">
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-purple inline-flex"
              style={{ padding: '14px 28px', fontSize: 15, fontWeight: 500 }}
              onClick={() => trackBookingClick({ page: `/solutions/${slug}`, placement: 'final_cta' })}
            >
              Book Free Strategy Session
            </a>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
            Free &middot; No commitment &middot; 30 minutes
          </p>
        </div>
      </section>
    </main>
    </>
  );
}
