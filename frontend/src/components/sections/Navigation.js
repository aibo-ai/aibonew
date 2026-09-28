import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { trackBookingClick } from '@/lib/analytics';
import { pillars } from './navigation/navData';

const TAGS = {
  geo: 'GEO', aeo: 'AEO', seo: 'SEO', 'content-marketing': 'CONTENT',
  'ai-automations': 'AI AUTOMATION', 'full-stack': 'FULL STACK',
};

function SolutionsDropdown({ onNavigate }) {
  const [openPillar, setOpenPillar] = useState(null);

  return (
    <div
      style={{
        width: 'min(460px, calc(100vw - 64px))',
        maxHeight: 'calc(100vh - 90px)',
        overflow: 'auto',
        background: '#fff',
        border: '1px solid var(--border-clr)',
        borderRadius: 14,
        boxShadow: '0 30px 60px -20px rgba(15,10,30,.3)',
        padding: 10,
      }}
    >
      {pillars.map((p) => {
        const isOpen = openPillar === p.slug;
        return (
          <div key={p.slug} style={{ borderRadius: 10, background: isOpen ? 'var(--off-white)' : 'transparent' }}>
            <div className="flex items-center" style={{ gap: 6 }}>
              <Link
                to={`/solutions/${p.slug}`}
                onClick={onNavigate}
                className="flex-1 flex items-center"
                style={{ minWidth: 0, gap: 14, padding: 12, textDecoration: 'none', color: 'var(--text-primary)' }}
              >
                <span style={{ fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 17, lineHeight: 1.2 }}>{p.name}</span>
                <span
                  className="flex-shrink-0"
                  style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 11, letterSpacing: '0.06em', padding: '5px 8px', borderRadius: 6, background: 'var(--purple-light)', color: 'var(--purple-dark)' }}
                >
                  {TAGS[p.slug] || p.short}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setOpenPillar(isOpen ? null : p.slug)}
                aria-label={`Show ${p.short} services`}
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  marginRight: 4,
                  borderRadius: 8,
                  border: 0,
                  background: isOpen ? '#EDE5FC' : 'transparent',
                  color: isOpen ? '#5A24C7' : 'var(--text-muted)',
                  cursor: 'pointer',
                  fontSize: 20,
                  transition: 'transform .2s',
                  transform: `rotate(${isOpen ? 90 : 0}deg)`,
                }}
              >
                &rsaquo;
              </button>
            </div>
            {isOpen && (
              <div className="flex flex-col" style={{ gap: 2, margin: '0 12px 0 24px', padding: '2px 0 12px 12px', borderLeft: '2px solid #DDD0F7' }}>
                {p.clusters.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/solutions/${p.slug}/${c.slug}`}
                    onClick={onNavigate}
                    style={{ textAlign: 'left', padding: '8px 12px', borderRadius: 6, color: 'var(--text-secondary)', textDecoration: 'none', fontFamily: "'DM Sans'", fontSize: 14, lineHeight: 1.35 }}
                  >
                    {c.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div style={{ margin: '8px 6px 4px', padding: '12px 6px 4px', borderTop: '1px solid var(--border-clr)', fontFamily: "'DM Sans'", fontSize: 12.5, lineHeight: 1.5, color: 'var(--text-muted)' }}>
        Click a pillar name to visit its overview page, or tap the arrow to see its deep-dive services.
      </div>
    </div>
  );
}

const NAV_LINKS = [
  { label: 'Case Studies', to: '/case-studies' },
  { label: 'Insights', to: '/blogs', wide: true },
  { label: 'About Us', to: '/about', wide: true },
  { label: 'Contact Us', to: '/contact' },
];

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    function onClick(e) {
      if (rootRef.current && !rootRef.current.contains(e.target)) setMenuOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const closeAll = () => { setMenuOpen(false); setMobileOpen(false); };

  return (
    <header
      ref={rootRef}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'rgba(247,245,252,.86)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border-clr)',
      }}
    >
      <div className="mx-auto flex items-center" style={{ maxWidth: 1240, padding: '0 32px', height: 68, gap: 24 }}>
        <Link
          to="/"
          onClick={closeAll}
          aria-label="MyAibo home"
          style={{ flexShrink: 0, width: 104, height: 34, overflow: 'hidden', position: 'relative', display: 'block' }}
        >
          <img src="/myaibo-logo.png" alt="MyAibo" style={{ position: 'absolute', height: 120, width: 120, top: -43, left: -10 }} />
        </Link>

        <nav className="hidden md:flex items-center flex-1" style={{ gap: 2, minWidth: 0, overflow: 'hidden', whiteSpace: 'nowrap' }}>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setMenuOpen((v) => !v); }}
            className="flex items-center flex-shrink-0"
            style={{ gap: 6, whiteSpace: 'nowrap', height: 36, padding: '0 14px', borderRadius: 8, border: 0, background: menuOpen ? '#EDE5FC' : 'transparent', color: 'var(--text-primary)', fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 14.5, cursor: 'pointer' }}
          >
            Solutions <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{menuOpen ? '▲' : '▼'}</span>
          </button>
          {NAV_LINKS.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              className={l.wide ? 'hidden xl:flex' : 'flex'}
              style={{ height: 36, padding: '0 14px', alignItems: 'center', flexShrink: 0, whiteSpace: 'nowrap', textDecoration: 'none', fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 14.5, color: 'var(--text-secondary)' }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex flex-shrink-0 items-center"
          style={{ whiteSpace: 'nowrap', height: 42, padding: '0 20px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}
          onClick={() => trackBookingClick({ page: 'nav', placement: 'header' })}
        >
          Book Free Strategy Session
        </a>

        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: 8, marginLeft: 'auto' }}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <div className="hidden md:block absolute" style={{ top: 62, left: 0, right: 0, pointerEvents: 'none' }}>
          <div className="mx-auto" style={{ maxWidth: 1240, padding: '0 32px' }}>
            <div style={{ marginLeft: 128, pointerEvents: 'auto' }}>
              <SolutionsDropdown onNavigate={closeAll} />
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div className="md:hidden" style={{ borderTop: '1px solid var(--border-clr)', background: '#fff', padding: 16 }}>
          <SolutionsDropdown onNavigate={closeAll} />
          <div className="flex flex-col" style={{ gap: 2, marginTop: 12 }}>
            {NAV_LINKS.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                onClick={closeAll}
                style={{ padding: '10px 12px', textDecoration: 'none', fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 15, color: 'var(--text-primary)' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center"
            style={{ marginTop: 16, height: 44, borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 14.5, textDecoration: 'none' }}
            onClick={() => { trackBookingClick({ page: 'nav', placement: 'mobile_header' }); }}
          >
            Book Free Strategy Session
          </a>
        </div>
      )}
    </header>
  );
}
