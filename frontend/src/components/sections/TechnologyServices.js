import SectionLabel from "./SectionLabel";

const stats = [
  { num: '<10w', label: 'Launch to market' },
  { num: '-70%', label: 'Manual effort eliminated' },
  { num: '3\u00d7', label: 'Sales capacity multiplied' },
  { num: '96%', label: 'Lead scoring accuracy' },
];

const cards = [
  {
    num: '01',
    title: 'AI Automation',
    tagline: 'Custom AI agents that work',
    body: "Custom AI agents that handle lead nurturing, customer support, content production, and internal ops — reducing manual effort by up to 70%.",
  },
  {
    num: '02',
    title: 'White Label',
    tagline: 'Your brand, our engineering',
    body: "Launch your own AI-powered SaaS in under 10 weeks. Full reseller infrastructure, multi-tenant architecture, and infinite seat scalability.",
  },
  {
    num: '03',
    title: 'Full Stack Development',
    tagline: 'From idea to production',
    body: "Cloud-native platforms with embedded AI — custom ERP, inventory management, e-commerce, or marketplace products designed to scale.",
  },
];

export default function TechnologyServices() {
  return (
    <section
      id="technology-services"
      data-testid="technology-services-section"
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
          left: -200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,59,237,0.16) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1100 }}>
        {/* Stats strip */}
        <div
          data-testid="tech-stats-strip"
          className="grid grid-cols-2 md:grid-cols-4 mb-12"
          style={{
            background: 'rgba(255,255,255,0.04)',
            borderRadius: 8,
            overflow: 'hidden',
            gap: 1,
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="text-center"
              style={{
                background: 'rgba(255,255,255,0.025)',
                padding: '24px 20px',
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 36,
                  fontWeight: 600,
                  color: 'var(--amber)',
                  display: 'block',
                  lineHeight: 1.1,
                }}
              >
                {s.num}
              </span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.42)' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* 2-column header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <div style={{ maxWidth: 560 }}>
            <SectionLabel text="Technology Services" dark />
            <h2
              className="headline-dark"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                letterSpacing: '-1px',
                color: '#fff',
                margin: '0 0 10px',
                lineHeight: 1.15,
              }}
            >
              Build the <em>intelligent</em> infrastructure your business runs on.
            </h2>
            <p style={{ fontSize: 16, fontWeight: 300, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>
              We engineer AI agents, white-label platforms, and full-stack products.
              Production-grade from sprint one.
            </p>
          </div>
          <div className="text-right flex-shrink-0">
            <span
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 48,
                fontWeight: 600,
                color: 'var(--amber)',
                display: 'block',
                lineHeight: 1,
              }}
            >
              8&times;
            </span>
            <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
              Average inventory speed improvement
            </span>
          </div>
        </div>

        {/* 3-column card grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
          {cards.map((c) => (
            <div
              key={c.num}
              data-testid={`tech-card-${c.num}`}
              className="dark-card-hover"
              style={{
                background: 'rgba(255,255,255,0.045)',
                border: '1px solid rgba(255,255,255,0.075)',
                borderRadius: 12,
                padding: 28,
              }}
            >
              <span
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'rgba(124,59,237,0.65)',
                  letterSpacing: '0.1em',
                  display: 'block',
                  marginBottom: 12,
                }}
              >
                {c.num}
              </span>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: '#fff',
                  margin: '0 0 4px',
                }}
              >
                {c.title}
              </h3>
              <p style={{ fontStyle: 'italic', fontSize: 12, color: '#A07AF0', margin: '0 0 10px' }}>
                {c.tagline}
              </p>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.55)',
                  lineHeight: 1.65,
                  margin: '0 0 14px',
                }}
              >
                {c.body}
              </p>
              <a
                href="#"
                style={{ color: '#A07AF0', fontSize: 12, fontWeight: 600, textDecoration: 'none' }}
              >
                Learn more &rarr;
              </a>
            </div>
          ))}
        </div>

        {/* Compound strip */}
        <div
          data-testid="tech-compound-strip"
          className="flex items-center gap-4"
          style={{
            background: 'rgba(124,59,237,0.12)',
            border: '1px solid rgba(124,59,237,0.22)',
            borderRadius: 8,
            padding: '16px 28px',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--purple)',
              flexShrink: 0,
            }}
          />
          <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: 13, fontStyle: 'italic' }}>
            Combine AI Automation + White Label + Full Stack for a complete technology
            transformation — from ops efficiency to new revenue lines.
          </span>
        </div>
      </div>
    </section>
  );
}
