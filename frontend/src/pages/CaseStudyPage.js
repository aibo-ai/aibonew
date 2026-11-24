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
import { getStaticCaseStudy } from '@/data/caseStudiesData';
import { BACKEND_URL } from '@/lib/constants';
import '@/components/print/company/cases.css';
import '@/components/print/company/shared.css';

const SITE_URL = 'https://www.myaibo.in';

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
  const staticStudy = getStaticCaseStudy(id);
  return staticStudy ? <StaticCaseStudy study={staticStudy} /> : <CmsCaseStudy id={id} />;
}

// Case studies bundled with the site (src/data/caseStudiesData.js). They render
// without a fetch, so they are fully prerendered.
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

  return (
    <>
      <SEO title={`${heading} | MyAibo Case Study`} description={study.description} path={path} />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <CaseStudyView
        path={path}
        crumb={study.client}
        title={study.title}
        excerpt={study.excerpt}
        industry={study.industry}
        service={study.service}
        client="Confidential"
        clientLine={study.client}
        stats={study.stats.map((s) => ({ num: s.num, label: s.label, cap: s.cap }))}
        statsPay={study.statsHeading}
        challenge={study.challenge}
        solutionIntro={study.solutionLead ? [study.solutionLead] : []}
        steps={study.steps}
        stack={study.stack}
        funnel={study.funnel}
        resultProse={study.result || []}
        bullets={study.checks || []}
        insight={study.insight}
      />
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
    image: study.featured_image || `${SITE_URL}/og-default.png`,
    datePublished: study.created_at,
    dateModified: study.updated_at || study.created_at,
    author: { '@type': 'Organization', name: 'MyAibo' },
    publisher: {
      '@type': 'Organization',
      name: 'MyAibo',
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/myaibo-logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/case-study/${id}` },
  };

  const { stats, timeframe } = splitMetrics(study.metrics);
  const solution = splitSolution(study.solution);
  const outcome = proseAndBullets(study.result);
  const path = `/case-study/${id}`;

  return (
    <>
      <SEO
        title={`${study.title} | MyAibo Case Study`}
        description={study.excerpt || ''}
        path={path}
        image={study.featured_image}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <CaseStudyView
        path={path}
        crumb={study.industry || study.client || study.title}
        title={study.title}
        excerpt={study.excerpt}
        industry={study.industry}
        service={study.service}
        client={study.client || 'Confidential'}
        image={study.featured_image}
        stats={stats.map(([k, v]) => ({ num: v, label: metricLabel(k) }))}
        statsPay={timeframe ? `in ${timeframe}.` : 'that moved.'}
        challenge={paragraphs(study.challenge)}
        solutionIntro={solution.intro}
        steps={solution.steps}
        resultProse={outcome.prose}
        bullets={outcome.bullets}
        content={study.content}
      />
    </>
  );
}

// The page itself ("Print room"), shared by bundled and CMS case studies.
function CaseStudyView({
  path, crumb, title, excerpt, industry, service, client, clientLine, image,
  stats = [], statsPay, challenge = [], solutionIntro = [], steps = [], stack,
  funnel, resultProse = [], bullets = [], content, insight,
}) {
  const discs = beforeAfter(stats.map((s) => ['', s.num]));
  const kicker = [industry, service].filter(Boolean).join(' · ');
  const hasOutcome = Boolean(funnel) || resultProse.length > 0 || bullets.length > 0 || Boolean(content) || Boolean(insight);

  return (
    <PrintPage className="pg-case">
      {/* Hero: the headline beside two printed discs (or the study's own image) */}
      <section className="hero-cd" aria-labelledby="h-hero">
        <div className="wrap">
          <Crumb items={[{ label: 'Home', to: '/' }, { label: 'Case studies', to: '/case-studies' }, { label: crumb }]} />
          <div className="row">
            <div className="hero-copy">
              {kicker && <p className="kicker">{kicker}</p>}
              <h1 className="display" id="h-hero">{title}</h1>
              {clientLine && <p className="client-line">{clientLine}</p>}
              {excerpt && <p className="lead">{excerpt}</p>}
              <dl className="meta">
                {industry && <div><dt>Industry</dt><dd>{industry}</dd></div>}
                {service && <div><dt>Service</dt><dd>{service}</dd></div>}
                <div><dt>Client</dt><dd>{client}</dd></div>
              </dl>
            </div>
            <figure className="discs">
              {image ? (
                <img className="photo" src={image} alt={title} />
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
            <SecHead id="h-results" name="Results" lead="The numbers," pay={statsPay} />
            <div className="results4">
              {stats.map((s) => (
                <div className="stat" key={s.label}>
                  <p className="stat-n">{s.num}</p>
                  <p className="stat-c">{s.label}</p>
                  {s.cap && <p className="stat-sub">{s.cap}</p>}
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
      {(solutionIntro.length > 0 || steps.length > 0) && (
        <section className="sec paper-white" id="did" aria-labelledby="h-did">
          <div className="wrap">
            <SecHead id="h-did" name="What we did" lead="The" pay="solution">
              {solutionIntro.map((p, i) => <p className="intro" key={i}>{p}</p>)}
            </SecHead>
            {steps.length > 0 && (
              <div className="steps">
                {steps.map((s, i) => (
                  <article className="step" key={i}>
                    <p className="n">{String(i + 1).padStart(2, '0')}</p>
                    {s.title && <h4>{s.title}</h4>}
                    <p>{s.body}</p>
                  </article>
                ))}
              </div>
            )}
            {stack && stack.length > 0 && (
              <div className="stack">
                <h4>Tech stack</h4>
                <ul>{stack.map((t) => <li key={t}>{t}</li>)}</ul>
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
              {funnel && (
                <div className="out4" role="list" aria-label={funnel.label}>
                  {funnel.items.map((f) => (
                    <div className="stat" role="listitem" key={f.label}>
                      <p className="stat-n">{f.num}</p>
                      <p className="stat-c">{f.label}</p>
                    </div>
                  ))}
                </div>
              )}
              {resultProse.length > 0 && (
                <div className="cs-prose">
                  {resultProse.map((p, i) => <p key={i}>{p}</p>)}
                </div>
              )}
              {bullets.length > 0 && (
                <ul className="bul">
                  {bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}
              {content && (
                <article className="prose cs-body" dangerouslySetInnerHTML={{ __html: content }} />
              )}
              {insight && (
                <div className="insight">
                  <h4>Key insight</h4>
                  <p>{insight}</p>
                </div>
              )}
            </>
          )}
          <p className="back">
            <Link className="link" to="/case-studies"><ArrowLeft /> All case studies</Link>
          </p>
        </div>
      </section>

      <CtaSection page={path} />
    </PrintPage>
  );
}
