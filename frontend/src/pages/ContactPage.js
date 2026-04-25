import { useState } from 'react';
import { Mail, Linkedin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import SEO from '@/components/SEO';

const SERVICES = [
  'Generative Engine Optimization (GEO)',
  'Answer Engine Optimization (AEO)',
  'Search Engine Optimization (SEO)',
  'Content Marketing',
  'Full Stack Development',
  'AI Automations',
  'White Label Solutions',
  'Multiple Services / Not Sure Yet',
];

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    service_interest: '',
    message: '',
  });
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
      setForm({ name: '', email: '', company: '', service_interest: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Network error. Please try again.');
    }
  };

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

  return (
    <>
      <SEO 
        title="Contact MyAibo — Book a Free Strategy Session"
        description="Ready to grow? Book a free 30-minute strategy session. No commitment — just clarity on your highest-impact marketing or technology move."
      />
      <main style={{ paddingTop: 64 }}>
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

            {/* Left — Contact Details */}
            <div>
              <h2
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 32,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 24px',
                }}
              >
                Contact Information
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: 'var(--purple-light)',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Mail size={22} style={{ color: 'var(--purple-dark)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                      Email
                    </div>
                    <a
                      href="mailto:info@myaibo.in"
                      style={{ fontSize: 16, color: 'var(--purple-dark)', textDecoration: 'none' }}
                    >
                      info@myaibo.in
                    </a>
                  </div>
                </div>

                {/* LinkedIn */}
                <div className="flex items-start gap-4">
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      background: 'var(--purple-light)',
                      borderRadius: 12,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Linkedin size={22} style={{ color: 'var(--purple-dark)' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4 }}>
                      LinkedIn
                    </div>
                    <a
                      href="https://in.linkedin.com/company/myaibo"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: 16, color: 'var(--purple-dark)', textDecoration: 'none' }}
                    >
                      Connect with us
                    </a>
                  </div>
                </div>
              </div>

              {/* Book a call CTA */}
              <div
                style={{
                  marginTop: 48,
                  padding: 28,
                  background: 'var(--dark)',
                  borderRadius: 16,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 20,
                    fontWeight: 400,
                    color: '#fff',
                    margin: '0 0 12px',
                  }}
                >
                  Prefer to talk directly?
                </p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '0 0 20px', lineHeight: 1.6 }}>
                  Book a free 30-minute strategy session. No commitment required.
                </p>
                <a
                  href="https://outlook.office365.com/book/MyAiboConsultation@myaibo.in/?ismsaljsauthenabled=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-purple inline-flex items-center gap-2"
                  style={{ padding: '12px 24px', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
                >
                  Book Free Strategy Session
                </a>
                <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                  Free · No commitment · 30 minutes
                </div>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 16,
                padding: 40,
              }}
            >
              {status === 'success' ? (
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
              ) : (
                <>
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
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = 'var(--purple-dark)')}
                          onBlur={(e) => (e.target.style.borderColor = 'var(--border-clr)')}
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
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = 'var(--purple-dark)')}
                          onBlur={(e) => (e.target.style.borderColor = 'var(--border-clr)')}
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
                        style={inputStyle}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--purple-dark)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border-clr)')}
                      />
                    </div>

                    {/* Service Interest */}
                    <div>
                      <label style={labelStyle}>What are you interested in?</label>
                      <select
                        name="service_interest"
                        value={form.service_interest}
                        onChange={handleChange}
                        style={{ ...inputStyle, cursor: 'pointer', appearance: 'auto' }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--purple-dark)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border-clr)')}
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
                        style={{ ...inputStyle, resize: 'vertical', minHeight: 120 }}
                        onFocus={(e) => (e.target.style.borderColor = 'var(--purple-dark)')}
                        onBlur={(e) => (e.target.style.borderColor = 'var(--border-clr)')}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="btn-purple"
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
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
