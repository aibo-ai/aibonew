import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { marketingServices, technicalServices } from './navData';

const dropdownItemStyle = {
  display: 'block',
  padding: '10px 12px',
  fontSize: 14,
  fontWeight: 400,
  color: 'var(--text-primary)',
  textDecoration: 'none',
  borderRadius: 6,
  transition: 'background 0.2s',
};

const dropdownHeadingStyle = {
  fontSize: 12,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--purple-dark)',
  marginBottom: 12,
  paddingBottom: 8,
  borderBottom: '1px solid var(--border-clr)',
};

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

function DropdownItem({ to, onSelect, children }) {
  return (
    <Link
      to={to}
      onClick={onSelect}
      style={dropdownItemStyle}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      {children}
    </Link>
  );
}

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
      {/* Solutions Dropdown */}
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
          <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>

        {solutionsOpen && (
          <div className="absolute top-full left-0" style={{ paddingTop: 8, zIndex: 1100 }}>
            <div
              style={{
                background: 'var(--white)',
                borderRadius: 12,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                minWidth: 520,
                border: '1px solid var(--border-clr)',
                padding: '20px',
              }}
            >
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div style={dropdownHeadingStyle}>Marketing Services</div>
                  {marketingServices.map((service) => (
                    <DropdownItem key={service.slug} to={`/solutions/${service.slug}`} onSelect={closeAll}>
                      {service.name}
                    </DropdownItem>
                  ))}
                </div>
                <div>
                  <div style={dropdownHeadingStyle}>Technical Services</div>
                  {technicalServices.map((service) => (
                    <DropdownItem key={service.slug} to={`/solutions/${service.slug}`} onSelect={closeAll}>
                      {service.name}
                    </DropdownItem>
                  ))}
                </div>
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
          <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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
              <DropdownItem to="/blogs" onSelect={closeAll}>Blogs</DropdownItem>
              <DropdownItem to="/case-studies" onSelect={closeAll}>Case Studies</DropdownItem>
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
