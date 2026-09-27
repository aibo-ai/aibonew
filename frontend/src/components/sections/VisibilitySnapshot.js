// Recreates the "visibility snapshot" score-card format from a real MyAibo
// answer-engine visibility tracking run. Anonymized to industry vertical
// (BFSI/Insurance) — no client name, no named competitors — but every
// number is a real, unweighted finding from a real pre-engagement audit.
const scores = [
  { label: 'VISIBILITY', value: '10%', tone: 'bad' },
  { label: 'COMPETITION', value: '69%', tone: 'muted' },
  { label: 'SENTIMENT', value: '33%', tone: 'bad' },
  { label: 'ALIGNMENT', value: '77%', tone: 'good' },
];

const topics = [
  { topic: 'Core product category', value: '2.7%' },
  { topic: 'Adjacent product line', value: '0%' },
  { topic: 'Category comparison queries', value: '0%' },
  { topic: 'Post-purchase / claims support', value: '0%' },
];

export default function VisibilitySnapshot() {
  return (
    <section style={{ background: 'var(--off-white)', padding: '90px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: 940 }}>
        <div className="mx-auto text-center mb-12" style={{ maxWidth: 680 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
            From an Actual MyAibo Visibility Audit
          </div>
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.2 }}>
            What "not in the answer" actually looks like.
          </h2>
          <p style={{ fontSize: 14.5, color: 'var(--text-muted)', margin: 0 }}>
            A recent audit for a BFSI / insurance brand — anonymized, pre-engagement baseline.
          </p>
        </div>

        <div
          className="card-lift"
          style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 20, boxShadow: '0 24px 60px rgba(15,10,30,0.08)', overflow: 'hidden' }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: '1px solid var(--border-clr)' }}>
            {scores.map((s, i) => (
              <div key={s.label} style={{ padding: '24px 20px', borderRight: i < 3 ? '1px solid var(--border-clr)' : 'none', background: 'var(--off-white)' }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</div>
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 28,
                    fontWeight: 600,
                    color: s.tone === 'bad' ? '#DC2626' : s.tone === 'good' ? '#16A34A' : 'var(--text-primary)',
                  }}
                >
                  {s.value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: '26px 28px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 14 }}>
              Share of Voice by Topic
            </div>
            {topics.map((t, i) => (
              <div key={t.topic} className="flex items-center justify-between" style={{ padding: '12px 0', borderTop: i === 0 ? 'none' : '1px solid var(--border-clr)' }}>
                <span style={{ fontSize: 14, color: 'var(--text-secondary)' }}>{t.topic}</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: t.value === '0%' ? '#DC2626' : 'var(--purple-dark)' }}>{t.value}</span>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--purple-light)', margin: 20, borderRadius: 14, padding: 20 }}>
            <p style={{ fontSize: 13.5, color: 'var(--text-primary)', lineHeight: 1.7, margin: 0 }}>
              High alignment (77%) means the brand’s own content is accurate and on-message where it does appear —
              this isn’t a messaging problem. Near-zero visibility on category and comparison queries means AI
              answer engines simply aren’t finding enough citable, structured content to draw from. That’s the
              exact gap AEO closes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
