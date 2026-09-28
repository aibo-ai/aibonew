import { BOOKING_URL } from '@/lib/constants';
import { trackBookingClick } from '@/lib/analytics';
import SectionLabel from './SectionLabel';

const TICKER_ITEMS = [
  'Boutique by design',
  'AI-native across both practices',
  'Outcome-driven, not hours-driven',
  'Complete transparency',
  'FMCG · D2C · Logistics · Healthcare · FinTech · SaaS',
];

// Ticker band + closing CTA — shared across every page template (home,
// pillar, subpage). `ctaHeadline` is the h2 split into {a, b} where `b`
// (the last clause) renders in italic amber; `page` is used for booking
// analytics.
export default function TickerCta({ ctaA, ctaB, page }) {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <>
      <div style={{ background: 'var(--acc)', color: 'var(--dark)', overflow: 'hidden', padding: '14px 0', borderTop: '1px solid rgba(15,10,30,0.1)' }}>
        <div
          className="flex"
          style={{ gap: 40, width: 'max-content', animation: 'aibo-ticker 45s linear infinite', fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 600, letterSpacing: '0.04em', whiteSpace: 'nowrap' }}
        >
          {items.map((t, i) => (
            <span key={`${t}-${i}`}>&#10022; {t}</span>
          ))}
        </div>
      </div>

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
            {ctaA}
            <em style={{ color: 'var(--acc)', fontStyle: 'normal' }}>{ctaB}</em>
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
