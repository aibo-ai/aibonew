import { useEffect, useRef, useState, useCallback } from 'react';
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
  const [expandedPillar, setExpandedPillar] = useState(null);
  const solutionsRef = useRef(null);
  const resourcesRef = useRef(null);
  const closeTimerRef = useRef(null);

  const cancelClose = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const openSolutions = () => {
    cancelClose();
    setSolutionsOpen(true);
    setResourcesOpen(false);
  };

  const scheduleCloseSolutions = () => {
    cancelClose();
    closeTimerRef.current = setTimeout(() => {
      setSolutionsOpen(false);
      setExpandedPillar(null);
    }, 180);
  };

  const closeAll = useCallback(() => {
    cancelClose();
    setSolutionsOpen(false);
    setResourcesOpen(false);
    setExpandedPillar(null);
  },[]);

  useEffect(() => {
    // Every time the menu re-opens, start collapsed (no right column)
    if (solutionsOpen) setExpandedPillar(null);
  }, [solutionsOpen]);

  useEffect(() => {
    const handlePointerDown = (e) => {
      const el = e.target;
      if (solutionsRef.current?.contains(el) || resourcesRef.current?.contains(el)) return;
      closeAll();
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [closeAll]);

  
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  useEffect(() => () => cancelClose(), []);

  const active = expandedPillar ? pillars.find((p) => p.slug === expandedPillar) : null;

  return (
    <div className="hidden lg:flex items-center gap-8" style={{ flex: 1, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
      {/* Solutions master-detail mega-menu */}
      <div
        className="relative"
        ref={solutionsRef}
        onMouseEnter={openSolutions}
        onMouseLeave={scheduleCloseSolutions}
      >
        <button
          type="button"
          className="nav-link inline-flex items-center gap-1"
          aria-expanded={solutionsOpen}
          aria-haspopup="true"
          data-testid="desktop-nav-solutions-trigger"
          onClick={() => {
            // Click support for touch & keyboard users
            if (solutionsOpen) {
              closeAll();
            } else {
              openSolutions();
            }
          }}
          onFocus={openSolutions}
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
              position: 'absolute',
              top: '100%',
              right: 0,
              zIndex: 1100,
              paddingTop: 12,
            }}
            onMouseEnter={openSolutions}
            onMouseLeave={scheduleCloseSolutions}
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
                gridTemplateColumns: active ? '300px 320px' : '300px',
                width: active ? 620 : 300,
                minHeight: 288,
                transition: 'width 220ms ease, grid-template-columns 220ms ease',
              }}
            >
              {/* Left: 6 pillar rows */}
              <div
                style={{
                  background: 'var(--off-white)',
                  borderRight: active ? '1px solid var(--border-clr)' : 'none',
                  padding: '10px 10px',
                }}
              >
                {pillars.map((pillar) => {
                  const isActive = pillar.slug === expandedPillar;
                  const toggleExpand = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setExpandedPillar((cur) => (cur === pillar.slug ? null : pillar.slug));
                  };
                  return (
                    <div
                      key={pillar.slug}
                      role="menuitem"
                      aria-current={isActive ? 'true' : undefined}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        width: '100%',
                        background: isActive ? 'var(--white)' : 'transparent',
                        borderRadius: 8,
                        marginBottom: 2,
                        boxShadow: isActive ? '0 1px 4px rgba(15,10,30,0.06)' : 'none',
                        transition: 'background 0.15s',
                      }}
                    >
                      <Link
                        to={`/solutions/${pillar.slug}`}
                        onClick={closeAll}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '9px 4px 9px 10px',
                          textDecoration: 'none',
                          minWidth: 0,
                          borderRadius: 8,
                        }}
                        onMouseEnter={(e) => {
                          if (!isActive) e.currentTarget.parentElement.style.background = 'rgba(124,59,237,0.05)';
                        }}
                        onMouseLeave={(e) => {
                          if (!isActive) e.currentTarget.parentElement.style.background = 'transparent';
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
                      </Link>
                      <button
                        type="button"
                        onClick={toggleExpand}
                        aria-expanded={isActive}
                        aria-label={`${isActive ? 'Hide' : 'Show'} ${pillar.name} deep-dive services`}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          padding: '10px 10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          borderRadius: 6,
                          flexShrink: 0,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--purple-light)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <ChevronRight
                          size={14}
                          style={{
                            color: isActive ? 'var(--purple-dark)' : 'rgba(74,69,104,0.5)',
                            transition: 'transform 0.2s',
                            transform: isActive ? 'rotate(90deg)' : 'rotate(0deg)',
                          }}
                        />
                      </button>
                    </div>
                  );
                })}
                {!active && (
                  <div
                    style={{
                      marginTop: 10,
                      paddingTop: 10,
                      borderTop: '1px solid var(--border-clr)',
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                      padding: '10px 10px 0',
                    }}
                  >
                    Click a pillar name to visit its overview page, or tap the arrow to see its deep-dive services.
                  </div>
                )}
              </div>

              {/* Right: cluster links for the expanded pillar (only rendered when a pillar is expanded) */}
              {active && (
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
              )}
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
