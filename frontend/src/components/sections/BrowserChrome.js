// Browser-window chrome wrapper for hero product mockups — traffic-light
// dots, a URL bar, and an optional status badge. Used to frame realistic
// "here's what this looks like in the wild" visuals (a Quora thread, a
// Wikipedia article, an AI chat answer) inside a hero section.
export default function BrowserChrome({ url, badge, children }) {
  return (
    <div
      style={{
        background: 'var(--white)',
        borderRadius: 14,
        border: '1px solid var(--border-clr)',
        boxShadow: '0 20px 60px rgba(15,10,30,0.18)',
        overflow: 'hidden',
      }}
    >
      <div
        className="flex items-center gap-2"
        style={{ padding: '12px 16px', borderBottom: '1px solid var(--border-clr)', background: 'var(--off-white)' }}
      >
        <div className="flex items-center gap-1.5">
          {['#ED6A5E', '#F4BF4F', '#61C454'].map((c) => (
            <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }} />
          ))}
        </div>
        <div
          className="flex-1 text-center"
          style={{
            fontFamily: 'monospace',
            fontSize: 12,
            color: 'var(--text-muted)',
            background: 'var(--white)',
            border: '1px solid var(--border-clr)',
            borderRadius: 6,
            padding: '4px 10px',
            margin: '0 8px',
          }}
        >
          {url}
        </div>
        {badge && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--purple-dark)',
              background: 'var(--purple-light)',
              border: '1px solid rgba(124,59,237,0.3)',
              borderRadius: 5,
              padding: '3px 7px',
              flexShrink: 0,
            }}
          >
            {badge}
          </span>
        )}
      </div>
      <div style={{ padding: 20 }}>{children}</div>
    </div>
  );
}
