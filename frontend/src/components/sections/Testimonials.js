import SectionLabel from "./SectionLabel";

const testimonials = [
  {
    quote: "MyAibo\u2019s platform transformed our customer acquisition from a cost center into a profit engine. 52% conversion increase in three months? That\u2019s not just growth \u2014 that\u2019s exponential success.",
    name: 'CEO, vPersonalize',
    role: 'Enterprise SaaS',
    initials: 'VP',
  },
  {
    quote: "After trying countless solutions, MyAibo finally cracked the code. Their approach doesn\u2019t just target customers \u2014 it finds the exact people who will love our brand and buy repeatedly.",
    name: 'CEO, Iluvia',
    role: 'Premium Haircare',
    initials: 'IL',
  },
  {
    quote: "MyAibo allowed us to communicate our unique value proposition with clarity while personalising customer experiences at scale. Higher conversions, lower acquisition costs, genuine brand understanding.",
    name: 'Founder, Trudiance',
    role: 'Beauty & Skincare',
    initials: 'TR',
  },
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      data-testid="testimonials-section"
      className="relative"
      style={{
        background: 'var(--dark)',
        padding: '80px 40px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 560,
          height: 560,
          top: -200,
          right: -200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,59,237,0.16) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1100 }}>
        {/* Intro */}
        <div className="text-center mb-10">
          <SectionLabel text="Client Testimonials" dark centered />
          <h2
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-1px',
              color: '#fff',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            From the brands we've helped grow.
          </h2>
        </div>

        {/* 3-column cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              data-testid={`testimonial-card-${i}`}
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 12,
                padding: 28,
              }}
            >
              {/* Quote mark */}
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 28,
                  color: '#A07AF0',
                  display: 'block',
                  marginBottom: 8,
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </span>

              {/* Quote body */}
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.68)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  margin: '0 0 20px',
                }}
              >
                {t.quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center justify-center"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: 'rgba(124,59,237,0.25)',
                    color: '#C4A4F8',
                    fontSize: 13,
                    fontWeight: 600,
                    flexShrink: 0,
                  }}
                >
                  {t.initials}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: '#fff', margin: 0, lineHeight: 1.3 }}>
                    {t.name}
                  </p>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
