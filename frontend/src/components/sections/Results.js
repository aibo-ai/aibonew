import { TrendingUp, Target, DollarSign, Repeat } from "lucide-react";

const marketingResults = [
  {
    icon: TrendingUp,
    value: '+180%',
    label: 'AI citation rate',
    sublabel: 'GEO, 6 months',
  },
  {
    icon: Target,
    value: '156%',
    label: 'website conversion rate increase',
    sublabel: '',
  },
  {
    icon: DollarSign,
    value: '−63%',
    label: 'reduction in customer acquisition cost',
    sublabel: '',
  },
  {
    icon: Repeat,
    value: '92%',
    label: 'growth in repeat purchase rate',
    sublabel: '',
  },
];

const technicalResults = [
  {
    value: '80%',
    label: 'data workflows automated',
  },
  {
    value: '5×',
    label: 'efficiency gains from automation',
  },
  {
    value: '4–8 weeks',
    label: 'to production-ready MVP',
  },
  {
    value: '100%',
    label: 'IP ownership transferred to client',
  },
];

export default function Results() {
  return (
    <section
      id="results"
      data-testid="results-section"
      style={{
        background: 'var(--white)',
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
            Proven Results
          </div>

          <h2
            data-testid="results-headline"
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
            Results that speak for themselves.
          </h2>
        </div>

        {/* Marketing Results */}
        <div className="mb-12">
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 24px',
              textAlign: 'center',
            }}
          >
            Marketing Results
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {marketingResults.map((result, idx) => (
              <div
                key={idx}
                data-testid={`marketing-result-${idx + 1}`}
                style={{
                  background: 'var(--off-white)',
                  border: '1px solid var(--border-clr)',
                  borderRadius: 12,
                  padding: '28px 24px',
                  textAlign: 'center',
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto mb-4"
                  style={{
                    width: 48,
                    height: 48,
                    background: 'var(--purple-light)',
                    borderRadius: 12,
                  }}
                >
                  <result.icon size={24} style={{ color: 'var(--purple-dark)' }} />
                </div>

                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 'clamp(28px, 3.5vw, 36px)',
                    fontWeight: 600,
                    color: 'var(--purple-dark)',
                    margin: '0 0 8px',
                    lineHeight: 1,
                  }}
                >
                  {result.value}
                </div>

                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    margin: '0 0 4px',
                    lineHeight: 1.4,
                  }}
                >
                  {result.label}
                </div>

                {result.sublabel && (
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    {result.sublabel}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Technical Results */}
        <div>
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 22,
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: '0 0 24px',
              textAlign: 'center',
            }}
          >
            Technical Results
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {technicalResults.map((result, idx) => (
              <div
                key={idx}
                data-testid={`technical-result-${idx + 1}`}
                style={{
                  background: 'var(--off-white)',
                  border: '1px solid var(--border-clr)',
                  borderRadius: 12,
                  padding: '28px 20px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 'clamp(24px, 3vw, 32px)',
                    fontWeight: 600,
                    color: 'var(--purple-dark)',
                    margin: '0 0 8px',
                    lineHeight: 1,
                  }}
                >
                  {result.value}
                </div>

                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    margin: 0,
                    lineHeight: 1.4,
                  }}
                >
                  {result.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
