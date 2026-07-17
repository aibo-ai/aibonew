import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";

export default function FinalCTA() {
  return (
    <section
      id="final-cta"
      data-testid="final-cta-section"
      style={{
        background: 'var(--white)',
        borderTop: '1px solid var(--border-clr)',
        padding: '80px 40px',
      }}
    >
      <div className="mx-auto text-center" style={{ maxWidth: 500 }}>
        {/* Label (no rule) */}
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--purple-dark)',
            display: 'block',
            marginBottom: 16,
          }}
        >
          Get Started
        </span>

        {/* Headline */}
        <h2
          className="headline-light"
          style={{
            fontFamily: "'Fraunces', serif",
            fontWeight: 300,
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            letterSpacing: '-1px',
            color: 'var(--text-primary)',
            margin: '0 0 12px',
            lineHeight: 1.15,
          }}
        >
          Ready to grow on <em>both fronts?</em>
        </h2>

        {/* Primary CTA */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="cta-book-session"
          className="btn-purple inline-flex"
          style={{ padding: '14px 28px', fontSize: 15, fontWeight: 500 }}
          onClick={() => trackBookingClick({ page: '/', placement: 'final_cta' })}
        >
          Book Free Strategy Session
        </a>

        {/* Micro copy */}
        <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
          Free &middot; No commitment &middot; 30 minutes
        </p>
      </div>
    </section>
  );
}
