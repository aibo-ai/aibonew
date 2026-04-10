import { Calendar, ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";

const clients = ['Iluvia', 'Trudiance', 'Fego', 'Optimhire', 'vPersonalize', 'Brokenatom'];

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
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.95)' }}>
            Boutique Agency · Marketing + Technology
          </span>
        </div>

        {/* Main headline */}
        <h1
          data-testid="hero-headline"
          className="headline-dark"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(42px, 5.5vw, 72px)',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            color: '#fff',
            margin: '0 0 24px',
            maxWidth: 900,
          }}
        >
          Where great marketing meets serious engineering.
        </h1>

        {/* Supporting text */}
        <p
          data-testid="hero-description"
          style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.85)',
            maxWidth: 680,
            margin: '0 0 40px',
          }}
        >
          We help brands grow on two fronts: building the marketing systems that generate demand and the technical products that deliver efficiency.
          <br />
          <br />
          No generalist fluff. Just deep expertise in both.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-16">
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple inline-flex items-center gap-2"
            style={{ padding: '16px 32px', fontSize: 16, fontWeight: 600 }}
          >
            Book Free Strategy Session
          </a>
          <a
            href="#case-studies"
            className="btn-outline inline-flex items-center gap-2"
            style={{ padding: '16px 32px', fontSize: 16, fontWeight: 600 }}
          >
            View Case Studies
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Trusted by */}
        <div data-testid="hero-clients">
          <div style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Trusted by
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 items-center">
            {clients.map((client) => (
              <span
                key={client}
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
