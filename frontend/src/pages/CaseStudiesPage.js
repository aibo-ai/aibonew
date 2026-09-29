import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/sections/SectionLabel';
import TickerCta from '@/components/sections/TickerCta';
import { BACKEND_URL } from '@/lib/constants';

const FALLBACK_DESCRIPTION =
  'Real client outcomes across marketing and technology — GEO, AEO, SEO, content, automation, and full-stack development. See the full results.';

// Built from whatever is actually published, so this can't drift out of
// sync with the page's real content the way a hand-written description can
// once case studies are added or removed.
function buildDescription(caseStudies) {
  const highlights = caseStudies
    .flatMap((cs) => Object.entries(cs.metrics || {}))
    .filter(([key, val]) => /%|x$/i.test(String(val)) && key !== 'timeframe')
    .map(([key, val]) => `${val} ${key.replace(/_/g, ' ')}`)
    .slice(0, 3);

  if (highlights.length === 0) return FALLBACK_DESCRIPTION;
  return `Real client outcomes across marketing and technology — ${highlights.join(', ')}. See the full results.`;
}

const metricLabel = (key) => key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

// Headline metrics first; the timeframe reads better as a caption.
function splitMetrics(metrics = {}) {
  const entries = Object.entries(metrics).filter(([, v]) => v !== null && v !== '');
  return {
    stats: entries.filter(([k]) => k !== 'timeframe'),
    timeframe: metrics.timeframe,
  };
}

function CaseStudyCard({ study }) {
  const { stats, timeframe } = splitMetrics(study.metrics);
  return (
    <Link
      to={`/case-study/${study.id}`}
      className="grid card-lift"
      style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 20, overflow: 'hidden', textDecoration: 'none', color: 'var(--text-primary)' }}
    >
      <div className="flex flex-col" style={{ padding: 'clamp(28px, 4vw, 40px)', gap: 16 }}>
        <div className="flex flex-wrap items-center" style={{ gap: 8 }}>
          {study.industry && (
            <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: 'var(--acc)', color: 'var(--dark)' }}>{study.industry}</span>
          )}
          {study.service && (
            <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: 5, background: 'var(--purple-light)', color: 'var(--purple-dark)' }}>{study.service}</span>
          )}
        </div>
        <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 'clamp(24px, 2.6vw, 32px)', fontWeight: 600, lineHeight: 1.18, letterSpacing: '-0.6px' }}>{study.title}</h3>
        {study.client && (
          <div className="flex items-center" style={{ gap: 8, fontFamily: "'DM Sans'", fontSize: 14, color: 'var(--text-secondary)' }}>
            <Building2 size={15} /> {study.client}
          </div>
        )}
        {study.excerpt && <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 15.5, lineHeight: 1.65, color: 'var(--text-secondary)' }}>{study.excerpt}</p>}
        <span className="inline-flex items-center" style={{ marginTop: 'auto', paddingTop: 8, gap: 6, fontFamily: "'DM Sans'", fontSize: 14.5, fontWeight: 600, color: 'var(--purple-dark)' }}>
          Read the case study <ArrowRight size={16} />
        </span>
      </div>

      <div className="flex flex-col" style={{ background: 'var(--dark)', color: '#fff', padding: 'clamp(28px, 4vw, 40px)', gap: 20, justifyContent: 'center' }}>
        <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', color: 'var(--acc)' }}>KEY RESULTS</div>
        {stats.length > 0 ? (
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px 20px' }}>
            {stats.map(([k, v], i) => (
              <div key={k}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(38px, 4vw, 52px)', fontWeight: 600, lineHeight: 1, color: i % 2 === 0 ? 'var(--acc)' : '#C9B2FA' }}>{v}</div>
                <div style={{ marginTop: 8, fontFamily: "'DM Sans'", fontSize: 14, color: 'rgba(255,255,255,.72)' }}>{metricLabel(k)}</div>
              </div>
            ))}
          </div>
        ) : (
          study.result && <p style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 20, lineHeight: 1.45 }}>{study.result}</p>
        )}
        {timeframe && (
          <div style={{ fontFamily: "'DM Sans'", fontSize: 13, color: 'rgba(255,255,255,.55)' }}>Measured over {timeframe}</div>
        )}
      </div>
    </Link>
  );
}

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCaseStudies = useCallback(async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/admin/public/case-studies`);
      const data = await response.json();
      setCaseStudies(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('[CaseStudiesPage] Failed to fetch case studies:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCaseStudies();
  }, [fetchCaseStudies]);

  return (
    <>
      <SEO
        title="Client Case Studies & Results | MyAibo"
        description={buildDescription(caseStudies)}
        path="/case-studies"
      />
      <main>
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 88px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span><span>Resources</span><span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>Case Studies</span>
            </nav>
            <div className="flex flex-col" style={{ maxWidth: 860 }}>
              <div className="self-start inline-flex items-center gap-2" style={{ marginBottom: 24, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
                <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
                <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>Proof, Not Promises</span>
              </div>
              <h1 style={{ margin: '0 0 24px', fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-2px' }}>
                Case studies.{' '}
                <span style={{ background: 'var(--acc)', color: 'var(--dark)', padding: '0 12px 4px', borderRadius: 10, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Measurable outcomes.</span>
              </h1>
              <p style={{ margin: 0, maxWidth: 600, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                Real challenges. Real results.
              </p>
            </div>
          </div>
        </section>

        {/* ── CASE STUDIES ── */}
        <section style={{ padding: '96px 32px 112px', background: 'var(--off-white)', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 36 }}>
            <div>
              <SectionLabel text="Client work" amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(30px,3.6vw,44px)', lineHeight: 1.1, letterSpacing: '-1.3px' }}>
                Results we can <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>show you.</em>
              </h2>
            </div>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>Loading case studies&hellip;</div>
            ) : caseStudies.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>No case studies available yet</div>
            ) : (
              <div className="flex flex-col" style={{ gap: 20 }}>
                {caseStudies.map((study) => <CaseStudyCard key={study.id} study={study} />)}
              </div>
            )}
          </div>
        </section>

        <TickerCta page="/case-studies" />
      </main>
    </>
  );
}
