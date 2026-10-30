import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, ArrowLeft, CheckCircle2 } from 'lucide-react';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/sections/SectionLabel';
import TickerCta from '@/components/sections/TickerCta';
import { BACKEND_URL } from '@/lib/constants';
import { getStaticCaseStudy } from '@/data/caseStudiesData';

const SITE_URL = 'https://www.myaibo.in';

export default function CaseStudyPage() {
  const { id } = useParams();
  const staticStudy = getStaticCaseStudy(id);
  return staticStudy ? <StaticCaseStudy study={staticStudy} /> : <CmsCaseStudy id={id} />;
}

// Case studies bundled with the site (src/data/caseStudiesData.js). They carry
// more structure than CMS entries, so they get their own layout, with each
// section still matching the CMS page's look.
function StaticCaseStudy({ study }) {
  const path = `/case-study/${study.id}`;
  const heading = `${study.client} - ${study.title}`;
  const structuredData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: heading,
      description: study.description,
      url: `${SITE_URL}${path}`,
      image: `${SITE_URL}/og-default.png`,
      datePublished: study.datePublished,
      author: { '@type': 'Organization', name: 'MyAibo', url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'MyAibo',
        url: SITE_URL,
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/myaibo-logo.png` },
      },
      about: [study.industry, study.service],
      articleSection: 'Case Studies',
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}${path}` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
        { '@type': 'ListItem', position: 3, name: study.client, item: `${SITE_URL}${path}` },
      ],
    },
  ];
  const pill = (text, amber) => (
    <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: amber ? 'var(--acc)' : 'var(--purple-light)', color: amber ? 'var(--dark)' : 'var(--purple-dark)' }}>{text}</span>
  );
  const h2 = (plain, em) => (
    <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(30px,3.6vw,44px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
      {plain}<em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>{em}</em>
    </h2>
  );
  const prose = { margin: 0, maxWidth: 780, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: 'var(--text-primary)' };

  return (
    <>
      <SEO title={`${heading} | MyAibo Case Study`} description={study.description} path={path} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <main>
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 88px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link to="/case-studies" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Case Studies</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>{study.client}</span>
            </nav>
            <div className="flex flex-col" style={{ maxWidth: 940, gap: 22 }}>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {pill(study.industry, true)}
                {pill(study.service, false)}
              </div>
              <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(34px,4.6vw,58px)', lineHeight: 1.1, letterSpacing: '-1.8px' }}>
                {study.client} -{' '}
                <span style={{ display: 'block', color: 'var(--purple-dark)', fontStyle: 'italic' }}>{study.title}</span>
              </h1>
              <p style={{ margin: 0, maxWidth: 720, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{study.excerpt}</p>
              <div className="flex flex-wrap" style={{ gap: '12px 40px', paddingTop: 22, borderTop: '1px solid var(--border-clr)', fontFamily: "'DM Sans'", fontSize: 14 }}>
                {[['Industry', study.industry], ['Service', study.service], ['Client', 'Confidential']].map(([k, v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>{k}</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── RESULTS ── */}
        <section style={{ padding: '88px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 32 }}>
            <div>
              <SectionLabel text="Results" amber />
              {h2('The numbers, ', study.statsHeading)}
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 1, background: 'var(--border-clr)', border: '1px solid var(--border-clr)', borderRadius: 16, overflow: 'hidden' }}>
              {study.stats.map((s, i) => {
                const amber = i % 2 === 1;
                return (
                  <div key={s.label} style={{ background: amber ? 'var(--acc)' : '#fff', padding: '30px 26px', minWidth: 0 }}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: s.num.length > 10 ? 'clamp(26px,2.8vw,34px)' : 'clamp(40px,4.4vw,56px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-1px', color: amber ? 'var(--dark)' : 'var(--purple-dark)', overflowWrap: 'break-word' }}>{s.num}</div>
                    <div style={{ marginTop: 10, fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 15, color: 'var(--dark)' }}>{s.label}</div>
                    <div style={{ marginTop: 4, fontFamily: "'DM Sans'", fontSize: 14, lineHeight: 1.5, color: amber ? 'var(--dark)' : 'var(--text-secondary)' }}>{s.cap}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── CHALLENGE (dark) ── */}
        <section style={{ padding: '96px 32px', background: 'var(--dark)', color: '#fff' }}>
          <div className="mx-auto flex flex-wrap" style={{ maxWidth: 1180, gap: 48 }}>
            <div style={{ flex: '1 1 260px' }}>
              <SectionLabel text="The challenge" dark amber />
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 40, lineHeight: 1.05, fontStyle: 'italic', color: 'var(--acc)' }}>Where it stood.</div>
            </div>
            <div className="flex flex-col" style={{ flex: '3 1 480px', minWidth: 0, gap: 22, maxWidth: 820 }}>
              {study.challenge.map((para) => (
                <p key={para.slice(0, 40)} style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(19px,2vw,24px)', lineHeight: 1.5 }}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── SOLUTION ── */}
        <section style={{ padding: '96px 32px', background: '#fff' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 32 }}>
            <div>
              <SectionLabel text="What we did" />
              {h2('The ', 'solution')}
            </div>
            <p style={{ ...prose, fontSize: 19 }}>{study.solutionLead}</p>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 20 }}>
              {study.steps.map((step, i) => (
                <div key={step.title} className="flex flex-col" style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 20, padding: 'clamp(24px,3vw,32px)', gap: 10 }}>
                  <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 28, color: 'var(--purple-dark)' }}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 21, lineHeight: 1.25 }}>{step.title}</h3>
                  <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--text-secondary)' }}>{step.body}</p>
                </div>
              ))}
            </div>
            {study.stack && (
              <div className="flex flex-col" style={{ gap: 14 }}>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple-dark)' }}>Tech stack</div>
                <ul className="flex flex-wrap" style={{ gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
                  {study.stack.map((t) => (
                    <li key={t} style={{ padding: '8px 16px', borderRadius: 999, background: 'var(--purple-light)', color: 'var(--purple-dark)', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14 }}>{t}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {/* ── RESULT ── */}
        <section style={{ padding: '96px 32px 104px', background: 'var(--off-white)', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 32 }}>
            <div>
              <SectionLabel text="Outcome" amber />
              {h2('The ', 'result')}
            </div>
            {study.funnel && (
              <div role="list" aria-label={study.funnel.label} className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 160px), 1fr))', gap: 1, background: 'var(--border-clr)', border: '1px solid var(--border-clr)', borderRadius: 16, overflow: 'hidden' }}>
                {study.funnel.items.map((f, i) => {
                  const last = i === study.funnel.items.length - 1;
                  return (
                    <div role="listitem" key={f.label} style={{ background: last ? 'var(--dark)' : '#fff', color: last ? '#fff' : 'var(--dark)', padding: '24px 22px' }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 40, lineHeight: 1, color: last ? 'var(--acc)' : 'var(--purple-dark)' }}>{f.num}</div>
                      <div style={{ marginTop: 8, fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 500 }}>{f.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex flex-col" style={{ gap: 18 }}>
              {study.result.map((para) => <p key={para.slice(0, 40)} style={prose}>{para}</p>)}
            </div>
            <ul className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '14px 32px', listStyle: 'none', margin: 0, padding: 0, maxWidth: 980 }}>
              {study.checks.map((c) => (
                <li key={c} className="flex" style={{ gap: 12, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 16, lineHeight: 1.55 }}>
                  <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: 3, color: 'var(--purple)' }} /> {c}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap" style={{ gap: '10px 32px', background: 'var(--dark)', color: '#fff', borderRadius: 20, padding: 'clamp(28px,4vw,40px)' }}>
              <div style={{ flex: '0 0 160px', fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--acc)', paddingTop: 6 }}>Key insight</div>
              <p style={{ flex: '1 1 320px', minWidth: 0, margin: 0, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(19px,2.2vw,23px)', lineHeight: 1.5 }}>{study.insight}</p>
            </div>
            <Link to="/case-studies" className="self-start inline-flex items-center" style={{ gap: 6, fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: 'var(--purple-dark)', textDecoration: 'none' }}>
              <ArrowLeft size={15} /> All case studies
            </Link>
          </div>
        </section>

        <TickerCta page={path} />
      </main>
    </>
  );
}

function CmsCaseStudy({ id }) {
  const [study, setStudy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // There is no public single-item endpoint (only /admin/public/case-studies
  // requires admin auth for the id-scoped route), so we fetch the published
  // list and find this one — the same data CaseStudiesPage already fetches.
  const fetchCaseStudy = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/public/case-studies`);
      if (!response.ok) throw new Error('Failed to load case studies');
      const data = await response.json();
      const list = Array.isArray(data) ? data : [];
      const match = list.find((cs) => String(cs.id) === id);
      if (!match) throw new Error('Case study not found');
      setStudy(match);
    } catch (err) {
      console.error('[CaseStudyPage] Failed to fetch case study:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCaseStudy();
  }, [fetchCaseStudy]);

  if (loading) {
    return (
      <main className="hero-dotgrid" style={{ minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', padding: '140px 20px', fontFamily: "'DM Sans'", color: 'var(--text-muted)' }}>Loading&hellip;</div>
      </main>
    );
  }

  if (error || !study) {
    return (
      <main className="hero-dotgrid">
        <div className="mx-auto flex flex-col items-center" style={{ maxWidth: 640, padding: '120px 32px 140px', textAlign: 'center', gap: 18 }}>
          <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', borderRadius: 5, background: 'var(--acc)', color: 'var(--dark)' }}>404</span>
          <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(34px,4vw,48px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
            Case study <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>not found.</em>
          </h1>
          <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 17, color: 'var(--text-secondary)' }}>It may have moved or been unpublished.</p>
          <Link to="/case-studies" className="inline-flex items-center" style={{ marginTop: 8, gap: 8, padding: '14px 24px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            <ArrowLeft size={16} /> Back to case studies
          </Link>
        </div>
      </main>
    );
  }

  const metrics = study.metrics && typeof study.metrics === 'object' ? Object.entries(study.metrics) : [];

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.excerpt || '',
    image: study.featured_image || 'https://www.myaibo.in/og-default.png',
    datePublished: study.created_at,
    dateModified: study.updated_at || study.created_at,
    author: { '@type': 'Organization', name: 'MyAibo' },
    publisher: {
      '@type': 'Organization',
      name: 'MyAibo',
      logo: { '@type': 'ImageObject', url: 'https://www.myaibo.in/myaibo-logo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.myaibo.in/case-study/${id}` },
  };

  const headline = metrics.filter(([k]) => k !== 'timeframe');
  const timeframe = study.metrics && study.metrics.timeframe;
  const pill = (text, amber) => (
    <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: amber ? 'var(--acc)' : 'var(--purple-light)', color: amber ? 'var(--dark)' : 'var(--purple-dark)' }}>{text}</span>
  );

  return (
    <>
      <SEO
        title={`${study.title} | MyAibo Case Study`}
        description={study.excerpt || ''}
        path={`/case-study/${id}`}
        image={study.featured_image}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <main>
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 88px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex flex-wrap" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <Link to="/case-studies" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Case Studies</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>{study.client || study.title}</span>
            </nav>
            <div className="flex flex-col" style={{ maxWidth: 900, gap: 22 }}>
              <div className="flex flex-wrap" style={{ gap: 8 }}>
                {study.industry && pill(study.industry, true)}
                {study.service && pill(study.service, false)}
              </div>
              <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(34px,4.6vw,58px)', lineHeight: 1.1, letterSpacing: '-1.8px' }}>{study.title}</h1>
              {study.excerpt && <p style={{ margin: 0, maxWidth: 720, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 19, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{study.excerpt}</p>}
              {study.client && (
                <div className="flex items-center" style={{ gap: 8, fontFamily: "'DM Sans'", fontSize: 14, color: 'var(--text-muted)' }}>
                  <Building2 size={15} /> <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{study.client}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {study.featured_image && (
          <div style={{ padding: '0 32px', background: 'linear-gradient(var(--off-white) 50%, #fff 50%)' }}>
            <img src={study.featured_image} alt={study.title} className="mx-auto" style={{ display: 'block', width: '100%', maxWidth: 1180, maxHeight: 520, aspectRatio: '1.875 / 1', objectFit: 'cover', borderRadius: 20, boxShadow: '0 30px 60px -20px rgba(15,10,30,.25)' }} />
          </div>
        )}

        {/* ── KEY RESULTS ── */}
        {headline.length > 0 && (
          <section style={{ padding: '88px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
            <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 32 }}>
              <div>
                <SectionLabel text="Key results" amber />
                <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(30px,3.6vw,44px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
                  The numbers{timeframe ? <>, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>in {timeframe}.</em></> : <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}> that moved.</em>}
                </h2>
              </div>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: 1, background: 'var(--border-clr)', border: '1px solid var(--border-clr)', borderRadius: 16, overflow: 'hidden' }}>
                {headline.map(([key, value], i) => {
                  const amber = i % 2 === 1;
                  return (
                    <div key={key} style={{ background: amber ? 'var(--acc)' : '#fff', padding: '30px 26px', minWidth: 0 }}>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: String(value).length > 10 ? 'clamp(24px,2.6vw,32px)' : 'clamp(40px,4.4vw,56px)', fontWeight: 600, lineHeight: 1.05, letterSpacing: '-1px', color: amber ? 'var(--dark)' : 'var(--purple-dark)', overflowWrap: 'break-word' }}>{String(value)}</div>
                      <div style={{ marginTop: 10, fontFamily: "'DM Sans'", fontSize: 14.5, color: amber ? 'var(--dark)' : 'var(--text-secondary)', textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* ── CHALLENGE (dark) ── */}
        {study.challenge && (
          <section style={{ padding: '96px 32px', background: 'var(--dark)', color: '#fff' }}>
            <div className="mx-auto grid" style={{ maxWidth: 1180, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: 48 }}>
              <div>
                <SectionLabel text="The challenge" dark amber />
                <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 40, lineHeight: 1.05, fontStyle: 'italic', color: 'var(--acc)' }}>Where it stood.</div>
              </div>
              <p style={{ gridColumn: 'span 2', margin: 0, maxWidth: 820, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(21px,2.2vw,28px)', lineHeight: 1.45, whiteSpace: 'pre-line' }}>{study.challenge}</p>
            </div>
          </section>
        )}

        {/* ── SOLUTION + RESULT ── */}
        {(study.solution || study.result || study.content) && (
          <section style={{ padding: '96px 32px 104px' }}>
            <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 40 }}>
              <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 20 }}>
                {study.solution && (
                  <div className="flex flex-col" style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 20, padding: 'clamp(26px,3.5vw,38px)', gap: 16 }}>
                    <SectionLabel text="The solution" />
                    <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 17, lineHeight: 1.75, color: 'var(--text-primary)', whiteSpace: 'pre-line' }}>{study.solution}</p>
                  </div>
                )}
                {study.result && (
                  <div className="flex flex-col" style={{ background: 'var(--acc)', border: '1px solid var(--acc)', borderRadius: 20, padding: 'clamp(26px,3.5vw,38px)', gap: 16 }}>
                    <SectionLabel text="The result" amber />
                    <p style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 400, fontSize: 20, lineHeight: 1.55, color: 'var(--dark)', whiteSpace: 'pre-line' }}>{study.result}</p>
                  </div>
                )}
              </div>
              {study.content && (
                <article className="prose mx-auto" style={{ maxWidth: 760, fontSize: 17.5, lineHeight: 1.8, color: 'var(--text-primary)' }} dangerouslySetInnerHTML={{ __html: study.content }} />
              )}
              <Link to="/case-studies" className="self-start inline-flex items-center" style={{ gap: 6, fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600, color: 'var(--purple-dark)', textDecoration: 'none' }}>
                <ArrowLeft size={15} /> All case studies
              </Link>
            </div>
          </section>
        )}

        <TickerCta page={`/case-study/${id}`} />
      </main>
    </>
  );
}
