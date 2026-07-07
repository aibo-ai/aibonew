import { useState } from 'react';
import { CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { BACKEND_URL } from '@/lib/constants';

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

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: 8,
  border: '1px solid var(--border-clr)',
  fontSize: 15,
  color: 'var(--text-primary)',
  background: 'var(--white)',
  outline: 'none',
  transition: 'border-color 0.2s',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: 6,
};

const focusHandlers = {
  onFocus: (e) => (e.target.style.borderColor = 'var(--purple-dark)'),
  onBlur: (e) => (e.target.style.borderColor = 'var(--border-clr)'),
};

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
      <div
        data-testid="contact-form-success"
        style={{
          background: 'var(--white)',
          border: '1px solid var(--border-clr)',
          borderRadius: 16,
          padding: 40,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 320,
            textAlign: 'center',
            gap: 16,
          }}
        >
          <CheckCircle size={52} style={{ color: '#22c55e' }} />
          <h3
            style={{
              fontFamily: "'Fraunces', serif",
              fontSize: 26,
              fontWeight: 600,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Message received.
          </h3>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)', margin: 0, maxWidth: 320, lineHeight: 1.6 }}>
            We'll be in touch within one business day. You can also book a call directly above.
          </p>
          <button
            onClick={() => setStatus('idle')}
            data-testid="contact-form-send-another"
            style={{
              marginTop: 8,
              background: 'none',
              border: '1px solid var(--border-clr)',
              borderRadius: 8,
              padding: '10px 20px',
              fontSize: 14,
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-testid="contact-form"
      style={{
        background: 'var(--white)',
        border: '1px solid var(--border-clr)',
        borderRadius: 16,
        padding: 40,
      }}
    >
      <h3
        style={{
          fontFamily: "'Fraunces', serif",
          fontSize: 26,
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: '0 0 8px',
        }}
      >
        Send us a message
      </h3>
      <p style={{ fontSize: 14, color: 'var(--text-secondary)', margin: '0 0 28px', lineHeight: 1.6 }}>
        Tell us about your business and what you're trying to achieve. We'll come back with a clear plan.
      </p>

      {status === 'error' && (
        <div
          data-testid="contact-form-error"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '12px 16px',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: 8,
            marginBottom: 20,
          }}
        >
          <AlertCircle size={18} style={{ color: '#ef4444', flexShrink: 0 }} />
          <p style={{ margin: 0, fontSize: 14, color: '#dc2626' }}>{errorMsg}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Name & Email row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Arjun Mehta"
              required
              data-testid="contact-form-name-input"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
          <div>
            <label style={labelStyle}>
              Email Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="arjun@yourcompany.com"
              required
              data-testid="contact-form-email-input"
              style={inputStyle}
              {...focusHandlers}
            />
          </div>
        </div>

        {/* Company */}
        <div>
          <label style={labelStyle}>Company / Brand Name</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Your company name"
            data-testid="contact-form-company-input"
            style={inputStyle}
            {...focusHandlers}
          />
        </div>

        {/* Service Interest */}
        <div>
          <label style={labelStyle}>What are you interested in?</label>
          <select
            name="service_interest"
            value={form.service_interest}
            onChange={handleChange}
            data-testid="contact-form-service-select"
            style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
            {...focusHandlers}
          >
            <option value="">Select a service (optional)</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label style={labelStyle}>
            Message <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your business, your goals, and what you're trying to achieve..."
            required
            rows={5}
            data-testid="contact-form-message-input"
            style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
            {...focusHandlers}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-purple"
          data-testid="contact-form-submit-button"
          style={{
            padding: '14px 28px',
            fontSize: 15,
            fontWeight: 500,
            cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            opacity: status === 'loading' ? 0.8 : 1,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          {status === 'loading' ? (
            <>
              <Loader size={16} style={{ animation: 'spin 1s linear infinite' }} />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </button>

        <p style={{ margin: 0, fontSize: 12, color: 'var(--text-muted)' }}>
          We respond to every message within one business day.
        </p>
      </form>
    </div>
  );
}
