import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ArrowRight, ArrowDown, ArrowUp } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { getCluster, getClustersForPillar } from '@/data/clusterPagesData';
import { geoStoryData } from '@/data/geoStoryData';
import SEO from '@/components/SEO';
import WordTicker from '@/components/sections/WordTicker';
import FaqAccordion from '@/components/sections/FaqAccordion';

const UNIVERSAL_CTA = 'Book Free Strategy Session';

const ACCENT_BG = {
  white: 'var(--white)',
  purple: 'var(--purple-light)',
  amber: 'var(--amber-light)',
};
const ACCENT_STAT_COLOR = {
  white: 'var(--purple-dark)',
  purple: 'var(--purple-dark)',
  amber: '#92400E',
};

// Renders an h1 as "first sentence (regular) second sentence (italic)" —
// the two-tone headline treatment from the reference design, driven by the
// existing plain-text h1 string in clusterPagesData rather than new copy.
function splitHeadline(h1) {
  const idx = h1.indexOf('. ');
  if (idx === -1) return [h1, null];
  return [h1.slice(0, idx + 1), h1.slice(idx + 2)];
}

function BrowserChrome({ url, badge, children }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: 14,
        border: '1px solid var(--border-clr)',
        boxShadow: '0 20px 60px rgba(15,10,30,0.18)',
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center gap-2"
        style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-clr)', background: 'var(--off-white)' }}
      >
        <div className="flex items-center gap-1.5">
          {['#ED6A5E', '#F4BF4F', '#61C454'].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </div>
        <div
          className="flex-1 text-center"
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: 'var(--text-muted)',
            background: 'var(--white)',
            border: '1px solid var(--border-clr)',
            borderRadius: 6,
            padding: '4px 10px',
            margin: '0 8px',
          }}
        >
          {url}
        </div>
        {badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--purple-dark)',
              background: 'var(--purple-light)',
              border: '1px solid rgba(124,59,237,0.3)',
              borderRadius: 5,
              padding: '3px 7px',
              flexShrink: 0,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}

function HeroMockup({ slug, mockup }) {
  const isWiki = slug === 'wikipedia';
  return (
    <div className="relative" style={{ minHeight: 380 }}>
      <BrowserChrome url={mockup.browserUrl} badge={mockup.badge}>
        {isWiki ? (
          <>
            <div style={{ fontFamily: "'Fraunces', serif", fontSize: 19, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 10 }}>
              {mockup.articleTitle}
            </div>
            <div
              style={{
                float: 'right',
                width: 120,
                background: 'var(--off-white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 8,
                padding: 10,
                marginLeft: 12,
                marginBottom: 8,
              }}
            >
              {mockup.infobox.map((row) => (
                <div key={row.k} style={{ marginBottom: 6 }}>
                  <div style={{ fontSize: 9, fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>{row.k}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-primary)' }}>{row.v}</div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
              <strong style={{ color: 'var(--text-primary)' }}>{mockup.articleTitle}</strong> {mockup.paragraph}
              {mockup.citations.map((c) => (
                <sup key={c} style={{ color: 'var(--purple-dark)', fontWeight: 600, marginLeft: 2 }}>{c}</sup>
              ))}
            </p>
          </>
        ) : (
          <>
            <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
              {mockup.question}
            </div>
            {mockup.answers.map((a) => (
              <div key={a.user} style={{ paddingTop: 12, marginTop: 12, borderTop: '1px solid var(--border-clr)' }}>
                <div className="flex items-center gap-2" style={{ marginBottom: 4 }}>
                  <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
                  <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-primary)' }}>{a.user}</span>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>· {a.time}</span>
                </div>
                <p style={{ fontSize: 12.5, lineHeight: 1.6, color: 'var(--text-secondary)', margin: '0 0 4px', paddingLeft: 28 }}>{a.body}</p>
                <div style={{ fontSize: 11, color: 'var(--purple-dark)', fontWeight: 600, paddingLeft: 28 }}>
                  ↑ {a.upvotes} · Reply
                </div>
              </div>
            ))}
          </>
        )}
      </BrowserChrome>

      {/* Floating stat card */}
      <div
        className="absolute hidden md:block"
        style={{
          top: -22,
          right: -20,
          background: 'var(--dark)',
          borderRadius: 12,
          padding: '14px 18px',
          boxShadow: '0 12px 30px rgba(15,10,30,0.35)',
          width: 168,
        }}
      >
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
          {mockup.statCard.label}
        </div>
        <div className="flex items-center gap-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: '#fff' }}>
          <ArrowUp size={16} color="#4ADE80" />
          {mockup.statCard.value}
        </div>
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)' }}>{mockup.statCard.sublabel}</div>
      </div>

      {/* Floating AI-answer card */}
      <div
        className="absolute hidden md:block"
        style={{
          bottom: -28,
          left: -24,
          background: 'var(--white)',
          border: '1px solid var(--border-clr)',
          borderRadius: 12,
          padding: 16,
          boxShadow: '0 16px 36px rgba(15,10,30,0.22)',
          width: 240,
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
            {mockup.aiCard.source}
          </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#16A34A' }}>● {mockup.aiCard.badge}</span>
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-primary)', margin: '0 0 8px' }}>
          {mockup.aiCard.answer}{' '}
          <span style={{ background: 'var(--purple-light)', color: 'var(--purple-dark)', fontWeight: 600, padding: '1px 4px', borderRadius: 4 }}>
            {mockup.aiCard.highlight}
          </span>{' '}
          {mockup.aiCard.rest}
        </p>
        <div className="flex flex-wrap gap-1">
          {mockup.aiCard.chips.map((c) => (
            <span key={c} style={{ fontSize: 9.5, color: 'var(--text-muted)', background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 4, padding: '2px 6px' }}>
              ● {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GeoStoryPage({ slug }) {
  const cluster = slug;
  const pillar = 'geo';
  const data = getCluster(pillar, cluster);
  const story = geoStoryData[cluster];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [cluster]);

  if (!data || !story) {
    return <Navigate to={`/solutions/${pillar}`} replace />;
  }

  const siblings = getClustersForPillar(pillar).filter((c) => c.slug !== cluster).slice(0, 3);
  const [h1Regular, h1Italic] = splitHeadline(data.h1);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.subLabel,
    serviceType: data.pillarName,
    provider: { '@type': 'Organization', name: 'MyAibo', url: 'https://myaibo.in' },
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
  const faqLd = data.faq && data.faq.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  } : null;

  return (
    <>
      <SEO title={data.meta.title} description={data.meta.description} path={`/solutions/${pillar}/${cluster}`} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
        {faqLd && <script type="application/ld+json">{JSON.stringify(faqLd)}</script>}
      </Helmet>

      <main>
        {/* ─── HERO ─── */}
        <section
          className="relative hero-dotgrid"
          style={{
            padding: '150px 40px 90px',
            overflow: 'hidden',
          }}
        >
          <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1180 }}>
            <div>
              <nav aria-label="Breadcrumb" className="mb-5" style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
                <span className="mx-2">/</span>
                <Link to={`/solutions/${pillar}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{data.pillarName}</Link>
                <span className="mx-2">/</span>
                <span style={{ color: 'var(--purple-dark)' }}>{data.subLabel}</span>
              </nav>

              <div
                className="inline-flex items-center gap-2 mb-6"
                style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}
              >
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
                <span style={{ color: 'var(--purple-dark)', fontSize: 12, fontWeight: 600 }}>{data.eyebrow}</span>
              </div>

              <h1
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(32px, 4.4vw, 52px)',
                  letterSpacing: '-1.5px',
                  lineHeight: 1.12,
                  color: 'var(--text-primary)',
                  margin: '0 0 22px',
                }}
              >
                <span style={{ fontWeight: 600 }}>{h1Regular}</span>{' '}
                {h1Italic && <span style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--purple-dark)' }}>{h1Italic}</span>}
              </h1>

              <p style={{ fontSize: 16.5, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 32px', maxWidth: 560 }}>
                {data.heroBody}
              </p>

              <div className="flex flex-wrap gap-3">
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-purple inline-flex items-center gap-2" style={{ padding: '14px 26px', fontSize: 15, fontWeight: 500 }}>
                  {data.primaryCta}
                </a>
                <a
                  href="#deep-dive"
                  className="inline-flex items-center gap-2"
                  style={{ padding: '13px 22px', fontSize: 15, fontWeight: 500, color: 'var(--text-primary)', border: '1px solid var(--border-clr)', borderRadius: 8, textDecoration: 'none', background: 'var(--white)' }}
                >
                  See how it works <ArrowDown size={15} />
                </a>
              </div>
            </div>

            <HeroMockup slug={cluster} mockup={story.heroMockup} />
          </div>
        </section>

        {/* ─── WORD TICKER ─── */}
        <section style={{ background: 'var(--white)', padding: '48px 40px', borderBottom: '1px solid var(--border-clr)' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <WordTicker label={story.ticker.label} words={story.ticker.words} />
          </div>
        </section>

        {/* ─── STAT GRID ─── */}
        <section style={{ background: 'var(--off-white)', padding: '84px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="mx-auto text-center mb-14" style={{ maxWidth: 720 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                Why It Matters
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                {data.deepDive.question}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
              {story.stats.map((s) => (
                <div
                  key={s.num}
                  className="card-lift"
                  style={{ background: ACCENT_BG[s.accent], border: '1px solid var(--border-clr)', borderRadius: 14, padding: '24px 22px' }}
                >
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 10 }}>
                    {s.num} · {s.label}
                  </div>
                  <p style={{ fontSize: 13, lineHeight: 1.55, color: 'var(--text-secondary)', margin: '0 0 16px', minHeight: 55 }}>{s.body}</p>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 38, fontWeight: 600, color: ACCENT_STAT_COLOR[s.accent] }}>
                    {s.stat}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── LIVE DEMO ─── */}
        <section style={{ background: 'var(--white)', padding: '0 40px 84px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div
              style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 20, padding: 'clamp(28px, 4vw, 48px)' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                    Quick Summary for AI Engines
                  </div>
                  <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(24px, 3vw, 34px)', letterSpacing: '-0.8px', color: 'var(--text-primary)', margin: '0 0 16px', lineHeight: 1.25 }}>
                    What we actually do.
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0 }}>
                    {data.aeoBox}
                  </p>
                </div>
                <div>
                  <div className="flex gap-2 mb-4">
                    {['ChatGPT', 'Claude', 'Perplexity'].map((m, i) => (
                      <span
                        key={m}
                        style={{
                          fontSize: 13,
                          fontWeight: 500,
                          padding: '7px 14px',
                          borderRadius: 20,
                          background: i === 0 ? 'var(--dark)' : 'var(--white)',
                          color: i === 0 ? '#fff' : 'var(--text-secondary)',
                          border: '1px solid var(--border-clr)',
                        }}
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 12, padding: 20 }}>
                    <div
                      className="inline-flex items-center gap-2 mb-3"
                      style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--purple-dark)', background: 'var(--purple-light)', borderRadius: 5, padding: '3px 8px' }}
                    >
                      ● {cluster === 'wikipedia' ? 'CHATGPT · ANSWER' : 'PERPLEXITY · ANSWER'}
                    </div>
                    <p style={{ fontSize: 13.5, lineHeight: 1.7, color: 'var(--text-primary)', margin: 0 }}>
                      {story.signal.rightItems[0].text}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── DEEP-DIVE CAPABILITIES ─── */}
        <section id="deep-dive" style={{ background: 'var(--off-white)', padding: '84px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="mx-auto text-center mb-14" style={{ maxWidth: 720 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                What We Do
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 16px', lineHeight: 1.2 }}>
                {data.deepDive.pillars.length}-part capability stack, <em style={{ color: 'var(--purple-dark)' }}>run end-to-end.</em>
              </h2>
              <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
                {data.deepDive.framing}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {data.deepDive.pillars.map((p, i) => (
                <div
                  key={p.title}
                  className="card-lift"
                  style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 14, padding: '26px 24px', display: 'flex', flexDirection: 'column' }}
                >
                  <div
                    className="flex items-center justify-center mb-4"
                    style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--purple-light)', color: 'var(--purple-dark)', fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600 }}
                  >
                    0{i + 1}
                  </div>
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.3 }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: 13.5, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 14px' }}>{p.technical}</p>
                  <p style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--purple-dark)', lineHeight: 1.6, margin: 'auto 0 0', paddingTop: 14, borderTop: '1px solid var(--border-clr)' }}>
                    {p.human}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── SIGNAL → AI CONSENSUS ─── */}
        <section style={{ background: 'var(--white)', padding: '84px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="mx-auto text-center mb-14" style={{ maxWidth: 720 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                How It Works
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                {story.signal.sectionHeadline}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-16">
              <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>
                  {story.signal.leftLabel}
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 20px' }}>
                  {story.signal.leftTitle}
                </h3>
                {story.signal.leftItems.map((it) => (
                  <div key={it.quote} style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--purple-dark)', marginBottom: 4 }}>{it.meta}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{it.quote}</div>
                  </div>
                ))}
              </div>

              <div style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.25)', borderRadius: 16, padding: 28 }}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple-dark)', marginBottom: 10 }}>
                  {story.signal.rightLabel}
                </div>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 20px' }}>
                  {story.signal.rightTitle}
                </h3>
                {story.signal.rightItems.map((it) => (
                  <div key={it.source} style={{ background: 'var(--white)', border: '1px solid rgba(124,59,237,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--purple-dark)', marginBottom: 4 }}>● {it.source}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.55 }}>{it.text}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-center mb-16">
              <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px, 2.8vw, 32px)', color: 'var(--text-primary)', margin: '0 0 12px' }}>
                {story.compoundLine}
              </p>
              <p style={{ fontSize: 14.5, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto' }}>{story.compoundBody}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  ● BEFORE
                </div>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 15, color: 'var(--text-secondary)', margin: '0 0 14px' }}>
                  {story.beforeAfter.question}
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--text-muted)', margin: 0 }}>
                  LLM: &ldquo;{story.beforeAfter.before}&rdquo;
                </p>
              </div>
              <div style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.25)', borderRadius: 14, padding: 24, textAlign: 'center' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--purple-dark)', marginBottom: 14 }}>
                  ● AFTER
                </div>
                <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 15, color: 'var(--text-primary)', margin: '0 0 14px' }}>
                  {story.beforeAfter.question}
                </p>
                <p style={{ fontSize: 13.5, color: 'var(--text-primary)', margin: 0 }}>
                  LLM: &ldquo;{story.beforeAfter.after}&rdquo;
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ─── PLAN / BLUEPRINT ─── */}
        <section style={{ background: 'var(--off-white)', padding: '84px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="mx-auto text-center mb-14" style={{ maxWidth: 720 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                Your Plan
              </div>
              <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                {data.blueprint.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {data.blueprint.phases.map((phase, i) => {
                const isDark = i === data.blueprint.phases.length - 1;
                const isAccent = i === 1;
                return (
                  <div
                    key={phase.num}
                    style={{
                      background: isDark ? 'var(--dark)' : isAccent ? 'var(--purple-light)' : 'var(--white)',
                      border: isDark ? 'none' : '1px solid var(--border-clr)',
                      borderRadius: 14,
                      padding: '24px 22px',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="flex items-center justify-center"
                        style={{ width: 32, height: 32, borderRadius: '50%', background: isDark ? 'var(--purple)' : 'var(--purple-dark)', color: '#fff', fontFamily: "'Fraunces', serif", fontSize: 13, fontWeight: 600, flexShrink: 0 }}
                      >
                        {phase.num}
                      </div>
                      <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: isDark ? 'rgba(255,255,255,0.6)' : 'var(--purple-dark)' }}>
                        {phase.timeframe}
                      </div>
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: isDark ? '#fff' : 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.3 }}>
                      {phase.name}
                    </h3>
                    <p style={{ fontSize: 13, fontWeight: 300, color: isDark ? 'rgba(255,255,255,0.7)' : 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
                      {phase.body}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── SIBLINGS ─── */}
        {siblings.length > 0 && (
          <section style={{ background: 'var(--white)', padding: '64px 40px', borderTop: '1px solid var(--border-clr)' }}>
            <div className="mx-auto" style={{ maxWidth: 1100 }}>
              <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
                <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                  Continue exploring {data.pillarName}
                </h2>
                <Link to={`/solutions/${pillar}`} style={{ fontSize: 13, fontWeight: 500, color: 'var(--purple-dark)', textDecoration: 'none' }}>
                  See all &rarr;
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {siblings.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/solutions/${s.pillar}/${s.slug}`}
                    className="card-lift"
                    style={{ display: 'block', background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 12, padding: '22px 22px', textDecoration: 'none' }}
                  >
                    <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 8 }}>
                      GEO
                    </div>
                    <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px', lineHeight: 1.35 }}>
                      {s.subLabel}
                    </h3>
                    <span className="inline-flex items-center gap-1" style={{ fontSize: 13, fontWeight: 500, color: 'var(--purple-dark)' }}>
                      Read more <ArrowRight size={13} />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ─── FAQ ─── */}
        {data.faq && data.faq.length > 0 && (
          <section style={{ background: 'var(--off-white)', padding: '84px 40px' }}>
            <div className="mx-auto" style={{ maxWidth: 800 }}>
              <div className="text-center mb-12">
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
                  FAQ
                </div>
                <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
                  Everything You Need to Know
                </h2>
              </div>
              <FaqAccordion items={data.faq} />
            </div>
          </section>
        )}

        {/* ─── FINAL CTA ─── */}
        <section className="relative" style={{ background: 'var(--dark)', padding: '84px 40px', overflow: 'hidden' }}>
          <div
            className="absolute pointer-events-none"
            style={{ width: 560, height: 560, top: -140, left: -160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,59,237,0.18) 0%, transparent 68%)' }}
          />
          <div className="relative z-10 mx-auto text-center" style={{ maxWidth: 720 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 16 }}>
              Get Started
            </div>
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 'clamp(26px, 3.4vw, 38px)', letterSpacing: '-0.6px', color: '#fff', margin: '0 0 28px', lineHeight: 1.2 }}>
              {data.geography.finalCta}
            </h2>
            <div className="flex justify-center flex-wrap gap-3">
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-purple inline-flex items-center gap-2" style={{ padding: '14px 28px', fontSize: 15, fontWeight: 500 }}>
                {UNIVERSAL_CTA}
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
