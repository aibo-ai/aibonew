import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import SectionLabel from '@/components/sections/SectionLabel';
import PostIt from '@/components/sections/PostIt';
import ContactInfoPanel from '@/components/contact/ContactInfoPanel';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact MyAibo — Book a Free Strategy Session"
        description="Ready to grow? Book a free 30-minute strategy session. No commitment — just clarity on your highest-impact marketing or technology move."
        path="/contact"
      />
      <main data-testid="contact-page">
        {/* ── HERO ── */}
        <section className="relative hero-dotgrid" style={{ padding: '40px 32px 96px' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <nav aria-label="Breadcrumb" className="flex" style={{ gap: 8, fontFamily: "'DM Sans'", fontWeight: 500, fontSize: 13, color: 'var(--text-muted)' }}>
              <Link to="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Home</Link>
              <span>/</span>
              <span style={{ color: 'var(--text-primary)' }}>Contact</span>
            </nav>

            <div className="grid items-center" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: 64 }}>
              <div className="flex flex-col" style={{ gridColumn: 'span 2', minWidth: 0 }}>
                <div className="self-start inline-flex items-center gap-2" style={{ marginBottom: 24, background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}>
                  <span className="pulse-dot flex-shrink-0" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)' }} />
                  <span style={{ fontFamily: "'DM Sans'", fontWeight: 600, fontSize: 13, color: 'var(--purple-dark)' }}>Let&rsquo;s Talk</span>
                </div>
                <h1 style={{ margin: '0 0 24px', fontFamily: "'Fraunces', serif", fontWeight: 600, fontSize: 'clamp(40px,5vw,64px)', lineHeight: 1.1, letterSpacing: '-2px' }}>
                  Get in touch.{' '}
                  <span style={{ background: 'var(--acc)', color: 'var(--dark)', padding: '0 12px 4px', borderRadius: 10, boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone' }}>Let&rsquo;s talk growth.</span>
                </h1>
                <p style={{ margin: 0, maxWidth: 600, fontFamily: "'DM Sans'", fontWeight: 300, fontSize: 18, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                  Let&rsquo;s discuss how we can help grow your brand.
                </p>
              </div>

              <div className="relative justify-self-center" style={{ width: '100%', maxWidth: 300 }}>
                <PostIt rotate={2.5} tapeRotate={-3} big="30 min">
                  <span style={{ font: "600 24px/1.2 'Caveat',cursive", color: 'var(--text-primary)' }}>
                    free strategy session &mdash; no commitment, just clarity on your next move
                  </span>
                </PostIt>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section style={{ padding: '104px 32px', background: '#fff', borderTop: '1px solid var(--border-clr)' }}>
          <div className="mx-auto flex flex-col" style={{ maxWidth: 1180, gap: 44 }}>
            <div style={{ maxWidth: 720 }}>
              <SectionLabel text="Reach us" amber />
              <h2 style={{ margin: 0, fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(32px,4vw,52px)', lineHeight: 1.1, letterSpacing: '-1.5px' }}>
                Two ways <em style={{ color: 'var(--purple-dark)', fontStyle: 'normal' }}>to start.</em>
              </h2>
            </div>
            <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))', gap: 48, alignItems: 'start' }}>
              <ContactInfoPanel />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
