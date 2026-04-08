export default function Positioning() {
  return (
    <section
      id="positioning"
      data-testid="positioning-section"
      style={{
        background: 'var(--off-white)',
        padding: '80px 40px',
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
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
          Our Practice
        </div>

        <h2
          data-testid="positioning-headline"
          className="headline-light"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(32px, 4vw, 52px)',
            letterSpacing: '-1.5px',
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            margin: '0 0 20px',
          }}
        >
          We're not an instrument. We're your growth partner.
        </h2>

        <p
          data-testid="positioning-description"
          style={{
            fontSize: 'clamp(16px, 2vw, 19px)',
            fontWeight: 300,
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            maxWidth: 680,
            margin: '0 auto 60px',
          }}
        >
          One agency. Two deep practice areas. Built to work around your specific growth challenge.
        </p>

        {/* Two Practice Areas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Marketing */}
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border-clr)',
              borderRadius: 16,
              padding: '40px 32px',
              textAlign: 'left',
            }}
          >
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 28,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: '0 0 12px',
              }}
            >
              Marketing that compounds.
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: '0 0 24px',
              }}
            >
              We build the organic infrastructure that makes brands findable on any search engine, LLM platform and in the minds of the right audience.
            </p>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: '0 0 24px',
              }}
            >
              From GEO and AEO to SEO and content marketing, every service compounds into a lasting authority.
            </p>
            <div className="flex flex-wrap gap-2">
              {['GEO', 'AEO', 'SEO', 'CONTENT MARKETING'].map((service) => (
                <span
                  key={service}
                  style={{
                    padding: '6px 14px',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: 'var(--purple-light)',
                    color: 'var(--purple-dark)',
                    borderRadius: 6,
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Technology */}
          <div
            style={{
              background: 'var(--white)',
              border: '1px solid var(--border-clr)',
              borderRadius: 16,
              padding: '40px 32px',
              textAlign: 'left',
            }}
          >
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 28,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: '0 0 12px',
              }}
            >
              Technology that scales.
            </h3>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: '0 0 24px',
              }}
            >
              We build AI systems, platforms and products that remove operational ceilings.
            </p>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.7,
                color: 'var(--text-secondary)',
                margin: '0 0 24px',
              }}
            >
              Agentic AI workforces, white-label platforms and full-stack products that are engineered for enterprise, delivered at boutique speed.
            </p>
            <div className="flex flex-wrap gap-2">
              {['AI AUTOMATION', 'WHITE LABEL', 'FULL STACK DEV'].map((service) => (
                <span
                  key={service}
                  style={{
                    padding: '6px 14px',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    background: 'var(--purple-light)',
                    color: 'var(--purple-dark)',
                    borderRadius: 6,
                  }}
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
