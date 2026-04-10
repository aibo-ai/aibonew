import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', padding: '64px 40px 32px', borderTop: '1px solid rgba(124,59,237,0.2)' }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <a
              href="/"
              style={{
                textDecoration: 'none',
                display: 'block',
                marginBottom: 12,
              }}
            >
              <img 
                src="/myaibo-logo.png" 
                alt="MyAibo" 
                style={{ height: 100, width: 'auto', display: 'block' }}
              />
            </a>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65, marginTop: 16 }}>
              A boutique agency building custom AI workforces and comprehensive marketing
              solutions. Engineered for growth.
            </p>
          </div>

          {/* Marketing Services */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              MARKETING
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/geo" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  GEO Services
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/aeo" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  AEO Services
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/seo" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  SEO Services
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/content-marketing" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Content Marketing
                </Link>
              </li>
            </ul>
          </div>

          {/* Technology Services */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              TECHNOLOGY
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/ai-automations" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  AI Automation
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/white-label" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  White Label Solutions
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/solutions/full-stack" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Full Stack Development
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              COMPANY
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <Link to="/about" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  About Us
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/case-studies" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Case Studies
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/blogs" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Blog / Insights
                </Link>
              </li>
              <li style={{ marginBottom: 12 }}>
                <Link to="/contact" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>
              CONTACT
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: 12 }}>
                <a href="mailto:info@myaibo.in" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  info@myaibo.in
                </a>
              </li>
              <li style={{ marginBottom: 12 }}>
                <a href="https://in.linkedin.com/company/myaibo" target="_blank" rel="noopener noreferrer" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition: 'color 0.2s' }}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.1)', margin: '40px 0' }} />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
            © 2025 Hilisa Ventures Pvt Ltd. All rights reserved.
          </div>

          {/* Newsletter Signup */}
          <div className="flex items-center gap-2">
            <input
              type="email"
              placeholder="Get the latest insights"
              style={{
                padding: '10px 16px',
                fontSize: 13,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 8,
                color: 'rgba(255,255,255,0.7)',
                outline: 'none',
                width: 240,
              }}
            />
            <button
              className="btn-purple"
              style={{
                padding: '10px 20px',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 8,
              }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
