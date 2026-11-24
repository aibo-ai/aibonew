import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { PrintPage, Crumb, SecHead, Statement, CtaSection } from '@/components/print';
import {
  metricLabel,
  splitMetrics,
  paragraphs,
  proseAndBullets,
  toStep,
  beforeAfter,
} from '@/components/print/company/caseStudy';
import { BACKEND_URL } from '@/lib/constants';
import '@/components/print/company/cases.css';
import '@/components/print/company/shared.css';

function ArrowLeft() {
  return <svg className="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M13 8H3M7 4L3 8l4 4" /></svg>;
}

// "What we did": leading untitled paragraphs introduce the work, the rest are
// numbered steps (a short first line without a full stop becomes the step title).
function splitSolution(text) {
  const all = paragraphs(text).map(toStep);
  let i = 0;
  while (i < all.length && !all[i].title) i += 1;
  let intro = all.slice(0, i).map((s) => s.body);
  let steps = all.slice(i);
  if (steps.length === 0 && intro.length > 2) {
    steps = intro.slice(1).map((body) => ({ title: '', body }));
    intro = intro.slice(0, 1);
  }
  return { intro, steps };
}

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
      <PrintPage className="pg-case">
        <section className="pr-state" role="status">
          <div className="wrap"><p className="lead">Loading&hellip;</p></div>
        </section>
      </PrintPage>
    );
  }

  if (error || !study) {
    return (
      <PrintPage className="pg-case">
        <section className="pr-state" aria-labelledby="h-nf">
          <div className="wrap">
            <p className="kicker">404</p>
            <h1 className="display" id="h-nf">Case study not found.</h1>
            <p className="lead">It may have moved or been unpublished.</p>
            <div className="actions">
              <Link className="btn btn-primary btn-lg" to="/case-studies">Back to case studies</Link>
            </div>
          </div>
        </section>
      </PrintPage>
    );
  }

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

  const { stats, timeframe } = splitMetrics(study.metrics);
  const discs = beforeAfter(stats);
  const challenge = paragraphs(study.challenge);
  const solution = splitSolution(study.solution);
  const outcome = proseAndBullets(study.result);
  const hasOutcome = outcome.prose.length > 0 || outcome.bullets.length > 0 || Boolean(study.content);
  const kicker = [study.industry, study.service].filter(Boolean).join(' · ');
  const page = `/case-study/${id}`;

  return (
    <>
      <SEO
        title={`${study.title} | MyAibo Case Study`}
        description={study.excerpt || ''}
        path={`/case-study/${id}`}
        image={study.featured_image}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <PrintPage className="pg-case">
        {/* Hero: the headline beside two printed discs (or the study's own image) */}
        <section className="hero-cd" aria-labelledby="h-hero">
          <div className="wrap">
            <Crumb items={[{ label: 'Home', to: '/' }, { label: 'Case studies', to: '/case-studies' }, { label: study.industry || study.client || study.title }]} />
            <div className="row">
              <div className="hero-copy">
                {kicker && <p className="kicker">{kicker}</p>}
                <h1 className="display" id="h-hero">{study.title}</h1>
                {study.excerpt && <p className="lead">{study.excerpt}</p>}
                <dl className="meta">
                  {study.industry && <div><dt>Industry</dt><dd>{study.industry}</dd></div>}
                  {study.service && <div><dt>Service</dt><dd>{study.service}</dd></div>}
                  <div><dt>Client</dt><dd>{study.client || 'Confidential'}</dd></div>
                </dl>
              </div>
              <figure className="discs">
                {study.featured_image ? (
                  <img className="photo" src={study.featured_image} alt={study.title} />
                ) : (
                  <>
                    <img
                      className="print"
                      src="/print/company/case-discs.webp"
                      width="1300"
                      height="760"
                      alt={discs ? `A small grey disc and a purple disc twice its size: ${discs.a} to ${discs.b}.` : 'A small grey disc and a purple disc twice its size.'}
                    />
                    {discs && (
                      <>
                        <span className="lab a" aria-hidden="true">{discs.a}</span>
                        <span className="lab b" aria-hidden="true">{discs.b}</span>
                      </>
                    )}
                  </>
                )}
              </figure>
            </div>
          </div>
        </section>

        {/* Results: the headline metrics */}
        {stats.length > 0 && (
          <section className="sec paper-white" id="results" aria-labelledby="h-results">
            <div className="wrap">
              <SecHead id="h-results" name="Results" lead="The numbers," pay={timeframe ? `in ${timeframe}.` : 'that moved.'} />
              <div className="results4">
                {stats.map(([k, v]) => (
                  <div className="stat" key={k}>
                    <p className="stat-n">{v}</p>
                    <p className="stat-c">{metricLabel(k)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* The challenge */}
        {challenge.length > 0 && (
          <section className="sec" id="challenge" aria-labelledby="h-ch">
            <div className="wrap">
              <div className="row">
                <h2 className="sec-name side" id="h-ch">The challenge</h2>
                <div className="main">
                  <h3 className="statement">Where it stood.</h3>
                  <div className="cs-prose">
                    {challenge.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* What we did */}
        {(solution.intro.length > 0 || solution.steps.length > 0) && (
          <section className="sec paper-white" id="did" aria-labelledby="h-did">
            <div className="wrap">
              <SecHead id="h-did" name="What we did" lead="The" pay="solution">
                {solution.intro.map((p, i) => <p className="intro" key={i}>{p}</p>)}
              </SecHead>
              {solution.steps.length > 0 && (
                <div className="steps">
                  {solution.steps.map((s, i) => (
                    <article className="step" key={i}>
                      <p className="n">{String(i + 1).padStart(2, '0')}</p>
                      {s.title && <h4>{s.title}</h4>}
                      <p>{s.body}</p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Outcome */}
        <section className="sec" id="outcome" aria-labelledby={hasOutcome ? 'h-outc' : undefined}>
          <div className="wrap">
            {hasOutcome && (
              <>
                <div className="row">
                  <h2 className="sec-name side" id="h-outc">Outcome</h2>
                  <div className="main"><Statement lead="The" pay="result" /></div>
                </div>
                {outcome.prose.length > 0 && (
                  <div className="cs-prose">
                    {outcome.prose.map((p, i) => <p key={i}>{p}</p>)}
                  </div>
                )}
                {outcome.bullets.length > 0 && (
                  <ul className="bul">
                    {outcome.bullets.map((b, i) => <li key={i}>{b}</li>)}
                  </ul>
                )}
                {study.content && (
                  <article className="prose cs-body" dangerouslySetInnerHTML={{ __html: study.content }} />
                )}
              </>
            )}
            <p className="back">
              <Link className="link" to="/case-studies"><ArrowLeft /> All case studies</Link>
            </p>
          </div>
        </section>

        <CtaSection page={page} />
      </PrintPage>
    </>
  );
}
