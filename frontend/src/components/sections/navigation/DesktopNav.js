import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { pillars } from './navData';

const triggerStyle = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  color: 'rgba(255,255,255,0.9)',
  fontSize: 15,
  fontWeight: 500,
};

const linkStyle = {
  color: 'rgba(255,255,255,0.9)',
  fontSize: 15,
  fontWeight: 500,
  textDecoration: 'none',
};

const pillarHeadingStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  fontFamily: "'Fraunces', serif",
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--text-primary)',
  textDecoration: 'none',
  paddingBottom: 8,
  marginBottom: 8,
  borderBottom: '1px solid var(--border-clr)',
};

const clusterLinkStyle = {
  display: 'block',
  padding: '6px 8px',
  fontSize: 12.5,
  fontWeight: 400,
  color: 'var(--text-secondary)',
  textDecoration: 'none',
  borderRadius: 4,
  lineHeight: 1.4,
  transition: 'background 0.15s, color 0.15s',
};

export default function DesktopNav() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const solutionsRef = useRef(null);
  const resourcesRef = useRef(null);

  const closeAll = () => {
    setSolutionsOpen(false);
    setResourcesOpen(false);
  };

  useEffect(() => {
    const handlePointerDown = (e) => {
      const el = e.target;
      if (solutionsRef.current?.contains(el) || resourcesRef.current?.contains(el)) return;
      closeAll();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="hidden lg:flex items-center gap-8" style={{ flex: 1, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
      {/* Solutions Mega-Menu */}
      <div className="relative" ref={solutionsRef}>
        <button
          type="button"
          className="nav-link inline-flex items-center gap-1"
          aria-expanded={solutionsOpen}
          aria-haspopup="true"
          data-testid="desktop-nav-solutions-trigger"
          onClick={() => {
            setSolutionsOpen((v) => {
              const next = !v;
              if (next) setResourcesOpen(false);
              return next;
            });
          }}
          style={triggerStyle}
        >
          Solutions
          <ChevronDown
            size={16}
            style={{ transition: 'transform 0.2s', transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {solutionsOpen && (
          <div
            style={{
              position: 'fixed',
              top: 68,
              right: 24,
              zIndex: 1100,
              paddingTop: 8,
            }}
          >
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 12,
                boxShadow: '0 12px 40px rgba(15,10,30,0.18)',
                border: '1px solid var(--border-clr)',
                padding: '22px 24px 20px',
                width: 'min(980px, calc(100vw - 48px))',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 20,
                }}
              >
                {pillars.map((pillar) => (
                  <div key={pillar.slug} style={{ minWidth: 0 }}>
                    <Link
                      to={`/solutions/${pillar.slug}`}
                      onClick={closeAll}
                      style={pillarHeadingStyle}
                    >
                      <span
                        style={{
                          background: 'var(--purple-light)',
                          color: 'var(--purple-dark)',
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          padding: '2px 6px',
                          borderRadius: 4,
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {pillar.short}
                      </span>
                      <span style={{ flex: 1 }}>{pillar.name}</span>
                      <ArrowRight size={12} style={{ color: 'var(--purple-dark)', opacity: 0.6 }} />
                    </Link>
                    <div style={{ marginTop: 2 }}>
                      {pillar.clusters.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/solutions/${pillar.slug}/${c.slug}`}
                          onClick={closeAll}
                          style={clusterLinkStyle}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--purple-light)';
                            e.currentTarget.style.color = 'var(--purple-dark)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--text-secondary)';
                          }}
                        >
                          {c.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resources Dropdown */}
      <div className="relative" ref={resourcesRef}>
        <button
          type="button"
          className="nav-link inline-flex items-center gap-1"
          aria-expanded={resourcesOpen}
          aria-haspopup="true"
          data-testid="desktop-nav-resources-trigger"
          onClick={() => {
            setResourcesOpen((v) => {
              const next = !v;
              if (next) setSolutionsOpen(false);
              return next;
            });
          }}
          style={triggerStyle}
        >
          Resources
          <ChevronDown
            size={16}
            style={{ transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {resourcesOpen && (
          <div className="absolute top-full left-0" style={{ paddingTop: 8, zIndex: 1100 }}>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: 200,
                border: '1px solid var(--border-clr)',
                padding: '12px',
              }}
            >
              <Link
                to="/blogs"
                onClick={closeAll}
                style={{ display: 'block', padding: '10px 12px', fontSize: 14, fontWeight: 400, color: 'var(--text-primary)', textDecoration: 'none', borderRadius: 6 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Blogs
              </Link>
              <Link
                to="/case-studies"
                onClick={closeAll}
                style={{ display: 'block', padding: '10px 12px', fontSize: 14, fontWeight: 400, color: 'var(--text-primary)', textDecoration: 'none', borderRadius: 6 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                Case Studies
              </Link>
            </div>
          </div>
        )}
      </div>

      <Link to="/about" className="nav-link" style={linkStyle} data-testid="desktop-nav-about-link">About Us</Link>
      <Link to="/contact" className="nav-link" style={linkStyle} data-testid="desktop-nav-contact-link">Contact Us</Link>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-purple inline-flex items-center gap-2"
        data-testid="desktop-nav-book-button"
        style={{
          padding: '12px 24px',
          fontSize: 15,
          fontWeight: 500,
          borderRadius: 8,
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
      >
        Book Free Strategy Session
      </a>
    </div>
  );
}
