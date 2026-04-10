const testimonials = [
  {
    quote: "MyAibo's platform transformed our customer acquisition from a cost center into a profit engine. 52% conversion increase in three months? That's not just growth, that's exponential success.",
    author: 'Bala S',
    role: 'CEO, vPersonalize',
    company: 'Enterprise SaaS',
    initials: 'BS',
  },
  {
    quote: "After trying countless solutions, MyAibo finally cracked the code. Their approach doesn't just target customers, they finds the exact people who will love our brand and buy repeatedly.",
    author: 'Nishant Gupta',
    role: 'Iluvia Premium Haircare',
    company: '',
    initials: 'NG',
  },
  {
    quote: "MyAibo allowed us to communicate our unique value proposition with clarity while personalising customer experiences at scale. Higher conversions, lower acquisition costs, genuine brand understanding.",
    author: 'Jigeesha',
    role: 'Founder, Trudiance',
    company: 'Beauty & Skincare',
    initials: 'JG',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
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
            Client Testimonials
          </div>

          <h2
            data-testid="testimonials-headline"
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
            What our clients say.
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              data-testid={`testimonial-${idx + 1}`}
              style={{
                background: 'var(--off-white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {/* Quote */}
              <p
                style={{
                  fontSize: 15,
                  fontWeight: 300,
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: 'var(--text-primary)',
                  margin: '0 0 24px',
                  flex: 1,
                }}
              >
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 48,
                    height: 48,
                    background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 100%)',
                    borderRadius: '50%',
                    fontSize: 16,
                    fontWeight: 600,
                    color: '#fff',
                    fontFamily: "'Fraunces', serif",
                    flexShrink: 0,
                  }}
                >
                  {testimonial.initials}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: '0 0 2px',
                    }}
                  >
                    {testimonial.author}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    {testimonial.role}
                  </div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 400,
                      color: 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
