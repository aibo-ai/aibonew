import { useState } from 'react';
import { BOOKING_URL } from '@/lib/constants';
import SectionLabel from './SectionLabel';

// Two-column FAQ: label/H2/intro/CTA on the left, accordion on the right.
// First item open by default; resets are the caller's responsibility via `key`.
export default function FaqTwoColumn({ items, intro }) {
  const [open, setOpen] = useState(0);
  if (!items || items.length === 0) return null;

  return (
    <section style={{ padding: '104px 32px', background: 'var(--white)', borderTop: '1px solid var(--border-clr)' }}>
      <div className="mx-auto grid grid-cols-1 lg:grid-cols-2" style={{ maxWidth: 1180, gap: 56, alignItems: 'start' }}>
        <div className="flex flex-col" style={{ gap: 20 }}>
          <SectionLabel text="FAQ" />
          <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
            Everything you need <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>to know.</em>
          </h2>
          <p style={{ margin: 0, maxWidth: 400, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            {intro}
          </p>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start inline-flex items-center"
            style={{ padding: '14px 24px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 15 }}
          >
            Book a call
          </a>
        </div>

        <div className="flex flex-col" style={{ borderTop: '1px solid var(--border-clr)' }}>
          {items.map((it, i) => {
            const isOpen = open === i;
            return (
              <div key={it.q} style={{ borderBottom: '1px solid var(--border-clr)' }}>
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center text-left"
                  style={{ gap: 20, padding: '22px 0', background: 'none', border: 0, color: 'var(--text-primary)', cursor: 'pointer', fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 18, lineHeight: 1.4 }}
                >
                  <span style={{ flex: 1 }}>{it.q}</span>
                  <span
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: isOpen ? 'var(--purple)' : 'var(--purple-light)',
                      color: isOpen ? '#fff' : 'var(--purple-dark)',
                      fontFamily: "'DM Sans'",
                      fontSize: 18,
                    }}
                  >
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <p style={{ margin: 0, padding: '0 50px 24px 0', fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
                    {it.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
