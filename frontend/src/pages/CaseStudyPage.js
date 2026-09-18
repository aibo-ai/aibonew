import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Building2, TrendingUp, ArrowLeft } from 'lucide-react';
import SEO from '@/components/SEO';
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
      <main style={{ paddingTop: 64 }}>
        <div style={{ textAlign: 'center', padding: '120px 20px', color: 'var(--text-muted)' }}>
          Loading...
        </div>
      </main>
    );
  }

  if (error || !study) {
    return (
      <main style={{ paddingTop: 64 }}>
        <div style={{ textAlign: 'center', padding: '120px 20px' }}>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, color: 'var(--text-primary)', marginBottom: 16 }}>
            Case study not found
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>
            {error || 'This case study could not be loaded.'}
          </p>
          <Link
            to="/case-studies"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--purple-dark)', textDecoration: 'none', fontWeight: 500 }}
          >
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

  return (
    <>
      <SEO
        title={`${study.title} | MyAibo Case Study`}
        description={study.excerpt || ''}
        path={`/case-study/${id}`}
        image={study.featured_image}
      />
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      <main style={{ paddingTop: 64 }}>
        <section style={{ background: 'var(--dark)', padding: '80px 40px 60px' }}>
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            {study.service && (
              <div style={{ marginBottom: 16 }}>
                <span style={{
                  padding: '4px 12px',
                  fontSize: 11,
                  fontWeight: 600,
                  background: 'rgba(124,59,237,0.25)',
                  color: '#c4a7f7',
                  borderRadius: 6,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}>
                  {study.service}
                </span>
              </div>
            )}
            <h1 style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 4vw, 48px)',
              letterSpacing: '-1px',
              color: '#fff',
              margin: '0 0 20px',
              lineHeight: 1.2,
            }}>
              {study.title}
            </h1>
            {study.excerpt && (
              <p style={{ fontSize: 18, fontWeight: 300, color: 'rgba(255,255,255,0.75)', margin: '0 0 28px', lineHeight: 1.6 }}>
                {study.excerpt}
              </p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center', color: 'rgba(255,255,255,0.55)', fontSize: 13 }}>
              {study.client && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Building2 size={14} />
                  <span>{study.client}</span>
                </div>
              )}
              {study.industry && <span>{study.industry}</span>}
            </div>
          </div>
        </section>

        {study.featured_image && (
          <div style={{ background: 'var(--dark-surface)' }}>
            <div className="mx-auto" style={{ maxWidth: 900 }}>
              <img
                src={study.featured_image}
                alt={study.title}
                loading="lazy"
                style={{ width: '100%', maxHeight: 480, aspectRatio: '1.875 / 1', objectFit: 'cover', display: 'block' }}
              />
            </div>
          </div>
        )}

        <section style={{ background: 'var(--off-white)', padding: '72px 40px 60px' }}>
          <div className="mx-auto" style={{ maxWidth: 800 }}>
            <Link
              to="/case-studies"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--purple-dark)',
                textDecoration: 'none',
                marginBottom: 48,
              }}
            >
              <ArrowLeft size={15} /> All case studies
            </Link>

            {metrics.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4" style={{ marginBottom: 48 }}>
                {metrics.map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      background: 'var(--white)',
                      border: '1px solid var(--border-clr)',
                      borderRadius: 12,
                      padding: '20px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: 'var(--purple-dark)', marginBottom: 6 }}>
                      {String(value)}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                      {key.replace(/_/g, ' ')}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {[
              ['The Challenge', study.challenge],
              ['The Solution', study.solution],
              ['The Result', study.result],
            ].map(([heading, body]) => body && (
              <div key={heading} style={{ marginBottom: 36 }}>
                <h2
                  className="inline-flex items-center gap-2"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 12px' }}
                >
                  {heading === 'The Result' && <TrendingUp size={18} />}
                  {heading}
                </h2>
                <p style={{ fontSize: 16.5, lineHeight: 1.8, color: 'var(--text-primary)', margin: 0, whiteSpace: 'pre-line' }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
