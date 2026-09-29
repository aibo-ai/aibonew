import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/sections/SectionLabel';
import TickerCta from '@/components/sections/TickerCta';
import { BACKEND_URL } from '@/lib/constants';

export default function CaseStudyPage() {
  const { id } = useParams();
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
