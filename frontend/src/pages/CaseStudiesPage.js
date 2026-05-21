import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Building2, TrendingUp, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

import { BACKEND_URL } from '@/lib/constants';

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
        description="Real outcomes across marketing and technology — +156% conversions, 8x faster inventory, and sales capacity tripled. See the full results."
      />
      <main style={{ paddingTop: 64 }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--dark)',
          padding: '100px 40px 60px',
        }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
          <h1
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              letterSpacing: '-1.5px',
              color: '#fff',
              margin: '0 0 16px',
              lineHeight: 1.15,
            }}
          >
            Case Studies
          </h1>
          <p
            style={{
              fontSize: 18,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.85)',
              margin: 0,
              maxWidth: 600,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Real challenges. Measurable outcomes.
          </p>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section
        style={{
          background: 'var(--off-white)',
          padding: '80px 40px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              Loading case studies...
            </div>
          ) : caseStudies.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
              No case studies available yet
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study) => (
                <article
                  key={study.id}
                  style={{
                    background: 'var(--white)',
                    borderRadius: 12,
                    border: '1px solid var(--border-clr)',
                    overflow: 'hidden',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {study.featured_image && (
                    <img
                      src={study.featured_image}
                      alt={study.title}
                      style={{ width: '100%', height: 200, objectFit: 'cover' }}
                    />
                  )}
                  <div style={{ padding: 24 }}>
                    {/* Industry Badge */}
                    {study.industry && (
                      <div className="mb-3">
                        <span
                          style={{
                            padding: '4px 10px',
                            fontSize: 11,
                            fontWeight: 600,
                            background: 'var(--purple-light)',
                            color: 'var(--purple-dark)',
                            borderRadius: 6,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {study.industry}
                        </span>
                      </div>
                    )}

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "'Fraunces', serif",
                        fontSize: 22,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        margin: '0 0 8px',
                        lineHeight: 1.3,
                      }}
                    >
                      {study.title}
                    </h3>

                    {/* Client Name */}
                    {study.client && (
                      <div
                        className="flex items-center gap-2 mb-3"
                        style={{
                          fontSize: 13,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <Building2 size={14} />
                        {study.client}
                      </div>
                    )}

                    {/* Excerpt */}
                    <p
                      style={{
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                        margin: '0 0 16px',
                        lineHeight: 1.6,
                      }}
                    >
                      {study.excerpt}
                    </p>

                    {/* Result Preview */}
                    {study.result && (
                      <div
                        style={{
                          padding: 12,
                          background: 'var(--off-white)',
                          borderRadius: 8,
                          marginBottom: 16,
                        }}
                      >
                        <div
                          className="flex items-center gap-2 mb-2"
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em',
                            color: 'var(--purple-dark)',
                          }}
                        >
                          <TrendingUp size={14} />
                          Key Result
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: 'var(--text-primary)',
                          }}
                        >
                          {study.result}
                        </div>
                      </div>
                    )}

                    {/* Read More Link */}
                    <Link
                      to={`/case-study/${study.id}`}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--purple-dark)',
                        textDecoration: 'none',
                      }}
                    >
                      View Case Study
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
    </>
  );
}
