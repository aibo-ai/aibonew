import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight, ArrowRight } from 'lucide-react';
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

export default function DesktopNav() {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [activePillar, setActivePillar] = useState(pillars[0].slug);
  const solutionsRef = useRef(null);
  const resourcesRef = useRef(null);

  const closeAll = () => {
    setSolutionsOpen(false);
    setResourcesOpen(false);
  };

  useEffect(() => {
    // Reset active pillar every time the menu opens
    if (solutionsOpen) setActivePillar(pillars[0].slug);
  }, [solutionsOpen]);

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

  const active = pillars.find((p) => p.slug === activePillar) || pillars[0];

  return (
    <div className="hidden lg:flex items-center gap-8" style={{ flex: 1, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
      {/* Solutions master-detail mega-menu */}
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
              role="menu"
              aria-label="Solutions"
              style={{
                background: 'var(--white)',
                borderRadius: 12,
                boxShadow: '0 12px 40px rgba(15,10,30,0.18)',
                border: '1px solid var(--border-clr)',
                overflow: 'hidden',
                display: 'grid',
                gridTemplateColumns: '300px 320px',
                width: 620,
                minHeight: 320,
              }}
            >
              {/* Left: 6 pillar rows */}
              <div
                style={{
                  background: 'var(--off-white)',
                  borderRight: '1px solid var(--border-clr)',
                  padding: '10px 10px',
                }}
              >
                {pillars.map((pillar) => {
                  const isActive = pillar.slug === activePillar;
                  return (
                    <button
                      key={pillar.slug}
                      type="button"
                      role="menuitem"
                      title={`View ${pillar.name} overview`}
                      aria-current={isActive ? 'true' : undefined}
                      onMouseEnter={() => setActivePillar(pillar.slug)}
                      onFocus={() => setActivePillar(pillar.slug)}
                      onClick={() => {
                        // Clicking navigates to the pillar page
                        closeAll();
                        window.location.href = `/solutions/${pillar.slug}`;
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        width: '100%',
                        background: isActive ? 'var(--white)' : 'transparent',
                        border: 'none',
                        borderRadius: 8,
                        padding: '9px 10px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        fontFamily: 'inherit',
                        boxShadow: isActive ? '0 1px 4px rgba(15,10,30,0.06)' : 'none',
                        transition: 'background 0.15s',
                      }}
                    >
                      <span
                        style={{
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          background: isActive ? 'var(--purple)' : 'var(--purple-light)',
                          color: isActive ? '#fff' : 'var(--purple-dark)',
                          padding: '3px 5px',
                          borderRadius: 4,
                          flexShrink: 0,
                          minWidth: 36,
                          textAlign: 'center',
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        {pillar.short}
                      </span>
                      <span
                        style={{
                          flex: 1,
                          fontFamily: "'Fraunces', serif",
                          fontSize: 13.5,
                          fontWeight: 600,
                          color: 'var(--text-primary)',
                          lineHeight: 1.25,
                          minWidth: 0,
                        }}
                      >
                        {pillar.name}
                      </span>
                      <ChevronRight
                        size={14}
                        style={{
                          color: isActive ? 'var(--purple-dark)' : 'rgba(74,69,104,0.4)',
                          flexShrink: 0,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Right: cluster links for the active pillar */}
              <div
                style={{
                  padding: '16px 18px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--purple-dark)',
                    marginBottom: 10,
                  }}
                >
                  {active.short} Deep-Dive Services
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 1 }}>
                  {active.clusters.map((c) => (
                    <Link
                      key={c.slug}
                      to={`/solutions/${active.slug}/${c.slug}`}
                      onClick={closeAll}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 8,
                        padding: '8px 10px',
                        fontSize: 13,
                        fontWeight: 400,
                        color: 'var(--text-secondary)',
                        textDecoration: 'none',
                        borderRadius: 6,
                        lineHeight: 1.4,
                        transition: 'background 0.15s, color 0.15s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--purple-light)';
                        e.currentTarget.style.color = 'var(--purple-dark)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                      }}
                    >
                      <span>{c.name}</span>
                      <ArrowRight size={12} style={{ opacity: 0.55, flexShrink: 0 }} />
                    </Link>
                  ))}
                </div>

                <Link
                  to={`/solutions/${active.slug}`}
                  onClick={closeAll}
                  style={{
                    marginTop: 12,
                    paddingTop: 12,
                    borderTop: '1px solid var(--border-clr)',
                    fontSize: 12,
                    fontWeight: 600,
                    color: 'var(--purple-dark)',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  View {active.name} overview <ArrowRight size={12} />
                </Link>
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
