import { useNavigate } from 'react-router-dom';
import SectionLabel from './SectionLabel';

const stats = [
  { value: '4–8 wks', label: 'to production-ready MVP' },
  { value: '80%', label: 'process automation rate', accent: true },
  { value: '10×', label: 'operational velocity' },
  { value: '5×', label: 'efficiency gains' },
  { value: '100%', label: 'IP ownership to client', accent: true },
];

const cards = [
  {
    n: '01', title: 'AI Automation', slug: 'ai-automations',
    tagline: 'Turn your biggest workflows into your biggest advantage.',
    copy: 'Production-grade agentic systems, multi-step LLM workflows, RAG pipelines, intelligent automation — built to run at enterprise scale from day one.',
  },
  {
    n: '02', title: 'Full Stack Development', slug: 'full-stack',
    tagline: 'Complete products, built to last.',
    copy: 'From pixel-perfect frontends to high-throughput backend engines. You own 100% of the IP.',
  },
];

export default function TechnologyServices() {
  const navigate = useNavigate();
  return (
    <section className="relative" style={{ padding: '112px 32px', background: 'var(--dark)', color: '#fff', overflow: 'hidden' }}>
      <div className="relative mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 48 }}>
        <div className="flex flex-wrap items-end justify-between" style={{ gap: 32 }}>
          <div style={{ maxWidth: 720 }}>
            <SectionLabel text="Technical Services" dark />
            <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
              From AI pilots to production systems, <em style={{ color: '#C9B2FA', fontStyle: 'normal' }}>engineered to scale.</em>
            </h2>
          </div>
          <p style={{ margin: 0, maxWidth: 380, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16, lineHeight: 1.6, color: 'rgba(255,255,255,.7)' }}>
            Most AI projects never reach production and most dev partners vanish after handover. We build production-grade systems and stay accountable to outcomes, not billable hours.
          </p>
        </div>

        <div
          className="relative grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 1, background: 'rgba(255,255,255,.1)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, overflow: 'hidden' }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ background: 'var(--dark-mid)', padding: '26px 22px' }}>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 38, fontWeight: 600, lineHeight: 1, color: s.accent ? 'var(--acc)' : '#fff' }}>{s.value}</div>
              <div style={{ marginTop: 8, fontFamily: "'DM Sans'", fontSize: 13, color: 'rgba(255,255,255,.6)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 16 }}>
          {cards.map((c) => (
            <button
              key={c.n}
              onClick={() => navigate(`/solutions/${c.slug}`)}
              className="text-left flex flex-col"
              style={{ cursor: 'pointer', background: 'var(--dark-surface)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 16, padding: 32, gap: 14, color: '#fff' }}
            >
              <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: 'rgba(255,255,255,.5)' }}>{c.n}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 30, fontWeight: 600, lineHeight: 1.1 }}>{c.title}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 300, fontStyle: 'italic', lineHeight: 1.3, color: '#C9B2FA' }}>{c.tagline}</div>
              <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,.7)' }}>{c.copy}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
