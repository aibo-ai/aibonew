import { BOOKING_URL } from '@/lib/constants';
import { trackBookingClick } from '@/lib/analytics';
import SectionLabel from './SectionLabel';

// Closing CTA — shared across every page. The headline is deliberately the
// same everywhere ("Ready to start growing?"); `page` is used for booking
// analytics.
export default function TickerCta({ page }) {
  return (
    <>
      <section
        className="relative text-center"
        style={{
          padding: '112px 32px',
          background: 'var(--dark)',
          backgroundImage: 'radial-gradient(rgba(160,122,240,.22) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          color: '#fff',
        }}
      >
        <div className="relative mx-auto flex flex-col items-center" style={{ maxWidth: 900, gap: 26 }}>
          <SectionLabel text="Get Started" dark />
          <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px,5vw,64px)', lineHeight: 1.08, letterSpacing: '-2px' }}>
            Ready to <em style={{ color: 'var(--acc)', fontStyle: 'normal' }}>start growing?</em>
          </h2>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center"
            style={{ padding: '16px 32px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, boxShadow: '0 0 40px rgba(124,59,237,.45)' }}
            onClick={() => trackBookingClick({ page, placement: 'final_cta' })}
          >
            Book Free Strategy Session
          </a>
          <div style={{ fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, letterSpacing: '0.06em', color: 'rgba(255,255,255,.55)' }}>
            Free &middot; No commitment &middot; 30 minutes
          </div>
        </div>
      </section>
    </>
  );
}
