import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { PrintPage, Crumb, SecHead, CtaSection, ArrowRight } from '@/components/print';
import { metricLabel, splitMetrics, headlineOf } from '@/components/print/company/caseStudy';
import { BACKEND_URL } from '@/lib/constants';
import '@/components/print/company/cases.css';

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

function CaseStudyCard({ study }) {
  const { stats, timeframe } = splitMetrics(study.metrics);
  const to = `/case-study/${study.id}`;
  const headline = headlineOf(study);
  return (
    <article className="case">
      <div className="rule" aria-hidden="true"><i /><span /></div>
      <div className="tags">
        {study.industry && <b>{study.industry}</b>}
        {study.service && <span>{study.service}</span>}
      </div>
      <div className="body">
        <h3><Link to={to}>{headline}</Link></h3>
        {study.client && <p className="client">{study.client}</p>}
        {study.excerpt && <p className="d">{study.excerpt}</p>}
        <p className="more"><Link className="link" to={to} aria-label={`Read the case study: ${headline}`}>Read the case study <ArrowRight /></Link></p>
      </div>
      {(stats.length > 0 || study.result) && (
        <div className="keys">
          <h4>Key results</h4>
          {stats.length > 0 ? (
            <dl>
              {stats.map(([k, v]) => (
                <div key={k}><dt>{v}</dt><dd>{metricLabel(k)}</dd></div>
              ))}
            </dl>
          ) : (
            <p className="res">{study.result}</p>
          )}
          {timeframe && <p className="when">Measured over {timeframe}</p>}
        </div>
      )}
    </article>
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
      <PrintPage className="pg-cases">
        {/* Hero */}
        <section className="hero-cs" aria-labelledby="h-hero">
          <div className="wrap">
            <Crumb items={[{ label: 'Home', to: '/' }, { label: 'Resources' }, { label: 'Case Studies' }]} />
            <p className="kicker">Proof, Not Promises</p>
            <h1 className="display" id="h-hero">Case studies. Measurable outcomes.</h1>
            <p className="lead">Real challenges. Real results.</p>
          </div>
        </section>

        {/* Client work: an index of prints */}
        <section className="sec paper-white" id="work" aria-labelledby="h-work">
          <div className="wrap">
            <SecHead id="h-work" name="Client work" lead="Results we can" pay="show you." />
            {loading ? (
              <p className="empty" role="status">Loading case studies&hellip;</p>
            ) : caseStudies.length === 0 ? (
              <p className="empty">No case studies available yet</p>
            ) : (
              <div className="cases">
                {caseStudies.map((study) => <CaseStudyCard key={study.id} study={study} />)}
              </div>
            )}
          </div>
        </section>

        <CtaSection page="/case-studies" />
      </PrintPage>
    </>
  );
}
