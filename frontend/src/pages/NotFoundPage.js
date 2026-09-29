import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const LINKS = [
  { label: 'GEO services', to: '/solutions/geo' },
  { label: 'AI automations', to: '/solutions/ai-automations' },
  { label: 'Blog', to: '/blogs' },
  { label: 'Case studies', to: '/case-studies' },
];

export default function NotFoundPage() {
  return (
    <main className="hero-dotgrid">
      <Helmet>
        <title>Page not found | MyAibo</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="mx-auto flex flex-col items-center" style={{ maxWidth: 680, padding: '120px 32px 140px', textAlign: 'center', gap: 20 }}>
        <span style={{ padding: '4px 10px', fontFamily: "'DM Sans'", fontSize: 10.5, fontWeight: 700, letterSpacing: '0.1em', borderRadius: 5, background: 'var(--acc-soft)', color: 'var(--acc-ink)' }}>404</span>
        <h1 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(38px,5vw,60px)', lineHeight: 1.1, letterSpacing: '-1.8px' }}>
          This page{' '}
          <span style={{ background: 'var(--acc)', color: 'var(--dark)', padding: '0 12px 4px', borderRadius: 10, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>doesn&rsquo;t exist.</span>
        </h1>
        <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
          The link may be outdated, or the page may have moved.
        </p>
        <div className="flex flex-wrap justify-center" style={{ gap: 10, marginTop: 4 }}>
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} style={{ padding: '10px 16px', borderRadius: 8, background: '#fff', border: '1px solid var(--border-clr)', color: 'var(--text-primary)', fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 14.5, textDecoration: 'none' }}>
              {l.label}
            </Link>
          ))}
        </div>
        <Link to="/" style={{ marginTop: 8, padding: '14px 26px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
          Back to home
        </Link>
      </div>
    </main>
  );
}
