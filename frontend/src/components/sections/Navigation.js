import { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, Megaphone, Settings } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BOOKING_URL } from "@/lib/constants";

const marketingSolutions = [
  { label: "Generative Engine Optimization", slug: "geo" },
  { label: "Answer Engine Optimization", slug: "aeo" },
  { label: "Search Engine Optimization", slug: "seo" },
  { label: "Content Marketing", slug: "content-marketing" },
];

const techSolutions = [
  { label: "AI Automations", slug: "ai-automations" },
  { label: "White Labeled Solutions", slug: "white-label" },
  { label: "Full Stack Development", slug: "full-stack" },
];

const navLinks = [
  { label: "Case Studies", href: "/#case-studies" },
  { label: "About Us", href: "/#why-myaibo" },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      data-testid="navigation-bar"
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        height: 64,
        background: 'var(--dark)',
        borderBottom: '1px solid rgba(124,59,237,0.15)',
      }}
    >
      <div
        className="mx-auto h-full flex items-center justify-between px-6 lg:px-10"
        style={{ maxWidth: 1180 }}
      >
        {/* Logo */}
        <Link
          to="/"
          data-testid="nav-logo"
          style={{
            fontFamily: "'Fraunces', serif",
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.5px',
            textDecoration: 'none',
          }}
        >
          <span style={{ color: '#fff' }}>My</span>
          <span style={{ color: '#A07AF0' }}>Aibo</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-7">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="nav-solutions-dropdown"
                className="nav-link flex items-center gap-1"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}
              >
                Solutions <ChevronDown size={14} />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-72">
              <DropdownMenuLabel className="flex items-center gap-2" style={{ color: '#A07AF0', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Megaphone size={13} /> Marketing
              </DropdownMenuLabel>
              {marketingSolutions.map((s) => (
                <DropdownMenuItem key={s.slug} asChild>
                  <Link to={`/solutions/${s.slug}`} className="cursor-pointer" style={{ textDecoration: 'none', paddingLeft: 20 }}>
                    {s.label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuLabel className="flex items-center gap-2" style={{ color: 'var(--amber)', fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                <Settings size={13} /> Technology
              </DropdownMenuLabel>
              {techSolutions.map((s) => (
                <DropdownMenuItem key={s.label} asChild>
                  <Link to={`/solutions/${s.slug}`} className="cursor-pointer" style={{ textDecoration: 'none', paddingLeft: 20 }}>
                    {s.label}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="nav-link">
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="nav-cta-button"
          className="hidden lg:inline-flex btn-purple"
          style={{ padding: '9px 20px', fontSize: 13, fontWeight: 500 }}
        >
          Book Free Strategy Session
        </a>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              data-testid="nav-mobile-menu"
              className="lg:hidden"
              style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}
            >
              <Menu size={24} />
            </button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-80 p-0"
            style={{ background: 'var(--dark)', borderLeft: '1px solid rgba(124,59,237,0.2)' }}
          >
            <div className="flex flex-col h-full">
              {/* Mobile Logo */}
              <div className="px-6 pt-6 pb-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <Link to="/" onClick={() => setMobileOpen(false)} style={{ fontFamily: "'Fraunces', serif", fontSize: 20, fontWeight: 600, textDecoration: 'none' }}>
                  <span style={{ color: '#fff' }}>My</span>
                  <span style={{ color: '#A07AF0' }}>Aibo</span>
                </Link>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                {/* Marketing Section */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Megaphone size={14} style={{ color: '#A07AF0' }} />
                    <span style={{ color: '#A07AF0', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Marketing
                    </span>
                  </div>
                  {marketingSolutions.map((s) => (
                    <Link
                      key={s.slug}
                      to={`/solutions/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      data-testid={`mobile-link-${s.slug}`}
                      className="block py-2 pl-5"
                      style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, textDecoration: 'none', transition: 'color 0.2s' }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(124,59,237,0.12)', marginBottom: 20 }} />

                {/* Technology Section */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Settings size={14} style={{ color: 'var(--amber)' }} />
                    <span style={{ color: 'var(--amber)', fontSize: 11, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                      Technology
                    </span>
                  </div>
                  {techSolutions.map((s) => (
                    <Link
                      key={s.label}
                      to={`/solutions/${s.slug}`}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 pl-5"
                      style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, textDecoration: 'none' }}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(124,59,237,0.12)', marginBottom: 20 }} />

                {/* Standard Links */}
                {navLinks.map((l) => (
                  <a
                    key={l.label}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block py-2.5"
                    style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, textDecoration: 'none', fontWeight: 500 }}
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              {/* CTA at bottom */}
              <div className="px-6 py-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="mobile-cta-button"
                  className="btn-purple w-full justify-center"
                  style={{ padding: '13px 20px', fontSize: 14, fontWeight: 500 }}
                >
                  Book Free Strategy Session
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
