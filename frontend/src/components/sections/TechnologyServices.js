const technologyServices = [
  {
    number: '01',
    title: 'AI Automation',
    tagline: 'Turn your biggest workflows into your biggest advantage.',
    description: 'Production-grade agentic systems, multi-step LLM workflows, RAG pipelines, intelligent automation: Built to run at enterprise scale from day one.',
  },
  {
    number: '02',
    title: 'White Label Solutions',
    tagline: 'Launch a proprietary product without building from scratch.',
    description: 'Fully branded, API-first platforms in 4–8 weeks. Multi-tenant architecture, NDA-secured IP ownership, custom feature roadmaps.',
  },
  {
    number: '03',
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
        background: 'var(--dark)',
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
              color: 'var(--purple)',
              marginBottom: 16,
            }}
          >
            Technical Services
          </div>

          <h2
            data-testid="technology-headline"
            className="headline-dark"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              color: '#fff',
              margin: '0 0 20px',
            }}
          >
            From AI pilots to production systems, engineered to scale.
          </h2>

          <p
            data-testid="technology-description"
            style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.65,
              color: 'rgba(255,255,255,0.85)',
              maxWidth: 780,
              margin: '0 auto 12px',
            }}
          >
            Most AI projects never reach production and most dev partners vanish after handover
          </p>

          <p
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.95)',
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
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 12,
            padding: '32px 24px',
          }}
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 'clamp(24px, 3vw, 32px)',
                  fontWeight: 600,
                  color: 'var(--purple)',
                  marginBottom: 6,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.7)',
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
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.1)',
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
                    color: '#fff',
                    margin: '0 0 6px',
                  }}
                >
                  {service.title}
                </h3>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--purple)',
                    margin: '0 0 12px',
                  }}
                >
                  {service.tagline}
                </div>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: 'rgba(255,255,255,0.75)',
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
            background: 'linear-gradient(135deg, rgba(124,59,237,0.15) 0%, rgba(124,59,237,0.05) 100%)',
            border: '1px solid var(--purple)',
            borderRadius: 12,
            padding: '28px 32px',
            textAlign: 'center',
          }}
        >
          <p
            style={{
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.9)',
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
