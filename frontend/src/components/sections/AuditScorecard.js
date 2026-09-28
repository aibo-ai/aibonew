// Recreates the layout of a real MyAibo GEO audit deliverable (the report
// we actually send prospects) as a homepage/pillar-page proof visual.
// Data is anonymized: the client's brand, its named competitors, and the
// exact citation-count are generalized/rounded so the underlying report
// isn't identifiable, but every figure is a real finding from a real
// engagement, not invented.
export default function AuditScorecard() {
  const stats = [
    { value: '0%', label: 'Visibility on unbranded category prompts', color: '#F87171' },
    { value: '0 / 5', label: 'Topic clusters with any citation at all', color: '#F87171' },
    { value: '100', label: 'Category-intent prompts tested', color: '#fff' },
    { value: '6,700+', label: 'AI citations analyzed to build the audit', color: 'var(--acc)' },
  ];

  const topics = [
    { topic: 'Core platform category', client: '0%', leader: 'Category leader: 17%' },
    { topic: 'Governance & compliance', client: '0%', leader: 'Category leader: 4%' },
    { topic: 'Infrastructure & scaling', client: '0%', leader: 'Category leader: 4%' },
    { topic: 'Interoperability & routing', client: '0%', leader: 'Category leader: 4%' },
  ];

  return (
    <section style={{ background: 'var(--dark)', padding: '90px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: 980 }}>
        <div className="mx-auto text-center mb-12" style={{ maxWidth: 680 }}>
          <div
            className="inline-flex items-center gap-2"
            style={{ background: 'var(--acc)', color: 'var(--dark)', borderRadius: 20, padding: '5px 14px', fontFamily: "'DM Sans'", fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}
          >
            From an Actual MyAibo GEO Audit
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.4vw, 42px)', letterSpacing: '-1px', color: '#fff', margin: '0 0 12px', lineHeight: 1.15 }}>
            Invisible where <em style={{ color: '#C9B2FA', fontStyle: 'normal' }}>buyers actually ask.</em>
          </h2>
          <p style={{ fontSize: 14.5, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            A recent audit for a B2B SaaS platform — anonymized. This is the gap most brands don’t know they have.
          </p>
        </div>

        <div
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 20,
            overflow: 'hidden',
          }}
        >
          {/* Stat row */}
          <div className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            {stats.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '26px 22px',
                  borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none',
                }}
              >
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: s.color, lineHeight: 1 }}>{s.value}</div>
                <div style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.5)', marginTop: 8, lineHeight: 1.4 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Topic scorecard */}
          <div style={{ padding: '28px 28px 8px' }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
              Visibility by Topic Cluster
            </div>
            {topics.map((t, i) => (
              <div
                key={t.topic}
                className="flex items-center justify-between flex-wrap gap-2"
                style={{ padding: '14px 0', borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)' }}
              >
                <span style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)' }}>{t.topic}</span>
                <div className="flex items-center gap-3">
                  <span style={{ fontFamily: "'Fraunces', serif", fontSize: 16, fontWeight: 600, color: '#F87171' }}>{t.client}</span>
                  <span style={{ fontSize: 11.5, color: 'rgba(255,255,255,0.4)' }}>{t.leader}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Reading the gap */}
          <div style={{ background: 'rgba(124,59,237,0.12)', margin: 20, borderRadius: 14, padding: 20 }}>
            <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, margin: 0 }}>
              The brand dominates searches for its own name — branded queries pull detailed, positive answers.
              But the moment a prompt drops the brand and just describes the job to be done, it disappears
              entirely, even on platforms that cite it elsewhere. That’s a citation-supply problem, not a
              brand-strength one — and it’s exactly what a MyAibo GEO audit is built to find and fix.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
