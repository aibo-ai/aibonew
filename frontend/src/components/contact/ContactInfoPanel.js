import { Statement, BookButton } from '@/components/print';

// Left column of the contact page ("Print room"): plain contact details,
// then the direct-booking prompt. Styles live in components/print/company/contact.css.
export default function ContactInfoPanel() {
  return (
    <div className="info" data-testid="contact-info-panel">
      <h4>Contact Information</h4>
      <dl>
        <div>
          <dt>Email</dt>
          <dd><a href="mailto:info@myaibo.in" data-testid="contact-email-link">info@myaibo.in</a></dd>
        </div>
        <div>
          <dt>LinkedIn</dt>
          <dd>
            <a href="https://in.linkedin.com/company/myaibo" target="_blank" rel="noopener noreferrer" data-testid="contact-linkedin-link">
              Connect with us
            </a>
          </dd>
        </div>
      </dl>

      <div className="talk">
        <Statement lead="Prefer to" pay="talk directly?" />
        <p>Book a free 30-minute strategy session. No commitment required.</p>
        <div className="actions">
          <BookButton page="/contact" placement="contact_info" />
        </div>
        <p className="terms"><span>Free</span><span>No commitment</span><span>30 minutes</span></p>
      </div>
    </div>
  );
}
