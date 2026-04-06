import { Calendar, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

const clients = ['Iluvia', 'Trudiance Beauty', 'vPersonalize', 'Fego', 'OptimHire', 'Brokenatom'];

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative"
      style={{
        background: 'var(--dark)',
        padding: '144px 40px 72px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: 560,
          height: 560,
          top: -100,
          right: -100,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,59,237,0.18) 0%, transparent 68%)',
        }}
      />

      <div className="relative z-10 mx-auto" style={{ maxWidth: 1100 }}>
        {/* Eyebrow badge */}
        <div
          data-testid="hero-eyebrow-badge"
          className="inline-flex items-center gap-2 mb-6"
          style={{
            background: 'rgba(124,59,237,0.15)',
            border: '1px solid rgba(124,59,237,0.35)',
            borderRadius: 20,
            padding: '5px 14px',
          }}
        >
          <span
            className="pulse-dot"
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--purple)',
              display: 'block',
              flexShrink: 0,
            }}
          />
          <span style={{ color: '#A07AF0', fontSize: 12, fontWeight: 500 }}>
            AI-Native &middot; Marketing + Technology
          </span>
        </div>

        {/* Headline */}
        <h1
          data-testid="hero-headline"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(40px, 5.5vw, 72px)',
            letterSpacing: '-1.5px',
            color: '#fff',
            maxWidth: 680,
            lineHeight: 1.08,
            margin: '0 0 20px',
          }}
        >
          Where intelligent marketing meets engineered technology.
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: 17,
            fontWeight: 300,
            color: 'rgba(255,255,255,0.62)',
            maxWidth: 520,
            lineHeight: 1.6,
            margin: '0 0 32px',
          }}
        >
          MyAibo is a boutique agency that builds custom AI workforces and delivers
          full-spectrum marketing — GEO, AEO, SEO, and content — that compounds over time.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3 mb-12">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="hero-cta-primary"
            className="btn-purple"
            style={{ padding: '13px 24px', fontSize: 15, fontWeight: 500 }}
          >
            <Calendar size={16} />
            Book Free Strategy Session
          </a>
          <a
            href="#case-studies"
            data-testid="hero-cta-secondary"
            className="btn-outline-light"
            style={{ padding: '12px 22px', fontSize: 15, fontWeight: 500 }}
          >
            See Our Work <ArrowRight size={15} />
          </a>
        </div>

        {/* Trust strip */}
        <div>
          <p style={{ color: 'rgba(255,255,255,0.32)', fontSize: 12, marginBottom: 12 }}>
            Trusted by
          </p>
          <div className="flex flex-wrap gap-2">
            {clients.map((name) => (
              <span
                key={name}
                data-testid={`trust-badge-${name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  padding: '4px 12px',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.42)',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
