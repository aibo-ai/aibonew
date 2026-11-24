import { useState } from 'react';
import { BACKEND_URL } from '@/lib/constants';
import { trackLeadFormSubmit } from '@/lib/analytics';

// The contact form, laid out as the "Print room" letter: a white sheet with an
// amber stamp. Styles live in components/print/company/contact.css.

const SERVICES = [
  'Generative Engine Optimization (GEO)',
  'Answer Engine Optimization (AEO)',
  'Search Engine Optimization (SEO)',
  'Content Marketing',
  'Full Stack Development',
  'AI Automations',
  'Multiple Services / Not Sure Yet',
];

const EMPTY_FORM = { name: '', email: '', company: '', service_interest: '', message: '' };

function Stamp() {
  return <img className="stamp" src="/print/company/contact-stamp.webp" width="300" height="360" loading="lazy" alt="" />;
}

export default function ContactForm() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch(`${BACKEND_URL}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company || undefined,
          service_interest: form.service_interest || undefined,
          message: form.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || 'Something went wrong. Please try again.');
      }

      // Fire the GA4/GTM conversion event now that submission is confirmed successful.
      trackLeadFormSubmit({ service_interest: form.service_interest || 'not_specified' });

      setStatus('success');
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error('[ContactForm] Submission failed:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Network error. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="card letter sent" data-testid="contact-form-success" role="status">
        <Stamp />
        <h4>Message received.</h4>
        <p className="intro">We'll be in touch within one business day. You can also book a call directly.</p>
        <div className="actions" style={{ marginTop: 'var(--pr-s4)' }}>
          <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')} data-testid="contact-form-send-another">
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const loading = status === 'loading';

  return (
    <form className="card letter" onSubmit={handleSubmit} data-testid="contact-form" aria-labelledby="h-letter">
      <Stamp />
      <h4 id="h-letter">Send us a message</h4>
      <p className="intro">Tell us about your business and what you're trying to achieve. We'll come back with a clear plan.</p>
      <p className="reply">We reply within one business day</p>

      {status === 'error' && (
        <p className="form-error" role="alert" data-testid="contact-form-error">{errorMsg}</p>
      )}

      <div className="form">
        <div className="field">
          <label htmlFor="cf-name">Full Name <b>*</b></label>
          <input
            id="cf-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Arjun Mehta"
            autoComplete="name"
            required
            data-testid="contact-form-name-input"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-email">Email Address <b>*</b></label>
          <input
            id="cf-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="arjun@yourcompany.com"
            autoComplete="email"
            required
            data-testid="contact-form-email-input"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-company">Company / Brand Name</label>
          <input
            id="cf-company"
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your company name"
            autoComplete="organization"
            data-testid="contact-form-company-input"
          />
        </div>
        <div className="field">
          <label htmlFor="cf-interest">What are you interested in?</label>
          <select
            id="cf-interest"
            name="service_interest"
            value={form.service_interest}
            onChange={handleChange}
            data-testid="contact-form-service-select"
          >
            <option value="">Select a service (optional)</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div className="field full">
          <label htmlFor="cf-message">Message <b>*</b></label>
          <textarea
            id="cf-message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your business, your goals, and what you're trying to achieve..."
            required
            rows={5}
            data-testid="contact-form-message-input"
          />
        </div>
        <div className="actions">
          <button type="submit" className="btn btn-primary btn-lg" disabled={loading} data-testid="contact-form-submit-button">
            {loading ? (<><span className="spin" aria-hidden="true" /> Sending…</>) : 'Send Message'}
          </button>
          <span className="note">We respond to every message within one business day.</span>
        </div>
      </div>
    </form>
  );
}
