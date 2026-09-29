import { Link } from "react-router-dom";
import { Building2, Heart, Clock, Linkedin } from "lucide-react";
import SEO from "@/components/SEO";
import SectionLabel from "@/components/sections/SectionLabel";
import PostIt from "@/components/sections/PostIt";
import TickerCta from "@/components/sections/TickerCta";
import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";

const stats = [
  { icon: Building2, value: "50+", label: "Projects Delivered" },
  { icon: Heart, value: "98%", label: "Client Satisfaction" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const founders = [
  {
    initials: "TB",
    name: "Tathagat Bagchi",
    role: "Co-Founder",
    background: "Flipkart · InMobi",
    description: "Sales leader with 15+ years at Flipkart and InMobi. Now making AI-driven solutions accessible.",
    linkedin: "https://www.linkedin.com/in/tathagatbagchi/",
  },
  {
    initials: "VK",
    name: "Vamsi Krishna Kaki",
    role: "Co-Founder",
    background: "Zomato · Leena.ai",
    description: "Marketing leader with 15+ years at Zomato and Leena.ai. Now combining product thinking with AI to create transformative solutions.",
    linkedin: "https://www.linkedin.com/in/vamsi-krishna-kaki-3a502229/",
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About MyAibo — Marketing & AI Technology Agency"
        description="Founded by veterans from Flipkart, InMobi, Zomato, and Leena.ai. MyAibo combines deep marketing and AI engineering expertise under one roof."
        path="/about"
      />
      <main>
        {/* ── HERO ── */}
        <section data-testid="about-vision-section" className="relative hero-dotgrid" style={{ padding: '40px 32px 104px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>About</span>
            </nav>

            <div className="grid items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 64 }}>
              <div className="flex flex-col" style={{ gridColumn: 'span 2', minWidth: 0 }}>
                <div className="self-start inline-flex items-center gap-2" style={{ marginBottom: 24, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
                  <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>About MyAibo</span>
                </div>
                <h1 style={{ margin: '0 0 24px', fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-2px' }}>
                  Our vision:{' '}
                  <span style={{ background: 'var(--acc)', color: 'var(--dark)', padding: '0 12px 4px', borderRadius: 10, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>growth without limits.</span>
                </h1>
                <p style={{ margin: '0 0 34px', maxWidth: 600, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  To empower every client to grow without limits.
                </p>
                <div className="flex flex-wrap" style={{ gap: 14 }}>
                  <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center" style={{ whiteSpace: 'nowrap', padding: '16px 30px', borderRadius: 8, background: 'var(--purple)', color: '#fff', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }} onClick={() => trackBookingClick({ page: '/about', placement: 'hero' })}>
                    Book Free Strategy Session
                  </a>
                  <Link to="/case-studies" className="inline-flex items-center" style={{ whiteSpace: 'nowrap', padding: '16px 28px', borderRadius: 8, background: '#fff', border: '1px solid var(--border-clr)', color: 'var(--text-primary)', fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 16, textDecoration: 'none' }}>
                    View Case Studies &rarr;
                  </Link>
                </div>
              </div>

              <div className="relative justify-self-center" style={{ width: '100%', maxWidth: 330 }}>
                <PostIt rotate={2.5} tapeRotate={-3} big="30+">
                  <span style={{ font: "600 24px/1.2 'Caveat',cursive", color: 'var(--text-primary)' }}>
                    years of combined experience &mdash; Flipkart, InMobi, Zomato &amp; Leena.ai
                  </span>
                </PostIt>
              </div>
            </div>
          </div>
        </section>

        {/* ── BY THE NUMBERS ── */}
        <section data-testid="about-stats-section" style={{ padding: '104px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)', borderBottom: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 40 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="By the numbers" amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                A boutique team, <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>measured by outcomes.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))', gap: 16 }}>
              {stats.map((stat, i) => {
                const amber = i === 1;
                return (
                  <div
                    key={stat.label}
                    data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex flex-col"
                    style={{ background: amber ? 'var(--acc)' : 'var(--off-white)', border: amber ? '1px solid var(--acc)' : '1px solid var(--border-clr)', borderRadius: 16, padding: 28, gap: 36, minHeight: 210 }}
                  >
                    <div className="flex items-center justify-between">
                      <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, color: amber ? 'var(--dark)' : 'var(--text-muted)', opacity: amber ? 0.75 : 1 }}>0{i + 1}</span>
                      <stat.icon size={20} style={{ color: amber ? 'var(--dark)' : 'var(--purple-dark)' }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 'clamp(44px,4.4vw,56px)', fontWeight: 600, lineHeight: 0.95, letterSpacing: '-1px', color: amber ? 'var(--dark)' : 'var(--purple-dark)' }}>{stat.value}</div>
                      <div style={{ marginTop: 10, fontFamily: "'DM Sans'", fontSize: 15, fontWeight: 500, color: amber ? 'var(--dark)' : 'var(--text-secondary)' }}>{stat.label}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── FOUNDERS (dark) ── */}
        <section data-testid="about-founders-section" style={{ padding: '104px 32px', background: 'var(--dark)', color: '#fff' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 48 }}>
            <div className="grid items-end" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 32 }}>
              <div>
                <SectionLabel text="Founders" dark amber />
                <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                  Industry veterans, <em style={{ color: 'var(--acc)', fontStyle: 'normal' }}>30+ years combined.</em>
                </h2>
              </div>
              <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 16.5, lineHeight: 1.7, color: 'rgba(255,255,255,.7)' }}>
                Industry veterans with 30+ years of combined experience. They bring a unique perspective on building scalable technology, informed by experience spanning early-stage startups to billion-dollar enterprises.
              </p>
            </div>

            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 16 }}>
              {founders.map((founder, i) => {
                const amber = i === 1;
                return (
                  <div
                    key={founder.name}
                    data-testid={`founder-${founder.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="flex flex-col"
                    style={{ background: 'var(--dark-mid)', border: '1px solid rgba(255,255,255,.1)', borderRadius: 20, padding: 32, gap: 20 }}
                  >
                    <div className="flex items-center" style={{ gap: 18 }}>
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{ width: 72, height: 72, borderRadius: '50%', background: amber ? 'var(--acc)' : 'var(--purple)', color: amber ? 'var(--dark)' : '#fff', fontFamily: "'Fraunces', serif", fontSize: 26, fontWeight: 600 }}
                      >
                        {founder.initials}
                      </div>
                      <div className="flex flex-col" style={{ gap: 6, minWidth: 0 }}>
                        <h3 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontSize: 24, fontWeight: 600, lineHeight: 1.15 }}>{founder.name}</h3>
                        <div className="flex flex-wrap items-center" style={{ gap: 8 }}>
                          <span style={{ fontFamily: "'DM Sans'", fontWeight: 700, fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#A07AF0' }}>{founder.role}</span>
                          <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 12, padding: '3px 10px', borderRadius: 999, background: 'var(--acc)', color: 'var(--dark)' }}>{founder.background}</span>
                        </div>
                      </div>
                    </div>
                    <p style={{ margin: 0, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 15.5, lineHeight: 1.7, color: 'rgba(255,255,255,.72)' }}>{founder.description}</p>
                    <a
                      href={founder.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid={`linkedin-${founder.name.toLowerCase().replace(/\s+/g, '-')}`}
                      className="self-start inline-flex items-center gap-2"
                      style={{ marginTop: 'auto', color: 'var(--acc)', textDecoration: 'none', fontFamily: "'DM Sans'", fontSize: 14, fontWeight: 600 }}
                    >
                      <Linkedin size={16} /> Connect on LinkedIn &rarr;
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <TickerCta page="/about" />
      </main>
    </>
  );
}
