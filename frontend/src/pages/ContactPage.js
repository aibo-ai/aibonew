import SEO from '@/components/SEO';
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
      <main style={{ paddingTop: 64 }} data-testid="contact-page">
        {/* Hero */}
        <section className="hero-dotgrid" style={{ padding: '110px 40px 70px' }}>
          <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
            <div
              className="inline-flex items-center gap-2 mb-6"
              style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.3)', borderRadius: 20, padding: '5px 14px' }}
            >
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
              <span style={{ color: 'var(--purple-dark)', fontSize: 12, fontWeight: 600 }}>Let's Talk</span>
            </div>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 600,
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                letterSpacing: '-1.5px',
                color: 'var(--text-primary)',
                margin: '0 0 16px',
                lineHeight: 1.15,
              }}
            >
              Get in touch. <em style={{ fontWeight: 300, fontStyle: 'italic', color: 'var(--purple-dark)' }}>Let's talk growth.</em>
            </h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: 'var(--text-secondary)',
                margin: 0,
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Let's discuss how we can help grow your brand.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ background: 'var(--off-white)', padding: '100px 40px' }}>
          <div className="mx-auto" style={{ maxWidth: 1100 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <ContactInfoPanel />
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
