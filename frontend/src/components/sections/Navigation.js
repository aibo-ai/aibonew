import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';

const marketingServices = [
  { name: 'Generative Engine Optimization', slug: 'geo' },
  { name: 'Answer Engine Optimization', slug: 'aeo' },
  { name: 'Search Engine Optimization', slug: 'seo' },
  { name: 'Content Marketing', slug: 'content-marketing' },
];

const technicalServices = [
  { name: 'AI Automation', slug: 'ai-automation' },
  { name: 'White Label Solutions', slug: 'white-label' },
  { name: 'Full Stack Development', slug: 'full-stack' },
];

const navLinks = [
  { label: 'Case Studies', href: '/#case-studies' },
  { label: 'About Us', href: '/about', isRoute: true },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);

  return (
    <nav
      className="nav-bar"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'var(--dark)',
        borderBottom: '1px solid rgba(124,59,237,0.2)',
      }}
    >
      <div
        className="nav-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '16px 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
          <img 
            src="/myaibo-logo.png" 
            alt="MyAibo" 
            style={{ height: 32, width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {/* Solutions Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setSolutionsOpen(true)}
            onMouseLeave={() => setSolutionsOpen(false)}
          >
            <button
              className="nav-link inline-flex items-center gap-1"
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                color: 'rgba(255,255,255,0.9)',
                fontSize: 15,
                fontWeight: 500,
              }}
            >
              Solutions
              <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: solutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {/* Dropdown Menu */}
            {solutionsOpen && (
              <div
                className="absolute top-full left-0 mt-2"
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
                  {/* Marketing Services Column */}
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--purple-dark)',
                        marginBottom: 12,
                        paddingBottom: 8,
                        borderBottom: '1px solid var(--border-clr)',
                      }}
                    >
                      Marketing Services
                    </div>
                    {marketingServices.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/solutions/${service.slug}`}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          fontSize: 14,
                          fontWeight: 400,
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          borderRadius: 6,
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>

                  {/* Technical Services Column */}
                  <div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                        color: 'var(--purple-dark)',
                        marginBottom: 12,
                        paddingBottom: 8,
                        borderBottom: '1px solid var(--border-clr)',
                      }}
                    >
                      Technical Services
                    </div>
                    {technicalServices.map((service) => (
                      <Link
                        key={service.slug}
                        to={`/solutions/${service.slug}`}
                        style={{
                          display: 'block',
                          padding: '10px 12px',
                          fontSize: 14,
                          fontWeight: 400,
                          color: 'var(--text-primary)',
                          textDecoration: 'none',
                          borderRadius: 6,
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        {service.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Other Nav Links */}
          {navLinks.map((l) => (
            l.isRoute ? (
              <Link key={l.label} to={l.href} className="nav-link">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="nav-link">
                {l.label}
              </a>
            )
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            padding: 8,
          }}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--dark)',
            borderTop: '1px solid rgba(124,59,237,0.2)',
            padding: '24px 32px',
          }}
        >
          {/* Solutions Accordion */}
          <div style={{ marginBottom: 16 }}>
            <button
              onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              className="flex items-center justify-between w-full py-2.5"
              style={{
                background: 'transparent',
                border: 'none',
                color: 'rgba(255,255,255,0.85)',
                fontSize: 15,
                fontWeight: 500,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              Solutions
              <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: mobileSolutionsOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {mobileSolutionsOpen && (
              <div style={{ paddingLeft: 16, marginTop: 8 }}>
                {/* Marketing Services */}
                <div style={{ marginBottom: 16 }}>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--purple)',
                      marginBottom: 8,
                    }}
                  >
                    Marketing Services
                  </div>
                  {marketingServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/solutions/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2"
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 14,
                        textDecoration: 'none',
                        fontWeight: 400,
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>

                {/* Technical Services */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      color: 'var(--purple)',
                      marginBottom: 8,
                    }}
                  >
                    Technical Services
                  </div>
                  {technicalServices.map((service) => (
                    <Link
                      key={service.slug}
                      to={`/solutions/${service.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2"
                      style={{
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: 14,
                        textDecoration: 'none',
                        fontWeight: 400,
                      }}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Standard Links */}
          {navLinks.map((l) => (
            l.isRoute ? (
              <Link
                key={l.label}
                to={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5"
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5"
                style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}
              >
                {l.label}
              </a>
            )
          ))}
        </div>
      )}
    </nav>
  );
}
