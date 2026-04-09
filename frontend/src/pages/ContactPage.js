import { Mail, Linkedin } from 'lucide-react';

export default function ContactPage() {
  return (
    <main style={{ paddingTop: 64 }}>
      {/* Hero Section */}
      <section
        style={{
          background: 'var(--dark)',
          padding: '100px 40px 60px',
        }}
      >
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

      {/* Contact Information */}
      <section
        style={{
          background: 'var(--off-white)',
          padding: '80px 40px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Details */}
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
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}
                    >
                      Email
                    </div>
                    <a
                      href="mailto:info@myaibo.in"
                      style={{
                        fontSize: 16,
                        color: 'var(--purple-dark)',
                        textDecoration: 'none',
                      }}
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
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        marginBottom: 4,
                      }}
                    >
                      LinkedIn
                    </div>
                    <a
                      href="https://in.linkedin.com/company/myaibo"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: 16,
                        color: 'var(--purple-dark)',
                        textDecoration: 'none',
                      }}
                    >
                      Connect with us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <div
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
                  fontSize: 28,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 16px',
                }}
              >
                Ready to get started?
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: 'var(--text-secondary)',
                  margin: '0 0 24px',
                  lineHeight: 1.7,
                }}
              >
                Book a free 30-minute strategy session to discuss your growth objectives and how we can help achieve them.
              </p>
              <a
                href="https://outlook.office365.com/book/MyAiboConsultation@myaibo.in/?ismsaljsauthenabled=true"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-purple inline-flex items-center gap-2"
                style={{
                  padding: '14px 28px',
                  fontSize: 15,
                  fontWeight: 500,
                  textDecoration: 'none',
                }}
              >
                Book Free Strategy Session
              </a>

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: '1px solid var(--border-clr)',
                  fontSize: 13,
                  color: 'var(--text-muted)',
                }}
              >
                Free · No commitment · 30 minutes
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
