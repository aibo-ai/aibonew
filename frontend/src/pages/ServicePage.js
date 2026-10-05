import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import SectionLabel from "@/components/sections/SectionLabel";
import PostIt from "@/components/sections/PostIt";
import FaqTwoColumn from "@/components/sections/FaqTwoColumn";
import TickerCta from "@/components/sections/TickerCta";
import AuditScorecard from "@/components/sections/AuditScorecard";
import VisibilitySnapshot from "@/components/sections/VisibilitySnapshot";
import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";
import { splitHeadline } from "@/lib/splitHeadline";
import { getClustersForPillar } from "@/data/clusterPagesData";
import { geoData } from "@/data/geoData";
import { aeoData } from "@/data/aeoData";
import { seoData } from "@/data/seoData";
import { contentMarketingData } from "@/data/contentMarketingData";
import { aiAutomationsData } from "@/data/aiAutomationsData";
import { fullStackData } from "@/data/fullStackData";
import SEO from "@/components/SEO";
import NotFoundPage from "@/pages/NotFoundPage";

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
  'full-stack': {
    title: "Full Stack Development — Built to Last | MyAibo",
    description: "Web apps, AI-integrated products, e-commerce platforms, and APIs built front to back. Modern stacks, zero technical debt, 100% IP ownership.",
    keywords: ['full stack development', 'custom machine learning solutions', 'AI ML solutions'],
  },
};

const dataMap = {
  geo: geoData, aeo: aeoData, seo: seoData,
  'content-marketing': contentMarketingData, 'ai-automations': aiAutomationsData, 'full-stack': fullStackData,
};

const pillarShort = {
  geo: 'GEO', aeo: 'AEO', seo: 'SEO', 'content-marketing': 'Content Marketing',
  'ai-automations': 'AI Automation', 'full-stack': 'Full Stack',
};

export default function ServicePage() {
  const { slug } = useParams();
  const data = dataMap[slug];
  const seoMeta = seoMetaData[slug];

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!data) return <NotFoundPage />;

  const short = pillarShort[slug] || data.pageTitle;
  const isTech = data.type === 'technology';
  const practice = isTech ? 'Technology' : 'Marketing';
  const h1 = splitHeadline(data.headline);
  const approachH2 = splitHeadline(data.intro.headline);

  const allClusters = getClustersForPillar(slug);
  const compareRows = data.comparison.without.items.map((a, i) => ({ a, b: data.comparison.with.items[i] }));
  const lastWhy = data.whyNow.stats[data.whyNow.stats.length - 1];

  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Service', name: short, serviceType: data.pageTitle,
    provider: { '@type': 'Organization', name: 'MyAibo', url: 'https://www.myaibo.in' },
    areaServed: 'India', description: seoMeta?.description,
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.myaibo.in/' },
      { '@type': 'ListItem', position: 2, name: short, item: `https://www.myaibo.in/solutions/${slug}` },
    ],
  };
  const faqLd = data.pillarFaq && data.pillarFaq.length > 0 ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: data.pillarFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null;

  return (
    <>
      {seoMeta && <SEO title={seoMeta.title} description={seoMeta.description} path={`/solutions/${slug}`} keywords={seoMeta.keywords} />}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Helmet>

      <main>
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 104px' }}>
          <div className="relative mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div className="flex" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span><span>Solutions</span><span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>{short}</span>
            </div>

            <div className="grid items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 64 }}>
              <div className="flex flex-col">
                <div className="self-start inline-flex items-center gap-2" style={{ maxWidth: '100%', marginBottom: 24, lineHeight: 1.35, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
                  <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>{practice} &middot; {data.pageTitle}</span>
                </div>
                <h1 style={{ margin: '0 0 24px', fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-2px' }}>
                  {h1.a}
                  <span style={{ background: 'var(--acc)', color: 'var(--dark)', padding: '0 12px 4px', borderRadius: 10, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>{h1.b}</span>
                </h1>
                <p style={{ margin: '0 0 34px', maxWidth: 560, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{data.subheadline}</p>
                <div className="flex flex-wrap" style={{ gap: 14 }}>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center" style={{ whiteSpace: 'nowrap', padding: '16px 30px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }} onClick={() => trackBookingClick({ page: `/solutions/${slug}`, placement: 'hero' })}>
                    Book Free Strategy Session
                  </a>
                  <Link to="/case-studies" className="inline-flex items-center" style={{ whiteSpace: 'nowrap', padding: '16px 28px', borderRadius: 8, background: '#fff', border: '1px solid var(--border-clr)', color: 'var(--text-primary)', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
                    View Case Studies &rarr;
                  </Link>
                </div>
              </div>

              <div className="relative" style={{ padding: '10px 0 30px' }}>
                <div style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, boxShadow: '0 30px 60px -20px rgba(15,10,30,.25)', overflow: 'hidden' }}>
                  <div className="flex items-center justify-between" style={{ padding: '14px 20px', background: 'var(--off-white)', borderBottom: '1px solid var(--border-clr)' }}>
                    <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10.5, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>IN THIS PRACTICE</span>
                    <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: 'var(--purple-dark)' }}>{allClusters.length} services</span>
                  </div>
                  {allClusters.map((c, i) => (
                    <Link
                      key={c.slug}
                      to={`/solutions/${slug}/${c.slug}`}
                      className="w-full flex items-center text-left"
                      style={{ gap: 14, padding: '16px 20px', background: 'none', border: 0, borderBottom: i < allClusters.length - 1 ? '1px solid var(--border-clr)' : 'none', color: 'var(--text-primary)', cursor: 'pointer', textDecoration: 'none' }}
                    >
                      <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="flex-1" style={{ fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 15.5, lineHeight: 1.3 }}>{c.subLabel}</span>
                      <span style={{ color: 'var(--purple)' }}>&rarr;</span>
                    </Link>
                  ))}
                </div>
                {lastWhy && (
                  <div className="hidden md:block" style={{ position: 'absolute', right: -50, top: 'calc(100% - 32px)', zIndex: 5 }}>
                    <PostIt rotate={-4} width={210} big={lastWhy.num}>{lastWhy.label.replace(/\.$/, '')}</PostIt>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── WHY THIS MATTERS ── */}
        <section style={{ padding: '104px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="Why this matters" amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                The shift, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>in four numbers.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))', gap: 16 }}>
              {data.whyNow.stats.map((w, i) => {
                const amberCell = i % 2 === 1;
                return (
                  <div key={w.label} className="flex flex-col" style={{ background: amberCell ? 'var(--acc)' : 'var(--off-white)', border: amberCell ? '1px solid var(--acc)' : '1px solid var(--border-clr)', borderRadius: 16, padding: 26, gap: 36, minHeight: 250 }}>
                    <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', color: amberCell ? 'var(--dark)' : 'var(--text-muted)', opacity: amberCell ? 0.7 : 1 }}>{String(i + 1).padStart(2, '0')}</div>
                    <div style={{ marginTop: 'auto' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 58, fontWeight: 600, lineHeight: 0.95, letterSpacing: '-1.5px', color: amberCell ? 'var(--dark)' : 'var(--purple-dark)' }}>{w.num}</div>
                      <div style={{ marginTop: 12, fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 15, lineHeight: 1.5, color: amberCell ? 'var(--dark)' : 'var(--text-secondary)', opacity: amberCell ? 0.85 : 1 }}>{w.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {(slug === 'geo' || slug === 'aeo') && (slug === 'geo' ? <AuditScorecard /> : <VisibilitySnapshot />)}

        {/* ── WHAT WE DO ── */}
        <section style={{ padding: '104px 32px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="What we do" />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                A complete {short} stack, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>run end-to-end.</em>
              </h2>
            </div>
            {/* Four cards read as a 2×2 grid instead of 3 + an orphan. Each card is
                a 4-row subgrid (label · title · body · stat) so titles, copy and
                the amber stat pill line up across a row. */}
            <div className="grid" style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${(data.deepDiveCards || []).length === 4 ? 440 : 320}px), 1fr))`, gap: 16 }}>
              {(data.deepDiveCards || []).map((c, i) => (
                <Link
                  key={c.slug}
                  to={`/solutions/${slug}/${c.slug}`}
                  className="text-left card-lift"
                  style={{ display: 'grid', gridRow: 'span 4', gridTemplateRows: 'subgrid', rowGap: 14, alignContent: 'start', cursor: 'pointer', background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 26, color: 'var(--text-primary)', textDecoration: 'none' }}
                >
                  <div className="flex items-center gap-2">
                    <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>{String(i + 1).padStart(2, '0')} / SERVICE</span>
                    <span className="flex items-center justify-center" style={{ marginLeft: 'auto', width: 30, height: 30, borderRadius: '50%', border: '1px solid var(--border-clr)', color: 'var(--purple)' }}>&#8599;</span>
                  </div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, lineHeight: 1.15, letterSpacing: '-0.3px' }}>{c.title}</div>
                  <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{c.body}</p>
                  <div className="flex items-start" style={{ alignSelf: 'start', marginTop: 6, gap: 10, padding: '12px 14px', borderRadius: 10, background: 'var(--acc)' }}>
                    <span className="flex-shrink-0" style={{ width: 6, height: 6, marginTop: 7, borderRadius: '50%', background: 'var(--dark)' }} />
                    <span style={{ fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13.5, lineHeight: 1.45, color: 'var(--dark)' }}>{c.stat}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR APPROACH (dark) ── */}
        <section style={{ padding: '104px 32px', background: 'var(--dark)', color: '#fff' }}>
          <div className="mx-auto grid items-center" style={{ maxWidth: 1180, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: 56 }}>
            <div className="flex flex-col" style={{ gap: 22 }}>
              <SectionLabel text="Our approach" dark amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                {approachH2.a}<em style={{ color: 'var(--acc)', fontStyle: 'normal' }}>{approachH2.b}</em>
              </h2>
              {data.intro.body.slice(0, 2).map((t, i) => (
                <p key={`ap-${i}-${t.slice(0, 16)}`} style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16.5, lineHeight: 1.7, color: 'rgba(255,255,255,.72)' }}>{t}</p>
              ))}
            </div>
            <div style={{ background: 'var(--dark-mid)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, overflow: 'hidden' }}>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))', fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <div style={{ padding: '16px 20px', color: 'rgba(255,255,255,.55)' }}>{data.comparison.without.title}</div>
                <div style={{ padding: '16px 20px', background: 'var(--acc)', color: 'var(--dark)' }}>{data.comparison.with.title}</div>
              </div>
              {compareRows.map((r) => (
                <div key={r.a} className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))', borderTop: '1px solid rgba(255,255,255,.08)' }}>
                  <div className="flex" style={{ padding: '16px 20px', gap: 10, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,.6)' }}>
                    <span className="flex-shrink-0" style={{ color: 'rgba(255,255,255,.35)' }}>&#10005;</span><span>{r.a}</span>
                  </div>
                  <div className="flex" style={{ padding: '16px 20px', gap: 10, fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 14.5, lineHeight: 1.5, color: '#fff', background: 'rgba(124,59,237,.12)' }}>
                    <span className="flex-shrink-0" style={{ color: 'var(--acc)' }}>&#10003;</span><span>{r.b}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR PROCESS ── */}
        <section style={{ padding: '104px 32px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="Our process" />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                From first audit <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>to cited default.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))', gap: 14 }}>
              {data.process.steps.map((s, i) => {
                const isLast = i === data.process.steps.length - 1;
                return (
                <div key={s.title} className="flex flex-col" style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, padding: '24px 22px', gap: 14, minHeight: 330 }}>
                  <span style={{ whiteSpace: 'nowrap', fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>PHASE {String(i + 1).padStart(2, '0')}</span>
                  {s.timeframe && (
                    <span className="self-start" style={{ whiteSpace: 'nowrap', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, padding: '4px 10px', borderRadius: 999, background: isLast ? 'var(--dark)' : 'var(--acc)', color: isLast ? '#fff' : 'var(--dark)' }}>{s.timeframe}</span>
                  )}
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 600, lineHeight: 1.2 }}>{s.title}</div>
                  <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.body}</p>
                  {s.deliverable && (
                    <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px dashed var(--border-clr)' }}>
                      <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>DELIVERABLE</div>
                      <div style={{ marginTop: 4, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13.5, lineHeight: 1.4, color: 'var(--purple-dark)' }}>{s.deliverable}</div>
                    </div>
                  )}
                </div>
                );
              })}
            </div>
            <div className="text-center" style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
              &#10022; Then: review, optimise, and double down. &#10022;
            </div>
          </div>
        </section>

        {/* ── DELIVERABLES ── */}
        <section style={{ padding: '104px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text={data.deliverables.label} />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                What you <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>walk away with.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', borderTop: '1px solid var(--border-clr)', borderLeft: '1px solid var(--border-clr)' }}>
              {data.deliverables.cards.map((c, i) => (
                <div key={c.title} className="flex flex-col" style={{ padding: 26, borderRight: '1px solid var(--border-clr)', borderBottom: '1px solid var(--border-clr)', gap: 10 }}>
                  <div className="flex items-baseline" style={{ gap: 10 }}>
                    <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: 'var(--purple)' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, lineHeight: 1.25 }}>{c.title}</span>
                  </div>
                  <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{c.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROVEN OUTCOMES ── */}
        <section style={{ padding: '104px 32px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="Proven outcomes" amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                Results that <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>compound.</em>
              </h2>
            </div>
            <div className="grid items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 40 }}>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: 1, background: 'var(--border-clr)', border: '1px solid var(--border-clr)', borderRadius: 16, overflow: 'hidden' }}>
                {data.results.metrics.map((m, i) => {
                  const amberCell = i === 1 || i === 2;
                  // Most results are short ("+178%"), but a few are longer
                  // descriptive phrases ("4.2× improvement") that overflow
                  // a fixed 46px display size — shrink those instead.
                  const statFontSize = m.result.length > 10 ? 'clamp(22px, 2.6vw, 30px)' : 'clamp(30px, 3.4vw, 46px)';
                  return (
                    <div key={m.metric} style={{ background: amberCell ? 'var(--acc)' : '#fff', padding: '28px 24px', minWidth: 0 }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: statFontSize, fontWeight: 600, lineHeight: 1.1, letterSpacing: '-1px', color: amberCell ? 'var(--dark)' : 'var(--purple-dark)', overflowWrap: 'break-word' }}>{m.result}</div>
                      <div style={{ marginTop: 10, fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 14, lineHeight: 1.45, color: amberCell ? 'var(--dark)' : 'var(--text-secondary)', opacity: amberCell ? 0.85 : 1 }}>{m.metric}</div>
                    </div>
                  );
                })}
              </div>
              {data.results.testimonial && (
                <PostIt quote rotate={-1.5} tapeRotate={2} author={data.results.testimonial.author}>
                  &ldquo;{data.results.testimonial.quote}&rdquo;
                </PostIt>
              )}
            </div>
          </div>
        </section>

        <FaqTwoColumn key={slug} items={data.pillarFaq} intro="Here's what founders and marketing leads ask us most." />
        <TickerCta page={`/solutions/${slug}`} />
      </main>
    </>
  );
}
