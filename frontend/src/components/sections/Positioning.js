import { Megaphone, Settings } from "lucide-react";
import SectionLabel from "./SectionLabel";

const mktTags = ['GEO', 'AEO', 'SEO', 'Content Marketing'];
const techTags = ['AI Automation', 'White Label', 'Full Stack Dev'];

export default function Positioning() {
  return (
    <section
      id="positioning"
      data-testid="positioning-section"
      style={{ background: 'var(--white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1000 }}>
        {/* Intro */}
        <div className="text-center mx-auto mb-12" style={{ maxWidth: 600 }}>
          <SectionLabel text="What We Do" centered />
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
            The only agency that masters <em>both</em> sides of growth.
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            There are agencies that do marketing. There are firms that build technology.
            MyAibo does both — and makes them compound.
          </p>
        </div>

        {/* Dual pillars */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_40px_1fr] gap-0 items-stretch">
          {/* Marketing pillar */}
          <div
            data-testid="pillar-marketing"
            style={{
              background: 'var(--purple-light)',
              border: '1px solid rgba(124,59,237,0.2)',
              borderRadius: 12,
              padding: 40,
            }}
          >
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(124,59,237,0.12)',
                borderRadius: 10,
              }}
            >
              <Megaphone size={22} style={{ color: 'var(--purple)' }} />
            </div>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 26,
                fontWeight: 600,
                color: 'var(--text-primary)',
                margin: '0 0 10px',
              }}
            >
              Marketing Intelligence
            </h3>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: 16 }}>
              We dominate search and AI result surfaces — Google, ChatGPT, Perplexity,
              and beyond. GEO, AEO, SEO, and content that builds compound authority.
            </p>
            <div className="flex flex-wrap gap-2">
              {mktTags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: 'rgba(124,59,237,0.1)',
                    color: 'var(--purple-dark)',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    borderRadius: 4,
                    padding: '4px 10px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="hidden md:flex flex-col items-center justify-center">
            <div style={{ width: 1, flex: 1, background: 'var(--border-clr)' }} />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: 'var(--text-muted)',
                padding: '10px 0',
              }}
            >
              +
            </span>
            <div style={{ width: 1, flex: 1, background: 'var(--border-clr)' }} />
          </div>

          {/* Technology pillar */}
          <div
            data-testid="pillar-technology"
            style={{
              background: 'var(--dark)',
              borderRadius: 12,
              padding: 40,
            }}
          >
            <div
              className="flex items-center justify-center mb-4"
              style={{
                width: 44,
                height: 44,
                background: 'rgba(255,255,255,0.07)',
                borderRadius: 10,
              }}
            >
              <Settings size={22} style={{ color: 'rgba(255,255,255,0.7)' }} />
            </div>
            <h3
              style={{
                fontFamily: "'Fraunces', serif",
                fontSize: 26,
                fontWeight: 600,
                color: '#fff',
                margin: '0 0 10px',
              }}
            >
              Engineering Power
            </h3>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.65, marginBottom: 16 }}>
              We build production-grade AI agents, white-label platforms, and full-stack
              systems. Custom, modular, and scalable from day one.
            </p>
            <div className="flex flex-wrap gap-2">
              {techTags.map((t) => (
                <span
                  key={t}
                  style={{
                    background: 'rgba(124,59,237,0.2)',
                    color: '#A07AF0',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    borderRadius: 4,
                    padding: '4px 10px',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bridge note */}
        <p
          className="text-center mt-8"
          style={{
            fontStyle: 'italic',
            fontSize: 14,
            color: 'var(--text-muted)',
          }}
        >
          Each practice makes the other stronger — one source of truth for your brand's growth.
        </p>
      </div>
    </section>
  );
}
