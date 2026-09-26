// A self-referential "product screenshot" mockup — MyAibo's own AI-visibility
// tracking dashboard, the motif threadslab.in uses for its analytics section.
// Every number here is a real, already-published MyAibo result (same figures
// used in geoData.js/whyNow + results), just packaged as a dashboard instead
// of a stat grid — no new claims, no fabricated time-series or named
// competitors.

const kpis = [
  { label: 'AI CITATION RATE', value: '+340%', sub: '6-month avg., GEO clients' },
  { label: 'SHARE OF VOICE', value: '4.2×', sub: 'vs. competitors in AI answers' },
  { label: 'BRANDED QUERIES', value: '+178%', sub: 'from AI-referred users' },
  { label: 'BRAND FRICTION', value: '−44%', sub: 'reduction in sales cycles' },
];

const platforms = ['ChatGPT', 'Perplexity', 'Google AI Overview', 'Gemini', 'Bing Copilot'];

export default function AIVisibilityDashboard() {
  return (
    <section style={{ background: 'var(--off-white)', padding: '90px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: 1000 }}>
        <div className="mx-auto text-center mb-12" style={{ maxWidth: 680 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
            What We Track
          </div>
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            The dashboard behind every citation.
          </h2>
        </div>

        <div
          className="card-lift"
          style={{
            background: 'var(--white)',
            border: '1px solid var(--border-clr)',
            borderRadius: 20,
            boxShadow: '0 24px 60px rgba(15,10,30,0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center justify-between flex-wrap gap-3"
            style={{ padding: '16px 24px', borderBottom: '1px solid var(--border-clr)', background: 'var(--off-white)' }}
          >
            <div className="flex items-center gap-2">
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: '50%', background: '#16A34A', display: 'block' }} />
              <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-primary)' }}>
                MyAibo &middot; AI Visibility
              </span>
            </div>
            <span
              style={{
                fontSize: 10.5,
                fontWeight: 700,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--purple-dark)',
                background: 'var(--purple-light)',
                borderRadius: 6,
                padding: '4px 10px',
              }}
            >
              LIVE &middot; 5 PLATFORMS TRACKED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5" style={{ padding: 28, gap: 28 }}>
            {/* Share of voice mini-chart */}
            <div className="md:col-span-2" style={{ borderRight: '0px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
                Share of Voice in AI Answers
              </div>
              <div className="flex items-end gap-6" style={{ height: 140, marginBottom: 12 }}>
                <div className="flex flex-col items-center justify-end" style={{ height: '100%' }}>
                  <div style={{ width: 44, height: '100%', borderRadius: 8, background: 'var(--purple)' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 8 }}>MyAibo client</span>
                </div>
                <div className="flex flex-col items-center justify-end" style={{ height: '100%' }}>
                  <div style={{ width: 44, height: '24%', borderRadius: 8, background: 'var(--border-clr)' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text-muted)', marginTop: 8 }}>Category avg.</span>
                </div>
              </div>
              <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: 'var(--purple-dark)' }}>
                4.2&times; improvement
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>vs. competitors in AI-generated answers</div>
            </div>

            {/* KPI grid */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              {kpis.map((k) => (
                <div key={k.label} style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 12, padding: '14px 16px' }}>
                  <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: 4 }}>{k.label}</div>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 22, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.15 }}>{k.value}</div>
                  <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>{k.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tracked platforms strip */}
          <div
            className="flex items-center flex-wrap gap-x-3 gap-y-2"
            style={{ padding: '14px 24px', borderTop: '1px solid var(--border-clr)', background: 'var(--off-white)' }}
          >
            <span style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Tracked:
            </span>
            {platforms.map((p) => (
              <span
                key={p}
                style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-secondary)', background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 5, padding: '3px 9px' }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
