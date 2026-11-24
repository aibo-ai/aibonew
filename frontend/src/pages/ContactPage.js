import SEO from '@/components/SEO';
import { PrintPage, Crumb, SecHead, CtaSection } from '@/components/print';
import ContactInfoPanel from '@/components/contact/ContactInfoPanel';
import ContactForm from '@/components/contact/ContactForm';
import '@/components/print/company/contact.css';

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Contact MyAibo — Book a Free Strategy Session"
        description="Ready to grow? Book a free 30-minute strategy session. No commitment — just clarity on your highest-impact marketing or technology move."
        path="/contact"
      />
      <PrintPage className="pg-contact">
        <div data-testid="contact-page">
          {/* Hero */}
          <section className="hero-c" aria-labelledby="h-hero">
            <div className="wrap">
              <Crumb items={[{ label: 'Home', to: '/' }, { label: 'Contact' }]} />
              <div className="row">
                <div className="hero-copy">
                  <p className="kicker">Let&rsquo;s Talk</p>
                  <h1 className="display" style={{ marginTop: 'var(--pr-s2)' }} id="h-hero">Get in touch. Let&rsquo;s talk growth.</h1>
                  <p className="lead">Let&rsquo;s discuss how we can help grow your brand.</p>
                </div>
                <div className="hero-big stat">
                  <p className="stat-n">30 min</p>
                  <p className="stat-c">free strategy session: no commitment, just clarity on your next move</p>
                </div>
              </div>
            </div>
          </section>

          {/* Reach us: details on the left, the letter on the right */}
          <section className="sec paper-white" id="reach" aria-labelledby="h-reach">
            <div className="wrap">
              <SecHead id="h-reach" name="Reach us" lead="Two ways" pay="to start." />
              <div className="ways">
                <ContactInfoPanel />
                <ContactForm />
              </div>
            </div>
          </section>

          <CtaSection page="/contact" />
        </div>
      </PrintPage>
    </>
  );
}
