import { ArrowRight } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";
import TrustedByTicker from "@/components/sections/TrustedByTicker";

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative hero-dotgrid"
      style={{
        padding: '152px 40px 80px',
        overflow: 'hidden',
      }}
    >
      <div className="relative z-10 mx-auto" style={{ maxWidth: 1100 }}>
        {/* Eyebrow badge */}
        <div
          data-testid="hero-eyebrow-badge"
          className="inline-flex items-center gap-2 mb-6"
          style={{
            background: 'var(--purple-light)',
            border: '1px solid rgba(124,59,237,0.3)',
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
          <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--purple-dark)' }}>
            Boutique Agency · Marketing + Technology
          </span>
        </div>

        {/* Main headline */}
        <h1
          data-testid="hero-headline"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 600,
            fontSize: 'clamp(42px, 5.5vw, 72px)',
            letterSpacing: '-2px',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
            margin: '0 0 24px',
            maxWidth: 900,
          }}
        >
          Where great marketing meets{' '}
          <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--purple-dark)' }}>serious engineering.</em>
        </h1>

        {/* Supporting text */}
        <p
          data-testid="hero-description"
          style={{
            fontSize: 'clamp(17px, 2vw, 20px)',
            fontWeight: 300,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: 680,
            margin: '0 0 40px',
          }}
        >
          We help brands grow on two fronts: providing marketing services that generate demand and building technical products that deliver efficiency.
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
            onClick={() => trackBookingClick({ page: '/', placement: 'hero' })}
          >
            Book Free Strategy Session
          </a>
          <a
            href="#case-studies"
            className="inline-flex items-center gap-2"
            style={{ padding: '16px 32px', fontSize: 16, fontWeight: 600, color: 'var(--text-primary)', border: '1px solid var(--border-clr)', borderRadius: 8, textDecoration: 'none', background: 'var(--white)' }}
          >
            View Case Studies
            <ArrowRight size={18} />
          </a>
        </div>

        {/* Trusted by — scrolling logo ticker */}
        <TrustedByTicker />
      </div>
    </section>
  );
}
