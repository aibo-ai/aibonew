import SectionLabel from './SectionLabel';

const reasons = [
  ['Boutique by Design', "Every engagement gets experienced hands, not a hand-off to someone who wasn't in the briefing."],
  ['AI-Native Across Both Practices', 'Our marketing team uses AI to build organic authority. Our tech team builds the AI systems themselves. No other agency bridges both practices at depth.'],
  ['Modular & Scalable', 'Every service is designed to compound. Start with one, add others as you grow. The architecture supports it from day one, not retrofitted later.'],
  ['Outcome-Driven, Not Hours-Driven', 'Engagements are structured around measurable KPIs, not retainer hours. We own the outcome. No black-box metrics, no hidden costs.'],
  ['Complete Transparency', 'Every deliverable ties to a result you can verify independently. No surprises during development.'],
  ['Deep Market Expertise', 'Specialist knowledge in FMCG, D2C, Logistics, Healthcare, FinTech, SaaS and more.'],
].map((r, i) => ({ n: String(i + 1).padStart(2, '0'), title: r[0], text: r[1] }));

export default function WhyMyAibo() {
  return (
    <section style={{ padding: '112px 32px' }}>
      <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 48 }}>
        <div>
          <SectionLabel text="Why MyAibo" />
          <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
            Six reasons <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>clients stay.</em>
          </h2>
        </div>
        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))', borderTop: '1px solid var(--border-clr)', borderLeft: '1px solid var(--border-clr)', background: '#fff' }}>
          {reasons.map((r, i) => (
            <div key={r.n} className="flex flex-col" style={{ padding: 30, borderRight: '1px solid var(--border-clr)', borderBottom: '1px solid var(--border-clr)', gap: 12, minHeight: 220 }}>
              <div style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: i % 2 === 1 ? 'var(--acc-ink)' : 'var(--purple)' }}>{r.n}</div>
              <div style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 22, lineHeight: 1.2 }}>{r.title}</div>
              <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
