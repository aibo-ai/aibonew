import SectionLabel from "./SectionLabel";

const mktRows = [
  { num: '156%', label: 'Avg. conversion rate improvement' },
  { num: '\u221251%', label: 'Customer acquisition cost reduction' },
  { num: '63%', label: 'Amazon + Nykaa ranking improvement' },
  { num: '92%', label: 'Growth in repeat purchase rate' },
  { num: '78%', label: 'Customer lifetime value improvement' },
];

const techRows = [
  { num: '<10w', label: 'Time from brief to production launch' },
  { num: '\u221270%', label: 'Reduction in manual operational effort' },
  { num: '3\u00d7', label: 'Increase in sales team capacity' },
  { num: '96%', label: 'Lead scoring accuracy' },
  { num: '8\u00d7', label: 'Inventory management speed improvement' },
];

function ResultPanel({ title, rows, dotColor, numColor }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        border: '1px solid var(--border-clr)',
        borderRadius: 12,
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center gap-2.5"
        style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--border-clr)',
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: dotColor,
            flexShrink: 0,
          }}
        />
        <span
          style={{
            fontSize: 13,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
            color: 'var(--text-secondary)',
          }}
        >
          {title}
        </span>
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          className="flex items-center gap-5"
          style={{
            padding: '14px 28px',
            borderBottom: i < rows.length - 1 ? '1px solid var(--off-white)' : 'none',
          }}
        >
          <span
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 28,
              fontWeight: 600,
              color: numColor,
              minWidth: 80,
              flexShrink: 0,
            }}
          >
            {r.num}
          </span>
          <span style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-secondary)' }}>
            {r.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function Results() {
  return (
    <section
      id="results"
      data-testid="results-section"
      style={{ background: 'var(--off-white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1000 }}>
        {/* Intro */}
        <div className="text-center mx-auto mb-10" style={{ maxWidth: 500 }}>
          <SectionLabel text="Proven Results" centered />
          <h2
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-1px',
              color: 'var(--text-primary)',
              margin: '0 0 10px',
              lineHeight: 1.15,
            }}
          >
            Numbers that speak <em>louder</em> than promises.
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Across marketing and technology engagements, MyAibo delivers measurable outcomes.
          </p>
        </div>

        {/* Dual panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <ResultPanel
            title="Marketing Outcomes"
            rows={mktRows}
            dotColor="var(--purple)"
            numColor="var(--purple-dark)"
          />
          <ResultPanel
            title="Technology Outcomes"
            rows={techRows}
            dotColor="var(--amber)"
            numColor="var(--amber)"
          />
        </div>
      </div>
    </section>
  );
}
