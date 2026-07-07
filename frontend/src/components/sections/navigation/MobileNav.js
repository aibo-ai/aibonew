import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { pillars } from './navData';

const accordionTriggerStyle = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.85)',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  textAlign: 'left',
};

const pillarTriggerStyle = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.82)',
  fontSize: 13.5,
  fontWeight: 500,
  cursor: 'pointer',
  textAlign: 'left',
  padding: '6px 0',
  width: '100%',
};

const mobileLinkStyle = {
  color: 'rgba(255,255,255,0.75)',
  fontSize: 14,
  textDecoration: 'none',
  fontWeight: 400,
};

const clusterLinkStyle = {
  color: 'rgba(255,255,255,0.6)',
  fontSize: 12.5,
  textDecoration: 'none',
  fontWeight: 400,
  paddingLeft: 12,
};

const topLinkStyle = {
  color: 'rgba(255,255,255,0.85)',
  fontSize: 15,
  textDecoration: 'none',
  fontWeight: 500,
};

export default function MobileNav({ onCloseMenu }) {
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [expandedPillar, setExpandedPillar] = useState(null);

  const togglePillar = (slug) => {
    setExpandedPillar((cur) => (cur === slug ? null : slug));
  };

  return (
    <div
      className="lg:hidden"
      data-testid="mobile-nav-menu"
      style={{
        background: 'var(--dark)',
        borderTop: '1px solid rgba(124,59,237,0.2)',
        padding: '24px 32px',
        maxHeight: 'calc(100vh - 64px)',
        overflowY: 'auto',
      }}
    >
      {/* Solutions Accordion */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setSolutionsOpen(!solutionsOpen)}
          className="flex items-center justify-between w-full py-2.5"
          data-testid="mobile-nav-solutions-trigger"
          style={accordionTriggerStyle}
        >
          Solutions
          <ChevronDown
            size={16}
            style={{ transition: 'transform 0.2s', transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {solutionsOpen && (
          <div style={{ paddingLeft: 12, marginTop: 6 }}>
            {pillars.map((pillar) => {
              const expanded = expandedPillar === pillar.slug;
              return (
                <div
                  key={pillar.slug}
                  style={{
                    borderBottom: '1px solid rgba(255,255,255,0.06)',
                    padding: '4px 0',
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/solutions/${pillar.slug}`}
                      onClick={onCloseMenu}
                      style={{
                        ...mobileLinkStyle,
                        flex: 1,
                        padding: '8px 0',
                      }}
                    >
                      {pillar.name}
                    </Link>
                    <button
                      type="button"
                      onClick={() => togglePillar(pillar.slug)}
                      aria-expanded={expanded}
                      aria-label={`${expanded ? 'Collapse' : 'Expand'} ${pillar.name} cluster pages`}
                      style={{
                        ...pillarTriggerStyle,
                        width: 32,
                        textAlign: 'center',
                        padding: 4,
                      }}
                    >
                      <ChevronRight
                        size={14}
                        style={{
                          transition: 'transform 0.2s',
                          transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)',
                          color: 'var(--purple)',
                        }}
                      />
                    </button>
                  </div>
                  {expanded && (
                    <div style={{ paddingBottom: 8 }}>
                      {pillar.clusters.map((c) => (
                        <Link
                          key={c.slug}
                          to={`/solutions/${pillar.slug}/${c.slug}`}
                          onClick={onCloseMenu}
                          className="block py-1.5"
                          style={clusterLinkStyle}
                        >
                          &rsaquo; {c.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Resources Accordion */}
      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setResourcesOpen(!resourcesOpen)}
          className="flex items-center justify-between w-full py-2.5"
          data-testid="mobile-nav-resources-trigger"
          style={accordionTriggerStyle}
        >
          Resources
          <ChevronDown
            size={16}
            style={{ transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
          />
        </button>

        {resourcesOpen && (
          <div style={{ paddingLeft: 16, marginTop: 8 }}>
            <Link to="/blogs" onClick={onCloseMenu} className="block py-2" style={mobileLinkStyle}>Blogs</Link>
            <Link to="/case-studies" onClick={onCloseMenu} className="block py-2" style={mobileLinkStyle}>Case Studies</Link>
          </div>
        )}
      </div>

      <Link to="/about" onClick={onCloseMenu} className="block py-2.5" style={topLinkStyle}>About Us</Link>
      <Link to="/contact" onClick={onCloseMenu} className="block py-2.5" style={topLinkStyle}>Contact Us</Link>

      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-purple inline-flex items-center gap-2 mt-4"
        data-testid="mobile-nav-book-button"
        style={{ padding: '12px 24px', fontSize: 15, fontWeight: 500, borderRadius: 8, textDecoration: 'none' }}
      >
        Book Free Strategy Session
      </a>
    </div>
  );
}
