import { Link } from 'react-router-dom';
import SectionLabel from './SectionLabel';

const pill = (dark) => ({
  height: 34,
  padding: '0 14px',
  borderRadius: 999,
  border: dark ? '1px solid rgba(255,255,255,.18)' : '1px solid var(--border-clr)',
  background: dark ? 'rgba(255,255,255,.04)' : 'var(--off-white)',
  color: dark ? '#fff' : 'var(--text-primary)',
  fontFamily: "'DM Sans'",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: '0.06em',
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
});

export default function Positioning() {
  return (
    <section id="positioning" data-testid="positioning-section" style={{ padding: '112px 32px' }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 56 }}>
        <div className="flex flex-wrap items-end justify-between" style={{ gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <SectionLabel text="Our Practice" />
            <h2
              data-testid="positioning-headline"
              style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}
            >
              We're not a vendor. <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>We're your growth partner.</em>
            </h2>
          </div>
          <p data-testid="positioning-description" style={{ margin: 0, maxWidth: 360, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 17, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
            One agency. Two deep practice areas. Built to work around your specific growth challenge.
          </p>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 440px), 1fr))', gap: 20 }}>
          <div className="flex flex-col" style={{ background: '#fff', border: '1px solid var(--border-clr)', borderRadius: 20, padding: 40, gap: 20 }}>
            <div className="self-start" style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10.5, letterSpacing: '0.1em', padding: '5px 10px', borderRadius: 6, background: 'var(--acc-soft)', color: 'var(--acc-ink)' }}>
              MARKETING
            </div>
            <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 34, lineHeight: 1.1, letterSpacing: '-1px' }}>
              Marketing that compounds.
            </h3>
            <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'var(--text-secondary)' }}>
              We build the organic infrastructure that makes brands findable on any search engine, LLM platform and in the minds of the right audience. From GEO and AEO to SEO and content marketing, every service compounds into a lasting authority.
            </p>
            <div className="flex flex-wrap" style={{ gap: 8, marginTop: 'auto' }}>
              <Link to="/solutions/geo" style={pill(false)}>GEO</Link>
              <Link to="/solutions/aeo" style={pill(false)}>AEO</Link>
              <Link to="/solutions/seo" style={pill(false)}>SEO</Link>
              <Link to="/solutions/content-marketing" style={pill(false)}>CONTENT MARKETING</Link>
            </div>
          </div>

          <div className="flex flex-col" style={{ background: 'var(--dark)', color: '#fff', borderRadius: 20, padding: 40, gap: 20 }}>
            <div className="self-start" style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10.5, letterSpacing: '0.1em', padding: '5px 10px', borderRadius: 6, background: 'rgba(124,59,237,.25)', color: '#C9B2FA' }}>
              TECHNOLOGY
            </div>
            <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 34, lineHeight: 1.1, letterSpacing: '-1px' }}>
              Technology that scales.
            </h3>
            <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.65, color: 'rgba(255,255,255,.7)' }}>
              We build AI systems, platforms and products that remove operational ceilings. Agentic AI workforces, white-label platforms and full-stack products engineered for enterprise, delivered at boutique speed.
            </p>
            <div className="flex flex-wrap" style={{ gap: 8, marginTop: 'auto' }}>
              <Link to="/solutions/ai-automations" style={pill(true)}>AI AUTOMATION</Link>
              <Link to="/solutions/full-stack" style={pill(true)}>FULL STACK DEV</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
