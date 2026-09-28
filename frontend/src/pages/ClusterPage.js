import { useEffect } from 'react';
import { useParams, Link, Navigate, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { BOOKING_URL } from '@/lib/constants';
import { getCluster, pillarMeta } from '@/data/clusterPagesData';
import { geoData } from '@/data/geoData';
import { aeoData } from '@/data/aeoData';
import { seoData } from '@/data/seoData';
import { contentMarketingData } from '@/data/contentMarketingData';
import { aiAutomationsData } from '@/data/aiAutomationsData';
import { fullStackData } from '@/data/fullStackData';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/sections/SectionLabel';
import PostIt from '@/components/sections/PostIt';
import FaqTwoColumn from '@/components/sections/FaqTwoColumn';
import TickerCta from '@/components/sections/TickerCta';
import { splitHeadline } from '@/lib/splitHeadline';

const pillarDataMap = {
  geo: geoData, aeo: aeoData, seo: seoData,
  'content-marketing': contentMarketingData, 'ai-automations': aiAutomationsData, 'full-stack': fullStackData,
};
const pillarShortMap = {
  geo: 'GEO', aeo: 'AEO', seo: 'SEO', 'content-marketing': 'Content Marketing',
  'ai-automations': 'AI Automation', 'full-stack': 'Full Stack',
};

function bigStat(text) {
  if (!text) return '';
  const N = '\\$?\\d[\\d.,]*[MKB]?';
  const re = new RegExp('([<~≈+−]?' + N + '(?:\\s?[–-]\\s?' + N + ')?\\s?(?:%\\+?|×|\\+)?)((?:\\s|-)(?:days|weeks|months|month|minute))?');
  const m = text.match(re);
  return m ? (m[1].trim() + (m[2] || '')) : '';
}

function firstSentence(t, max) {
  t = t || '';
  const m = t.match(/^(.+?[.!?])(\s|$)/);
  let s = m ? m[1] : t;
  if (s.length > max) s = s.slice(0, max).replace(/\s\S*$/, '') + '…';
  return s;
}

// Per-cluster "Ready to…" headline shown in the final CTA section.
const FINAL_CTA_HEADLINES = {
  'geo/llmo-company': 'Ready to Be the Answer AI Gives — Not the Footnote?',
  'geo/perplexity-gemini-chatgpt-optimization': 'Ready to Get Cited Before Your Competitor Does?',
  'geo/zero-click-search-synthetic-traffic': 'Ready to Win the Searches Nobody Clicks Through On?',
  'geo/quora-content-seeding': 'Ready to Own the Quora Threads Your Buyers Are Already Reading?',
  'geo/wikipedia': 'Ready to Close the Wikipedia Gap Before Someone Else Fills It?',
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

export default function ClusterPage() {
  const { pillar, cluster } = useParams();
  const navigate = useNavigate();
  const data = getCluster(pillar, cluster);
  const pillarInfo = pillarMeta[pillar];

  useEffect(() => { window.scrollTo(0, 0); }, [pillar, cluster]);

  if (!pillarInfo) return <Navigate to="/" replace />;
  if (!data) {
    return (
      <div style={{ padding: '160px 40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 300, color: 'var(--text-primary)' }}>Page not found</h1>
        <Link to={`/solutions/${pillar}`} className="btn-purple inline-flex mt-6" style={{ padding: '12px 24px', fontSize: 14, marginTop: 24 }}>Back to {pillarInfo.name}</Link>
      </div>
    );
  }

  const pillarShort = pillarShortMap[pillar] || pillarInfo.short;
  const h1 = splitHeadline(data.h1);
  const finalHeadline = FINAL_CTA_HEADLINES[`${pillar}/${cluster}`] || `Ready to talk ${data.subLabel}?`;
  const cta = splitHeadline(finalHeadline);

  const raw = data.statBadge || '';
  const big = bigStat(raw);
  const noMetric = !raw;
  const problemLead = data.deepDive.question;
  const problemRest = data.deepDive.framing;

  const related = (data.relatedServices?.links || []).map((l) => {
    const isPillar = !l.cluster;
    const targetSub = isPillar ? pillarDataMap[l.pillar]?.subheadline : getCluster(l.pillar, l.cluster)?.heroBody;
    return {
      key: `${l.pillar}-${l.cluster || 'pillar'}`,
      kind: isPillar ? 'PILLAR' : 'SERVICE',
      label: l.label,
      note: firstSentence(targetSub, 130),
      go: () => navigate(l.cluster ? `/solutions/${l.pillar}/${l.cluster}` : `/solutions/${l.pillar}`),
    };
  });

  const structuredData = {
    '@context': 'https://schema.org', '@type': 'Service', name: data.subLabel, serviceType: data.pillarName,
    provider: { '@type': 'Organization', name: 'MyAibo', url: 'https://myaibo.in' },
    description: data.meta.description, areaServed: 'Global',
  };
  const breadcrumbLd = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://myaibo.in/' },
      { '@type': 'ListItem', position: 2, name: 'Solutions', item: 'https://myaibo.in/solutions' },
      { '@type': 'ListItem', position: 3, name: data.pillarName, item: `https://myaibo.in/solutions/${pillar}` },
      { '@type': 'ListItem', position: 4, name: data.subLabel, item: `https://myaibo.in/solutions/${pillar}/${cluster}` },
    ],
  };
  const faqLd = data.faq && data.faq.length > 0 ? {
    '@context': 'https://schema.org', '@type': 'FAQPage',
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
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 104px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link to={`/solutions/${pillar}`} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>{pillarShort}</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>{data.subLabel}</span>
            </nav>

            <div className="grid items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 64 }}>
              <div className="flex flex-col" style={{ gridColumn: 'span 2', minWidth: 0 }}>
                <div className="self-start inline-flex items-center gap-2" style={{ maxWidth: '100%', marginBottom: 24, lineHeight: 1.35, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
                  <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>{pillarShort} &middot; {data.subLabel}</span>
                </div>
                <h1 style={{ margin: '0 0 24px', fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(34px,4vw,54px)', lineHeight: 1.12, letterSpacing: '-1.5px' }}>
                  {h1.a}<em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--purple-dark)' }}>{h1.b}</em>
                </h1>
                <p style={{ margin: '0 0 34px', maxWidth: 640, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{data.heroBody}</p>
                <div className="flex flex-wrap" style={{ gap: 14 }}>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center" style={{ maxWidth: '100%', padding: '14px 26px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, lineHeight: 1.35, textDecoration: 'none' }}>
                    {data.primaryCta}
                  </a>
                  <Link to={`/solutions/${pillar}`} className="inline-flex items-center" style={{ whiteSpace: 'nowrap', padding: '16px 28px', borderRadius: 8, background: '#fff', border: '1px solid var(--border-clr)', color: 'var(--text-primary)', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
                    All {pillarShort} services &rarr;
                  </Link>
                </div>
              </div>

              <div className="relative justify-self-center" style={{ width: '100%', maxWidth: 330 }}>
                <PostIt rotate={2.5} tapeRotate={-3} big={!noMetric && big ? big : undefined}>
                  {noMetric ? (
                    <>
                      <div style={{ font: "700 30px/1 'Caveat',cursive", color: 'var(--acc-ink)', marginBottom: 10 }}>what's inside:</div>
                      {data.deepDive.pillars.slice(0, 3).map((w) => (
                        <div key={w.title} className="flex" style={{ gap: 8, padding: '6px 0', font: "600 22px/1.1 'Caveat',cursive", color: 'var(--text-primary)' }}>
                          <span>&#10003;</span><span>{w.title}</span>
                        </div>
                      ))}
                    </>
                  ) : (
                    raw.replace(/\.$/, '')
                  )}
                </PostIt>
              </div>
            </div>
          </div>
        </section>

        {/* ── THE PROBLEM (dark) ── */}
        <section style={{ padding: '104px 32px', background: 'var(--dark)', color: '#fff' }}>
          <div className="mx-auto grid" style={{ maxWidth: 1180, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 48 }}>
            <div>
              <SectionLabel text="The problem" dark amber />
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 40, lineHeight: 1.05, fontStyle: 'italic', color: 'var(--acc)' }}>Why it breaks.</div>
            </div>
            <div className="flex flex-col" style={{ gridColumn: 'span 2', gap: 20, maxWidth: 820 }}>
              <p style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(24px,2.5vw,32px)', lineHeight: 1.35, letterSpacing: '-0.3px' }}>{problemLead}</p>
              <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,.7)' }}>{problemRest}</p>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO ── */}
        <section style={{ padding: '104px 32px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 36 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="What we do" />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                The work, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>in detail.</em>
              </h2>
            </div>
            <div className="flex flex-col" style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, overflow: 'hidden' }}>
              {data.deepDive.pillars.map((w, i) => (
                <div key={w.title} className="flex flex-wrap" style={{ gap: '18px 36px', padding: 30, borderBottom: i < data.deepDive.pillars.length - 1 ? '1px solid var(--border-clr)' : 'none' }}>
                  <div style={{ flex: '0 0 44px', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple)' }}>{String(i + 1).padStart(2, '0')}</div>
                  <div style={{ flex: '1 1 260px', fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, lineHeight: 1.2 }}>{w.title}</div>
                  <div className="flex flex-col" style={{ flex: '1.5 1 340px', gap: 12 }}>
                    <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{w.technical}</p>
                    {w.human && (
                      <div className="flex" style={{ gap: 10, padding: '12px 14px', borderRadius: 10, background: 'var(--acc-soft)', fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 14, lineHeight: 1.5, color: 'var(--acc-ink)' }}>
                        <span>&rarr;</span><span>{w.human}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── OUR FRAMEWORK ── */}
        <section style={{ padding: '104px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 48 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="Our framework" />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                Four phases, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>week by week.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 230px), 1fr))', gap: 22 }}>
              {data.blueprint.phases.map((f, i) => {
                const isLast = i === data.blueprint.phases.length - 1;
                return (
                <div key={f.name} className="flex flex-col" style={{ gap: 14 }}>
                  <div className="flex items-center" style={{ gap: 10 }}>
                    <span className="flex-shrink-0" style={{ width: 14, height: 14, borderRadius: '50%', border: '3px solid var(--purple)', background: '#fff', boxShadow: '0 0 0 4px var(--purple-light)' }} />
                    <span className="flex-1" style={{ height: 1, background: 'var(--border-clr)' }} />
                  </div>
                  <div className="flex flex-wrap items-center" style={{ gap: '8px 10px' }}>
                    <span className="flex-shrink-0" style={{ whiteSpace: 'nowrap', fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.08em', color: 'var(--text-muted)' }}>PHASE {String(f.num).padStart(2, '0')}</span>
                    <span className="flex-shrink-0" style={{ whiteSpace: 'nowrap', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, padding: '4px 10px', borderRadius: 999, background: isLast ? 'var(--dark)' : 'var(--acc)', color: isLast ? '#fff' : 'var(--dark)' }}>{f.timeframe}</span>
                  </div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, lineHeight: 1.22 }}>{f.name}</div>
                  <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14.5, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{f.body}</p>
                </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── RELATED SERVICES ── */}
        {related.length > 0 && (
          <section style={{ padding: '104px 32px' }}>
            <div className="relative mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 36 }}>
              <div style={{ maxWidth: 720 }}>
                <SectionLabel text="Related services" />
                <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                  Works best <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>together.</em>
                </h2>
              </div>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 290px), 1fr))', gap: 16 }}>
                {related.map((r) => (
                  <button
                    key={r.key}
                    onClick={r.go}
                    className="text-left flex flex-col card-lift"
                    style={{ cursor: 'pointer', background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 24, gap: 12, color: 'var(--text-primary)', minHeight: 200 }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10.5, letterSpacing: '0.1em', padding: '4px 8px', borderRadius: 5, background: 'var(--purple-light)', color: 'var(--purple-dark)' }}>{r.kind}</span>
                      <span style={{ color: 'var(--purple)' }}>&#8599;</span>
                    </div>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 600, lineHeight: 1.2 }}>{r.label}</div>
                    <div style={{ marginTop: 'auto', fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 14, lineHeight: 1.55, color: 'var(--text-secondary)' }}>{r.note}</div>
                  </button>
                ))}
              </div>
              <div className="hidden md:block" style={{ position: 'absolute', right: 20, top: -76, zIndex: 5 }}>
                <PostIt rotate={4} tapeRotate={-3} width={190}>modular: start here, plug in the rest &#8595;</PostIt>
              </div>
            </div>
          </section>
        )}

        <FaqTwoColumn key={`${pillar}-${cluster}`} items={data.faq} intro="The questions buyers ask us most about this service." />
        <TickerCta ctaA={cta.a} ctaB={cta.b} page={`/solutions/${pillar}/${cluster}`} />
      </main>
    </>
  );
}
