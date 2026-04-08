import { useState } from "react";

const mktLinks = ['GEO Services', 'AEO Services', 'SEO Services', 'Content Marketing'];
const techLinks = ['AI Automation', 'White Label Solutions', 'Full Stack Development'];
const companyLinks = ['About Us', 'Case Studies', 'Blog / Insights', 'Contact'];
const contactLinks = [
  { label: 'info@myaibo.in', href: 'mailto:info@myaibo.in' },
  { label: 'myaibo.in', href: 'https://myaibo.in' },
  { label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const [email, setEmail] = useState('');

  return (
    <footer
      id="footer"
      data-testid="footer-section"
      style={{
        background: 'var(--dark)',
        borderTop: '1px solid rgba(124,59,237,0.2)',
        padding: '60px 40px 40px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Top grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 mb-12"
          style={{
            borderBottom: '1px solid rgba(255,255,255,0.07)',
          }}
        >
          {/* Column 1: Logo + tagline */}
          <div className="lg:col-span-1" style={{ maxWidth: 220 }}>
            <a
              href="#"
              style={{
                textDecoration: 'none',
                display: 'block',
                marginBottom: 10,
              }}
            >
              <img 
                src="/myaibo-logo.png" 
                alt="MyAibo" 
                style={{ height: 38, width: 'auto' }}
              />
            </a>
            <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.48)', lineHeight: 1.65 }}>
              A boutique agency building custom AI workforces and comprehensive marketing
              solutions. Engineered for growth.
            </p>
          </div>

          {/* Column 2: Marketing */}
          <div>
            <p
              style={{
                color: 'rgba(255,255,255,0.32)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 14,
                fontWeight: 500,
              }}
            >
              Marketing
            </p>
            {mktLinks.map((l) => (
              <a key={l} href="#marketing-services" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Column 3: Technology */}
          <div>
            <p
              style={{
                color: 'rgba(255,255,255,0.32)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 14,
                fontWeight: 500,
              }}
            >
              Technology
            </p>
            {techLinks.map((l) => (
              <a key={l} href="#technology-services" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Column 4: Company */}
          <div>
            <p
              style={{
                color: 'rgba(255,255,255,0.32)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 14,
                fontWeight: 500,
              }}
            >
              Company
            </p>
            {companyLinks.map((l) => (
              <a key={l} href="#" className="footer-link">{l}</a>
            ))}
          </div>

          {/* Column 5: Contact */}
          <div>
            <p
              style={{
                color: 'rgba(255,255,255,0.32)',
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginBottom: 14,
                fontWeight: 500,
              }}
            >
              Contact
            </p>
            {contactLinks.map((l) => (
              <a key={l.label} href={l.href} className="footer-link" target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', margin: 0 }}>
            &copy; 2025, Hillsa Ventures Pvt Ltd. All rights reserved.
          </p>
          <div className="flex gap-2">
            <input
              data-testid="footer-email-input"
              type="email"
              placeholder="Stay ahead with AI + marketing insights \u2192"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 6,
                padding: '7px 14px',
                fontSize: 13,
                color: '#fff',
                width: 260,
                outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            <button
              data-testid="footer-subscribe-button"
              className="btn-purple"
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 500,
                borderRadius: 6,
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
