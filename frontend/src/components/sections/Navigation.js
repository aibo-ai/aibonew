import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import DesktopNav from './navigation/DesktopNav';
import MobileNav from './navigation/MobileNav';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="nav-bar"
      data-testid="main-navigation"
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
          padding: '8px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }} data-testid="nav-logo-link">
          <img
            src="/myaibo-logo-white.png"
            alt="MyAibo"
            width={150}
            height={150}
            className="nav-logo-img"
          />
        </Link>

        {/* Desktop nav */}
        <DesktopNav />

        {/* Mobile menu button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="mobile-menu-toggle"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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

      {/* Mobile menu drawer */}
      {mobileOpen && <MobileNav onCloseMenu={() => setMobileOpen(false)} />}
    </nav>
  );
}
