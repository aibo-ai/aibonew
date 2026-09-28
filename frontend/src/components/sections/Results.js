import SectionLabel from './SectionLabel';
import PostIt from './PostIt';

const marketing = [
  { stat: '+180%', text: 'AI citation rate (GEO, 6 months)' },
  { stat: '156%', text: 'website conversion rate increase' },
  { stat: '−63%', text: 'reduction in customer acquisition cost' },
  { stat: '92%', text: 'growth in repeat purchase rate' },
];

const technical = [
  { stat: '80%', text: 'data workflows automated' },
  { stat: '5×', text: 'efficiency gains from automation' },
  { stat: '4–8 wks', text: 'to production-ready MVP' },
  { stat: '100%', text: 'IP ownership transferred to client' },
];

export default function Results() {
  return (
    <section style={{ padding: '0 32px 112px' }}>
      <div className="relative mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 40 }}>
        <div>
          <SectionLabel text="Proven Results" />
          <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px, 4vw, 52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
            Results across <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>both practices.</em>
          </h2>
        </div>

        <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 460px), 1fr))', gap: 16 }}>
          <div className="flex flex-col" style={{ background: 'var(--purple)', color: '#fff', borderRadius: 20, padding: 34, gap: 24 }}>
            <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', color: 'rgba(255,255,255,.75)' }}>MARKETING RESULTS</div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '26px 18px' }}>
              {marketing.map((m) => (
                <div key={m.text}>
                  <div style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, lineHeight: 1 }}>{m.stat}</div>
                  <div style={{ marginTop: 6, fontFamily: "'DM Sans'", fontSize: 14, color: 'rgba(255,255,255,.8)' }}>{m.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col" style={{ background: 'var(--dark-mid)', color: '#fff', borderRadius: 20, padding: 34, gap: 24 }}>
            <div style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 11, letterSpacing: '0.12em', color: '#A07AF0' }}>TECHNICAL RESULTS</div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '26px 18px' }}>
              {technical.map((t, i) => {
                const amberStat = i === 1 || i === 3;
                return (
                  <div key={t.text}>
                    <div style={{ fontFamily: "'Fraunces', serif", fontSize: 48, fontWeight: 600, lineHeight: 1, color: amberStat ? 'var(--acc)' : '#C9B2FA' }}>{t.stat}</div>
                    <div style={{ marginTop: 6, fontFamily: "'DM Sans'", fontSize: 14, color: 'rgba(255,255,255,.7)' }}>{t.text}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden md:block" style={{ position: 'absolute', right: -10, bottom: -186, zIndex: 5 }}>
          <PostIt rotate={-3} tapeRotate={2} width={250} quote author="Bala S, CEO, vPersonalize">
            "52% conversion increase in three months? That's not just growth."
          </PostIt>
        </div>
      </div>
    </section>
  );
}
