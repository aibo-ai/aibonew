import SectionLabel from "./SectionLabel";

const steps = [
  {
    num: '01',
    title: 'Discovery',
    body: 'Free strategy session. We deep-dive into your challenges and identify where marketing and technology intersect for highest impact.',
  },
  {
    num: '02',
    title: 'Blueprint',
    body: 'We design the framework \u2014 whether that\u2019s a content authority plan, a GEO strategy, an AI automation roadmap, or a product architecture.',
  },
  {
    num: '03',
    title: 'Build',
    body: 'Agile execution with constant feedback loops. Two-week sprints for tech. Monthly content cycles for marketing. You\u2019re always in the loop.',
  },
  {
    num: '04',
    title: 'Scale',
    body: 'Rigorous QA, smooth deployment, post-launch monitoring. The work compounds \u2014 each piece builds on the last, amplifying the whole.',
  },
];

export default function Process() {
  return (
    <section
      id="process"
      data-testid="process-section"
      style={{ background: 'var(--off-white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1000 }}>
        {/* Intro */}
        <div className="text-center mx-auto mb-14" style={{ maxWidth: 500 }}>
          <SectionLabel text="How We Work" centered />
          <h2
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-1px',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            From brief to results &mdash; a process built around <em>clarity.</em>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute"
            style={{
              top: 22,
              left: '12.5%',
              right: '12.5%',
              height: 1,
              background: 'linear-gradient(to right, var(--purple), rgba(124,59,237,0.12))',
            }}
          />

          {steps.map((s) => (
            <div
              key={s.num}
              data-testid={`process-step-${s.num}`}
              className="flex flex-col items-center text-center relative z-10"
            >
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'var(--dark)',
                  color: '#A07AF0',
                  fontFamily: "'Fraunces', serif",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 16,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 8px',
                }}
              >
                {s.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
