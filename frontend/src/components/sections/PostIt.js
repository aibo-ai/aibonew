// The signature sticky-note component from the Violet + Amber redesign:
// a rotated "post-it" with a taped-on strip, set in Caveat (handwriting
// font). At most 2 per page, per the design handoff.
//
// Usage:
//   <PostIt rotate={-4}><>62% of users trust <u>this answer</u> over page-1 links ↗</></PostIt>
//   <PostIt rotate={-3} big="+340%" tapeRotate={2}>Avg. GEO client, 6mo</PostIt>
//   <PostIt as="figure" quote author="Bala S, CEO, vPersonalize">"…"</PostIt>
export default function PostIt({
  children,
  big,
  quote,
  author,
  rotate = -4,
  tapeRotate = 3,
  width,
  style,
  className,
}) {
  const Tag = quote ? 'figure' : 'div';
  return (
    <Tag
      className={className}
      style={{
        position: 'relative',
        padding: quote ? '40px 32px 28px' : '24px 18px 18px',
        background: 'var(--acc-soft)',
        transform: `rotate(${rotate}deg)`,
        boxShadow: '0 18px 30px -12px rgba(15,10,30,.35), 0 2px 4px rgba(15,10,30,.06)',
        width,
        margin: quote ? '0 12px' : 0,
        ...style,
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          width: quote ? 110 : 78,
          height: quote ? 24 : 20,
          marginLeft: quote ? -55 : -39,
          background: 'rgba(255,255,255,.65)',
          border: '1px solid rgba(15,10,30,.06)',
          transform: `rotate(${tapeRotate}deg)`,
        }}
      />
      {big && (
        <div style={{ font: "700 clamp(40px,6vw,60px)/1 'Caveat',cursive", color: 'var(--acc-ink)' }}>{big}</div>
      )}
      {quote ? (
        <>
          <blockquote style={{ margin: 0, font: "600 clamp(22px,2.3vw,28px)/1.18 'Caveat',cursive", color: 'var(--text-primary)' }}>
            {children}
          </blockquote>
          {author && (
            <figcaption className="flex items-center gap-3" style={{ marginTop: 18 }}>
              <span
                className="flex items-center justify-center"
                style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--dark)', color: '#fff', fontFamily: "'DM Sans'", fontSize: 12, fontWeight: 600, flexShrink: 0 }}
              >
                {author.split(',')[0].trim().slice(0, 2).toUpperCase()}
              </span>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-secondary)' }}>{author}</span>
            </figcaption>
          )}
        </>
      ) : (
        <div style={{ marginTop: big ? 6 : 0, font: "600 22px/1.12 'Caveat',cursive", color: 'var(--text-primary)' }}>{children}</div>
      )}
    </Tag>
  );
}
