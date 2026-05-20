const caseStudies = [
  {
    type: 'Marketing',
    services: 'GEO + SEO + Content',
    client: 'Beauty & Wellness Company',
    industry: 'Premium Haircare',
    results: ['156% AI citation uplift', '−51% CAC', '14% Organic traffic increase'],
  },
  {
    type: 'Marketing',
    services: 'Content + GEO',
    client: 'Biscuit Brand',
    industry: 'Consumer Packaged Foods',
    results: ['2.8x LLM share of voice in snacking category', '190% citation increase'],
  },
  {
    type: 'Marketing',
    services: 'GEO + AEO',
    client: 'Enterprise SaaS',
    industry: 'Fashion Tech',
    results: ['220% organic sessions increase from GEO clusters', '2x Brand queries improvement'],
  },
  {
    type: 'Technology',
    services: 'White Label',
    client: 'FinTech Platform',
    industry: 'Financial Technology',
    results: ['<10w launch to market', '−70% manual effort', '∞ reseller seats'],
  },
  {
    type: 'Technology',
    services: 'AI Automation',
    client: 'Fleet Provider',
    industry: 'Logistics',
    results: ['8 min lead response (was 4hr)', '3× sales capacity', '96% lead scoring accuracy'],
  },
  {
    type: 'Technology',
    services: 'Full Stack',
    client: 'Apparel Brand',
    industry: 'Retail, Ethnic Wear',
    results: ['8× inventory speed', '4 hrs design-to-publish (was 3 days)'],
  },
];

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      style={{
        background: 'var(--off-white)',
        padding: '80px 40px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--purple-dark)',
              marginBottom: 16,
            }}
          >
            Case Studies
          </div>

          <h2
            data-testid="case-studies-headline"
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Real challenges. Measurable outcomes.
          </h2>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((study, idx) => (
            <div
              key={`study-${study.client || idx}`}
              data-testid={`case-study-${idx + 1}`}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Type Badge */}
              <div className="flex gap-2 mb-4">
                <span
                  style={{
                    padding: '4px 10px',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: study.type === 'Marketing' ? 'var(--purple-light)' : 'var(--amber-light)',
                    color: study.type === 'Marketing' ? 'var(--purple-dark)' : '#92400E',
                    borderRadius: 6,
                  }}
                >
                  {study.type}
                </span>
              </div>

              {/* Services */}
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--purple-dark)',
                  margin: '0 0 12px',
                }}
              >
                {study.services}
              </div>

              {/* Client & Industry */}
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 6px',
                  lineHeight: 1.3,
                }}
              >
                {study.client}
              </h3>

              <div
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                  margin: '0 0 20px',
                }}
              >
                {study.industry}
              </div>

              {/* Results */}
              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: 20,
                  borderTop: '1px solid var(--border-clr)',
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--text-muted)',
                    marginBottom: 10,
                  }}
                >
                  Key Results
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, listStyleType: 'disc' }}>
                  {study.results.map((result) => (
                    <li
                      key={result}
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: 6,
                        lineHeight: 1.5,
                      }}
                    >
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
