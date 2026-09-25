const technologyServices = [
  {
    number: '01',
    title: 'AI Automation',
    tagline: 'Turn your biggest workflows into your biggest advantage.',
    description: 'Production-grade agentic systems, multi-step LLM workflows, RAG pipelines, intelligent automation: Built to run at enterprise scale from day one.',
  },
  {
    number: '02',
    title: 'Full Stack Development',
    tagline: 'Complete products, built to last.',
    description: 'From pixel perfect frontends to high-throughput backend engines. You own 100% of the IP.',
  },
];

const stats = [
  { value: '4–8 weeks', label: 'to production-ready MVP' },
  { value: '80%', label: 'process automation rate' },
  { value: '10×', label: 'operational velocity' },
  { value: '5×', label: 'efficiency gains' },
  { value: '100%', label: 'IP ownership to client' },
];

export default function TechnologyServices() {
  return (
    <section
      id="technology-services"
      data-testid="technology-services-section"
      style={{
        background: 'var(--off-white)',
        padding: '100px 40px',
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
              color: '#92400E',
              marginBottom: 16,
            }}
          >
            Technical Services
          </div>

          <h2
            data-testid="technology-headline"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: '0 0 20px',
            }}
          >
            From AI pilots to production systems,{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: '#92400E' }}>engineered to scale.</em>
          </h2>

          <p
            data-testid="technology-description"
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: 780,
              margin: '0 auto 12px',
            }}
          >
            Most AI projects never reach production and most dev partners vanish after handover.
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
            We build production-grade systems and stay accountable to outcomes not billable hours.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12"
          style={{
            background: 'var(--amber-light)',
            border: '1px solid rgba(245,158,11,0.3)',
            borderRadius: 16,
            padding: '32px 24px',
          }}
        >
          {stats.map((stat) => (
            <div key={`stat-${stat.value}-${stat.label}`} className="text-center">
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 600,
                  color: '#92400E',
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Services Grid */}
        <div className="space-y-6 mb-12">
          {technologyServices.map((service) => (
            <div
              key={service.number}
              data-testid={`technology-service-${service.title.toLowerCase().replace(/\s+/g, '-')}`}
              className="card-lift"
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 16,
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
                  color: '#92400E',
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
                    color: '#92400E',
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
            background: 'linear-gradient(135deg, var(--amber-light) 0%, rgba(254,243,199,0.4) 100%)',
            border: '1px solid var(--amber)',
            borderRadius: 16,
            padding: '28px 32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Our modular architecture approach makes it easy to <strong>start with one and expand into others</strong>.
          </p>
        </div>
      </div>
    </section>
  );
}
