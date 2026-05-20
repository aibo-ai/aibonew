import { Mail, Linkedin } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

const iconWrapStyle = {
  width: 48,
  height: 48,
  background: 'var(--purple-light)',
  borderRadius: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const labelStyle = {
  fontSize: 14,
  fontWeight: 600,
  color: 'var(--text-primary)',
  marginBottom: 4,
};

const linkStyle = {
  fontSize: 16,
  color: 'var(--purple-dark)',
  textDecoration: 'none',
};

export default function ContactInfoPanel() {
  return (
    <div data-testid="contact-info-panel">
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
          <div style={iconWrapStyle}>
            <Mail size={22} style={{ color: 'var(--purple-dark)' }} />
          </div>
          <div>
            <div style={labelStyle}>Email</div>
            <a href="mailto:info@myaibo.in" style={linkStyle} data-testid="contact-email-link">
              info@myaibo.in
            </a>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="flex items-start gap-4">
          <div style={iconWrapStyle}>
            <Linkedin size={22} style={{ color: 'var(--purple-dark)' }} />
          </div>
          <div>
            <div style={labelStyle}>LinkedIn</div>
            <a
              href="https://in.linkedin.com/company/myaibo"
              target="_blank"
              rel="noopener noreferrer"
              style={linkStyle}
              data-testid="contact-linkedin-link"
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
          href={BOOKING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-purple inline-flex items-center gap-2"
          data-testid="contact-book-button"
          style={{ padding: '12px 24px', fontSize: 14, fontWeight: 500, textDecoration: 'none' }}
        >
          Book Free Strategy Session
        </a>
        <div style={{ marginTop: 12, fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
          Free · No commitment · 30 minutes
        </div>
      </div>
    </div>
  );
}
