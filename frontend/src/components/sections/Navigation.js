import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Menu, X, Calendar } from 'lucide-react';

const BOOKING_URL = 'https://outlook.office365.com/book/MyAiboConsultation@myaibo.in/?ismsaljsauthenabled=true';

const marketingServices = [
  { name: 'Generative Engine Optimization', slug: 'geo' },
  { name: 'Answer Engine Optimization', slug: 'aeo' },
  { name: 'Search Engine Optimization', slug: 'seo' },
  { name: 'Content Marketing', slug: 'content-marketing' },
];

const technicalServices = [
  { name: 'AI Automation', slug: 'ai-automations' },
  { name: 'White Label Solutions', slug: 'white-label' },
  { name: 'Full Stack Development', slug: 'full-stack' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

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
          maxWidth: 1180,
          margin: '0 auto',
          padding: '12px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 40,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
          <img 
            src="/myaibo-logo.png" 
            alt="MyAibo" 
            style={{ height: 50, width: 'auto' }}
          />
        </Link>

        {/* Desktop Navigation - All items visible on desktop */}
        <div className="hidden lg:flex items-center gap-8" style={{ flex: 1, justifyContent: 'flex-end', flexWrap: 'nowrap' }}>
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

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesOpen(true)}
            onMouseLeave={() => setResourcesOpen(false)}
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
              Resources
              <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: resourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {resourcesOpen && (
              <div
                className="absolute top-full left-0 mt-2"
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
                  Blogs
                </Link>
                <Link
                  to="/case-studies"
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
                  Case Studies
                </Link>
              </div>
            )}
          </div>

          {/* About Us */}
          <Link 
            to="/about" 
            className="nav-link"
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            About Us
          </Link>

          {/* Contact Us */}
          <Link 
            to="/contact" 
            className="nav-link"
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 15,
              fontWeight: 500,
              textDecoration: 'none',
            }}
          >
            Contact Us
          </Link>

          {/* Book Free Strategy Session Button */}
          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple inline-flex items-center gap-2"
            style={{ 
              padding: '12px 24px', 
              fontSize: 15, 
              fontWeight: 500, 
              borderRadius: 8,
              textDecoration: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Calendar size={18} />
            Book Free Strategy Session
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
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
          className="lg:hidden"
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

          {/* Resources Accordion */}
          <div style={{ marginBottom: 16 }}>
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
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
              Resources
              <ChevronDown size={16} style={{ transition: 'transform 0.2s', transform: mobileResourcesOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </button>

            {mobileResourcesOpen && (
              <div style={{ paddingLeft: 16, marginTop: 8 }}>
                <Link
                  to="/blogs"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 14,
                    textDecoration: 'none',
                    fontWeight: 400,
                  }}
                >
                  Blogs
                </Link>
                <Link
                  to="/case-studies"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2"
                  style={{
                    color: 'rgba(255,255,255,0.75)',
                    fontSize: 14,
                    textDecoration: 'none',
                    fontWeight: 400,
                  }}
                >
                  Case Studies
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5"
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}
          >
            About Us
          </Link>

          <Link
            to="/contact"
            onClick={() => setMobileOpen(false)}
            className="block py-2.5"
            style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}
          >
            Contact Us
          </Link>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-purple inline-flex items-center gap-2 mt-4"
            style={{ padding: '12px 24px', fontSize: 15, fontWeight: 500, borderRadius: 8, textDecoration: 'none' }}
          >
            <Calendar size={18} />
            Book Free Strategy Session
          </a>
        </div>
      )}
    </nav>
  );
}
