import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import { marketingServices, technicalServices } from './navData';

const accordionTriggerStyle = {
  background: 'transparent',
  border: 'none',
  color: 'rgba(255,255,255,0.85)',
  fontSize: 15,
  fontWeight: 500,
  cursor: 'pointer',
  textAlign: 'left',
};

const sectionLabelStyle = {
  fontSize: 11,
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  color: 'var(--purple)',
  marginBottom: 8,
};

const mobileLinkStyle = {
  color: 'rgba(255,255,255,0.75)',
  fontSize: 14,
  textDecoration: 'none',
  fontWeight: 400,
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

  return (
    <div
      className="lg:hidden"
      data-testid="mobile-nav-menu"
      style={{
        background: 'var(--dark)',
        borderTop: '1px solid rgba(124,59,237,0.2)',
        padding: '24px 32px',
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
          <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
        </button>

        {solutionsOpen && (
          <div style={{ paddingLeft: 16, marginTop: 8 }}>
            <div style={{ marginBottom: 16 }}>
              <div style={sectionLabelStyle}>Marketing Services</div>
              {marketingServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/solutions/${service.slug}`}
                  onClick={onCloseMenu}
                  className="block py-2"
                  style={mobileLinkStyle}
                >
                  {service.name}
                </Link>
              ))}
            </div>

            <div>
              <div style={sectionLabelStyle}>Technical Services</div>
              {technicalServices.map((service) => (
                <Link
                  key={service.slug}
                  to={`/solutions/${service.slug}`}
                  onClick={onCloseMenu}
                  className="block py-2"
                  style={mobileLinkStyle}
                >
                  {service.name}
                </Link>
              ))}
            </div>
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
          <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
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
