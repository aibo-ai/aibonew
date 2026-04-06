import { useState } from "react";
import { ChevronDown, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BOOKING_URL } from "@/lib/constants";

const solutions = [
  { label: "Generative Engine Optimization", href: "#marketing-services" },
  { label: "Answer Engine Optimization", href: "#marketing-services" },
  { label: "Search Engine Optimization", href: "#marketing-services" },
  { label: "Content Marketing", href: "#marketing-services" },
  { label: "AI Automations", href: "#technology-services" },
  { label: "White Labeled Solutions", href: "#technology-services" },
  { label: "Full Stack Development", href: "#technology-services" },
];

const links = [
  { label: "Marketing", href: "#marketing-services" },
  { label: "Technology", href: "#technology-services" },
  { label: "Resources", href: "#case-studies" },
  { label: "About Us", href: "#why-myaibo" },
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
        <a
          href="#"
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
        </a>

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
            <DropdownMenuContent align="start" className="w-64">
              {solutions.map((s) => (
                <DropdownMenuItem key={s.label} asChild>
                  <a href={s.href} className="cursor-pointer" style={{ textDecoration: 'none' }}>
                    {s.label}
                  </a>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {links.map((l) => (
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
            className="w-72"
            style={{ background: 'var(--dark)', borderLeft: '1px solid rgba(124,59,237,0.2)' }}
          >
            <div className="flex flex-col gap-3 mt-8">
              <p style={{ color: '#A07AF0', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                Solutions
              </p>
              {solutions.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, textDecoration: 'none' }}
                >
                  {s.label}
                </a>
              ))}
              <div style={{ height: 1, background: 'rgba(124,59,237,0.15)', margin: '8px 0' }} />
              {links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, textDecoration: 'none', fontWeight: 500 }}
                >
                  {l.label}
                </a>
              ))}
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-purple mt-4"
                style={{ padding: '12px 20px', fontSize: 14, fontWeight: 500, justifyContent: 'center' }}
              >
                Book Free Strategy Session
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
