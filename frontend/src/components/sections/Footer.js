import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--dark)', padding: '64px 40px 32px', borderTop: '1px solid rgba(124,59,237,0.2)' }}>
      <div className="mx-auto" style={{ maxWidth: 1200 }}>
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            
              href="/"
              style={{
                textDecoration: 'none',
                display: 'block',
                marginBottom: 12,
              }}
            >
              <img 
                src="/myaibo-logo-white.png" 
                alt="MyAibo" 
                loading="lazy"
                width={100}
                height={100}
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
                <Link to="/solutions/geo" style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.7)', textDecoration: 'none', transition:
