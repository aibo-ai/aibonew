// Editorial "big number" row layout — the format threadslab.in uses for its
// "WHY REDDIT" section (numbered category, short punchy headline, one-line
// description, oversized stat on the side) instead of our usual uniform
// card grid. Every number here is already published elsewhere on the site
// (hero badges, SEO/content whyNow stats, full-stack deliverables) — this
// is a new presentation of existing facts, not a new claim.
const rows = [
  {
    num: '01',
    tag: 'SEARCH BEHAVIOR',
    headline: 'The front door moved.',
    body: "Buyers ask ChatGPT and Perplexity before they open Google — and increasingly, they don't click through at all.",
    stat: '62%',
    statLabel: 'trust AI answers over page-1 links',
  },
  {
    num: '02',
    tag: 'ORGANIC EQUITY',
    headline: "Organic isn't going anywhere.",
    body: 'Paid stops the moment the budget does. Organic search still carries more than half the internet’s traffic.',
    stat: '53%',
    statLabel: 'of all website traffic is organic, globally',
  },
  {
    num: '03',
    tag: 'INTEGRATION',
    headline: 'Services compound together.',
    body: "GEO, AEO, SEO and content share the same infrastructure. Run them as one system, not four vendors.",
    stat: '3–5×',
    statLabel: 'the return vs. single-service engagements',
  },
  {
    num: '04',
    tag: 'OWNERSHIP',
    headline: 'You own what we build.',
    body: 'No vendor lock-in, no black-box handoff. Every technical build ships with full source and full IP.',
    stat: '100%',
    statLabel: 'IP ownership transferred to clients',
  },
];

export default function WhyItMatters() {
  return (
    <section style={{ background: 'var(--white)', padding: '90px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: 980 }}>
        <div className="mx-auto text-center mb-14" style={{ maxWidth: 680 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
            Why It Matters
          </div>
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            Four numbers that explain the shift.
          </h2>
        </div>

        <div>
          {rows.map((r, i) => (
            <div
              key={r.num}
              className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-10"
              style={{
                padding: '32px 0',
                borderTop: i === 0 ? '1px solid var(--border-clr)' : undefined,
                borderBottom: '1px solid var(--border-clr)',
              }}
            >
              <div className="flex-shrink-0" style={{ width: 84 }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)' }}>{r.num}</span>
                <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--purple-dark)', marginTop: 4 }}>{r.tag}</div>
              </div>

              <div className="flex-1">
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 21, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>
                  {r.headline}
                </h3>
                <p style={{ fontSize: 14.5, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0, maxWidth: 480 }}>
                  {r.body}
                </p>
              </div>

              <div className="flex-shrink-0 text-left md:text-right" style={{ minWidth: 150 }}>
                <div style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(34px, 4vw, 46px)', fontWeight: 600, color: 'var(--purple-dark)', lineHeight: 1 }}>
                  {r.stat}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>{r.statLabel}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
