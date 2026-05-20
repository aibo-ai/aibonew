import SEO from '@/components/SEO';
import ContactInfoPanel from '@/components/contact/ContactInfoPanel';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact MyAibo — Book a Free Strategy Session"
        description="Ready to grow? Book a free 30-minute strategy session. No commitment — just clarity on your highest-impact marketing or technology move."
      />
      <main style={{ paddingTop: 64 }} data-testid="contact-page">
        {/* Hero */}
        <section style={{ background: 'var(--dark)', padding: '100px 40px 60px' }}>
          <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
            <h1
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: 'clamp(36px, 4.5vw, 56px)',
                letterSpacing: '-1.5px',
                color: '#fff',
                margin: '0 0 16px',
                lineHeight: 1.15,
              }}
            >
              Get In Touch
            </h1>
            <p
              style={{
                fontSize: 18,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.85)',
                margin: 0,
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Let's discuss how we can help grow your brand
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section style={{ background: 'var(--off-white)', padding: '80px 40px' }}>
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
