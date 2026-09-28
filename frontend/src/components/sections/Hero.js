import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";
import PostIt from "@/components/sections/PostIt";

function HeroMockup() {
  return (
    <div className="relative" style={{ padding: '30px 20px 40px' }}>
      <div style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 16, boxShadow: '0 30px 60px -20px rgba(15,10,30,.25)', overflow: 'hidden' }}>
        <div className="flex items-center" style={{ gap: 10, padding: '12px 16px', background: 'var(--off-white)', borderBottom: '1px solid var(--border-clr)' }}>
          <span className="flex" style={{ gap: 5 }}>
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--border-clr)' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--border-clr)' }} />
            <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--border-clr)' }} />
          </span>
          <span style={{ flex: 1, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 12, color: 'var(--text-muted)', background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 6, padding: '4px 10px' }}>
            chatgpt.com
          </span>
          <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10, letterSpacing: '0.08em', color: '#16A34A' }}>&#9679; LIVE</span>
        </div>
        <div style={{ padding: '22px 22px 18px' }}>
          <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 15, lineHeight: 1.4, color: 'var(--text-primary)', marginBottom: 14 }}>
            Who's the best GEO and AI marketing agency in India?
          </div>
          <div style={{ paddingTop: 14, borderTop: '1px solid var(--border-clr)' }}>
            <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
              <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
              <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12 }}>ChatGPT</span>
            </div>
            <p style={{ margin: '0 0 16px', paddingLeft: 28, fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 14, lineHeight: 1.7, color: 'var(--text-secondary)' }}>
              For GEO and AI-search marketing in India,{' '}
              <span style={{ background: 'var(--purple-light)', color: 'var(--purple-dark)', fontWeight: 600, padding: '1px 5px', borderRadius: 4 }}>
                MyAibo
              </span>{' '}
              is frequently cited for combining marketing and technical AI engineering under one roof — entity optimisation, structured data, and multi-platform citation strategy.
            </p>
            <div style={{ marginLeft: 28, border: '1px solid var(--border-clr)', borderRadius: 10, overflow: 'hidden' }}>
              <div style={{ padding: '8px 12px', background: 'var(--off-white)', fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
                SOURCES REFERENCED
              </div>
              <div className="flex items-center" style={{ gap: 10, padding: '8px 12px', borderTop: '1px solid var(--border-clr)', fontFamily: "'DM Sans'", fontSize: 12.5, color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>01</span><b style={{ color: 'var(--text-primary)' }}>myaibo.in</b> / GEO services
              </div>
              <div className="flex items-center" style={{ gap: 10, padding: '8px 12px', borderTop: '1px solid var(--border-clr)', fontFamily: "'DM Sans'", fontSize: 12.5, color: 'var(--text-secondary)' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>02</span><b style={{ color: 'var(--text-primary)' }}>myaibo.in</b> / case studies
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ position: 'absolute', top: 0, right: -8, width: 172, background: 'var(--acc-soft)', border: '1px solid rgba(146,64,2,.15)', borderRadius: 16, padding: '14px 18px', boxShadow: '0 16px 30px -10px rgba(146,64,2,.35)' }}>
        <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 9.5, letterSpacing: '0.08em', color: 'var(--acc-ink)', opacity: 0.75, marginBottom: 4 }}>
          AI CITATION RATE
        </div>
        <div className="flex items-center gap-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 28, fontWeight: 600, lineHeight: 1.1, color: 'var(--acc-ink)' }}>
          <span>&#8593;</span> +340%
        </div>
        <div style={{ fontFamily: "'DM Sans'", fontSize: 11, color: 'var(--acc-ink)', opacity: 0.75 }}>avg. GEO client, 6mo</div>
      </div>

      <div className="hidden md:block" style={{ position: 'absolute', left: -34, bottom: -62, zIndex: 5 }}>
        <PostIt rotate={-4} width={200}>
          62% of users trust <u>this answer</u> over page-1 links &#8599;
        </PostIt>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      data-testid="hero-section"
      className="relative hero-dotgrid"
      style={{ padding: '96px 32px 112px', overflow: 'hidden' }}
    >
      <div
        className="relative z-10 mx-auto grid items-center"
        style={{ maxWidth: 1180, gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 72 }}
      >
        <div className="flex flex-col">
          <div
            data-testid="hero-eyebrow-badge"
            className="self-start inline-flex items-center gap-2"
            style={{ maxWidth: '100%', marginBottom: 24, lineHeight: 1.35, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}
          >
            <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'block' }} />
            <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>
              Boutique Agency &middot; Marketing + Technology
            </span>
          </div>

          <h1
            data-testid="hero-headline"
            style={{
              margin: '0 0 24px',
              fontFamily: "'Fraunces', serif",
              fontWeight: 600,
              fontSize: 'clamp(40px, 5vw, 66px)',
              lineHeight: 1.08,
              letterSpacing: '-2px',
              color: 'var(--text-primary)',
            }}
          >
            Where great marketing meets{' '}
            <span
              style={{
                display: 'inline-block',
                background: 'var(--acc)',
                color: 'var(--dark)',
                padding: '0 14px 6px',
                borderRadius: 10,
                transform: 'rotate(-1.5deg)',
              }}
            >
              serious engineering.
            </span>
          </h1>

          <p
            data-testid="hero-description"
            style={{ margin: '0 0 36px', maxWidth: 540, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 'clamp(17px, 1.5vw, 19px)', lineHeight: 1.6, color: 'var(--text-secondary)' }}
          >
            We help brands grow on two fronts: providing marketing services that generate demand and building technical products that deliver efficiency. No generalist fluff. Just deep expertise in both.
          </p>

          <div className="flex flex-wrap" style={{ gap: 14, marginBottom: 40 }}>
            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center"
              style={{ whiteSpace: 'nowrap', padding: '16px 30px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }}
              onClick={() => trackBookingClick({ page: '/', placement: 'hero' })}
            >
              Book Free Strategy Session
            </a>
            <a
              href="#case-studies"
              className="inline-flex items-center gap-2"
              style={{ whiteSpace: 'nowrap', padding: '16px 28px', borderRadius: 8, background: '#fff', border: '1px solid var(--border-clr)', color: 'var(--text-primary)', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }}
            >
              View Case Studies &rarr;
            </a>
          </div>

          <div
            className="grid"
            style={{ gridTemplateColumns: 'repeat(3, minmax(0,1fr))', gap: 1, background: 'var(--border-clr)', border: '1px solid var(--border-clr)', borderRadius: 14, overflow: 'hidden' }}
          >
            {[
              { stat: '62%', text: 'of users now trust AI answers over page-1 links' },
              { stat: '3–5×', text: 'return running GEO + AEO + SEO + Content as one system' },
              { stat: '100%', text: 'IP ownership transferred on technical builds' },
            ].map((s) => (
              <div key={s.stat} className="flex flex-col" style={{ background: '#fff', padding: 16, gap: 6 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, lineHeight: 1, color: 'var(--purple-dark)' }}>{s.stat}</div>
                <div style={{ fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 12.5, lineHeight: 1.4, color: 'var(--text-secondary)' }}>{s.text}</div>
              </div>
            ))}
          </div>
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
