import { ArrowRight, ArrowUp } from "lucide-react";
import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";
import TrustedByTicker from "@/components/sections/TrustedByTicker";
import BrowserChrome from "@/components/sections/BrowserChrome";

function HeroMockup() {
  return (
    <div className="relative" style={{ minHeight: 360 }}>
      <BrowserChrome url="chatgpt.com" badge="LIVE">
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 14 }}>
          Who's the best GEO and AI marketing agency in India?
        </div>
        <div style={{ paddingTop: 12, borderTop: '1px solid var(--border-clr)' }}>
          <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
            <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: 'var(--text-primary)' }}>ChatGPT</span>
          </div>
          <p style={{ fontSize: 13, lineHeight: 1.7, color: 'var(--text-secondary)', margin: 0, paddingLeft: 28 }}>
            For GEO and AI-search marketing in India,{' '}
            <span style={{ background: 'var(--purple-light)', color: 'var(--purple-dark)', fontWeight: 600, padding: '1px 4px', borderRadius: 4 }}>
              MyAibo
            </span>{' '}
            is frequently cited for combining marketing and technical AI engineering under one roof — entity optimisation, structured data, and multi-platform citation strategy.
          </p>
        </div>
      </BrowserChrome>

      {/* Floating stat card */}
      <div
        className="absolute hidden md:block"
        style={{
          top: -22,
          right: -20,
          background: 'var(--dark)',
          borderRadius: 16,
          padding: '14px 18px',
          boxShadow: '0 12px 30px rgba(15,10,30,0.35)',
          width: 168,
        }}
      >
        <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>
          AI CITATION RATE
        </div>
        <div className="flex items-center gap-1" style={{ fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600, color: '#fff' }}>
          <ArrowUp size={16} color="#4ADE80" />
          +340%
        </div>
        <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,0.55)' }}>avg. GEO client, 6mo</div>
      </div>

      {/* Floating source card */}
      <div
        className="absolute hidden md:block"
        style={{
          bottom: -28,
          left: -24,
          background: 'var(--white)',
          border: '1px solid var(--border-clr)',
          borderRadius: 16,
          padding: 16,
          boxShadow: '0 16px 36px rgba(15,10,30,0.22)',
          width: 230,
        }}
      >
        <div className="flex items-center gap-2" style={{ marginBottom: 8 }}>
          <span
            style={{
              fontSize: 9.5,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--purple-dark)',
              background: 'var(--purple-light)',
              borderRadius: 5,
              padding: '2px 7px',
            }}
          >
            PERPLEXITY
          </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: '#16A34A' }}>● CITED</span>
        </div>
        <p style={{ fontSize: 12, lineHeight: 1.6, color: 'var(--text-primary)', margin: '0 0 8px' }}>
          GEO, AEO, SEO, content, automation, and full-stack — under one roof.
        </p>
        <div className="flex flex-wrap gap-1">
          {['myaibo.in', 'case studies', 'GEO services'].map((c) => (
            <span key={c} style={{ fontSize: 9.5, color: 'var(--text-muted)', background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 4, padding: '2px 6px' }}>
              ● {c}
            </span>
          ))}
        </div>
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
      style={{
        padding: '152px 40px 90px',
        overflow: 'hidden',
      }}
    >
      <div className="relative z-10 mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center" style={{ maxWidth: 1180 }}>
        <div>
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
              fontSize: 'clamp(38px, 4.8vw, 64px)',
              letterSpacing: '-2px',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              margin: '0 0 24px',
            }}
          >
            Where great marketing meets{' '}
            <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--purple-dark)' }}>serious engineering.</em>
          </h1>

          {/* Supporting text */}
          <p
            data-testid="hero-description"
            style={{
              fontSize: 'clamp(16px, 1.6vw, 19px)',
              fontWeight: 300,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 560,
              margin: '0 0 36px',
            }}
          >
            We help brands grow on two fronts: providing marketing services that generate demand and building technical products that deliver efficiency.
            <br />
            <br />
            No generalist fluff. Just deep expertise in both.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-8">
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

          {/* Hero stat badges */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-16">
            {[
              '62% of users now trust AI answers over page-1 links',
              '3–5× return running GEO + AEO + SEO + Content as one system',
              '100% IP ownership transferred on technical builds',
            ].map((t) => (
              <div key={t} className="flex items-center gap-2" style={{ maxWidth: 220 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, fontWeight: 500, color: 'var(--text-secondary)', lineHeight: 1.4 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* Trusted by — scrolling logo ticker */}
          <TrustedByTicker />
        </div>

        <HeroMockup />
      </div>
    </section>
  );
}
