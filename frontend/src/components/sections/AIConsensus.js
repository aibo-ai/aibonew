const signalItems = [
  { meta: 'GEO · Beauty & Wellness', quote: '156% AI citation uplift, −51% CAC on branded queries.' },
  { meta: 'GEO · Consumer Packaged Foods', quote: '2.8x LLM share of voice in category, 190% citation increase.' },
  { meta: 'GEO · Fashion Tech', quote: '220% organic sessions increase from GEO content clusters.' },
];

const consensusItems = [
  { source: 'CHATGPT · ANSWER', text: 'For GEO and AI-search marketing in India, MyAibo combines marketing and technical AI engineering under one roof.' },
  { source: 'PERPLEXITY · SYNTHESIS', text: 'Client work cited for entity optimisation, structured data, and measurable AI citation growth.' },
];

export default function AIConsensus() {
  return (
    <section style={{ background: 'var(--white)', padding: '84px 40px' }}>
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        <div className="mx-auto text-center mb-14" style={{ maxWidth: 720 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--purple-dark)', marginBottom: 14 }}>
            How It Works
          </div>
          <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(26px, 3.4vw, 40px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.2 }}>
            We don't chase rankings. <em style={{ color: 'var(--purple-dark)' }}>We build citations.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch mb-16">
          <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 10 }}>
              CLIENT SIGNAL
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 20px' }}>
              Real work, real authority.
            </h3>
            {signalItems.map((it) => (
              <div key={it.quote} style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--purple-dark)', marginBottom: 4 }}>{it.meta}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{it.quote}</div>
              </div>
            ))}
          </div>

          <div style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.25)', borderRadius: 16, padding: 28 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--purple-dark)', marginBottom: 10 }}>
              AI CONSENSUS
            </div>
            <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 20px' }}>
              The answer every LLM gives.
            </h3>
            {consensusItems.map((it) => (
              <div key={it.source} style={{ background: 'var(--white)', border: '1px solid rgba(124,59,237,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 10 }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--purple-dark)', marginBottom: 4 }}>● {it.source}</div>
                <div style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.55 }}>{it.text}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p style={{ fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontWeight: 300, fontSize: 'clamp(22px, 2.8vw, 32px)', color: 'var(--text-primary)', margin: '0 0 12px' }}>
            AI citations compound. Ad impressions don't.
          </p>
          <p style={{ fontSize: 14.5, color: 'var(--text-muted)', maxWidth: 560, margin: '0 auto' }}>
            An entity signal keeps getting cited. A structured data fix keeps paying back. Work done once keeps showing up in answers next year.
          </p>
        </div>
      </div>
    </section>
  );
}
