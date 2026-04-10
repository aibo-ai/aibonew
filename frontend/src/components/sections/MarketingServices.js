const marketingServices = [
  {
    number: '01',
    title: 'GEO',
    tagline: 'Generative Engine Optimisation',
    description: 'Be the brand AI recommends. We structure your digital presence so ChatGPT, Perplexity, Google SGE and Bing Copilot cite, quote and recommend you. Entity optimisation, schema markup, E-E-A-T signals, third-party platform seeding.',
  },
  {
    number: '02',
    title: 'AEO',
    tagline: 'Answer Engine Optimisation',
    description: '68% of queries expect a direct answer with no click. We structure your content to win featured snippets, People Also Ask boxes, and voice answers — capturing position zero before your competition.',
  },
  {
    number: '03',
    title: 'SEO',
    tagline: 'Search Engine Optimisation',
    description: 'The organic foundation everything builds on. Technical authority, keyword architecture, backlink equity: The infrastructure that AI engines are trained on and Google rewards long-term.',
  },
  {
    number: '04',
    title: 'Content Marketing',
    tagline: 'Content that ranks, converts, and compounds.',
    description: 'Long-form articles, thought leadership, case studies, FAQs, and video scripts: Built equally for humans and AI engines. Every GEO citation, AEO answer and SEO ranking is powered by content.',
  },
];

export default function MarketingServices() {
  return (
    <section
      id="marketing-services"
      data-testid="marketing-services-section"
      style={{
        background: 'var(--white)',
        padding: '80px 40px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Section Header */}
        <div className="text-center mb-12">
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
            Marketing Services
          </div>

          <h2
            data-testid="marketing-headline"
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            Be the answer on every surface, in every engine.
          </h2>

          <p
            data-testid="marketing-description"
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: 780,
              margin: '0 auto 12px',
            }}
          >
            Search has changed: 62% of users now trust AI answers over page-1 links.
          </p>

          <p
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--text-primary)',
              maxWidth: 780,
              margin: '0 auto',
            }}
          >
            We're built for where search is going — and where it already is.
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-6 mb-12">
          {marketingServices.map((service) => (
            <div
              key={service.number}
              data-testid={`marketing-service-${service.title.toLowerCase()}`}
              style={{
                background: 'var(--off-white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                padding: '32px',
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gap: 24,
                alignItems: 'start',
              }}
            >
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 20,
                  fontWeight: 600,
                  color: 'var(--purple)',
                  minWidth: 40,
                }}
              >
                {service.number}
              </div>
              <div>
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 24,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0 0 6px',
                  }}
                >
                  {service.title}
                </h3>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--purple-dark)',
                    margin: '0 0 12px',
                  }}
                >
                  {service.tagline}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--purple-light) 0%, rgba(237,229,252,0.5) 100%)',
            border: '1px solid var(--purple)',
            borderRadius: 12,
            padding: '28px 32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            <strong>GEO + AEO + SEO + Content</strong> run as one integrated system.
            <br />
            Clients running all four see <strong>3–5× the return</strong> of single-service engagements.
          </p>
        </div>
      </div>
    </section>
  );
}
