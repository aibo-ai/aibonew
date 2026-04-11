import { Building2, Heart, Clock } from "lucide-react";
import { Linkedin } from "lucide-react";
import SEO from "@/components/SEO";

const stats = [
  { icon: Building2, value: "50+", label: "Projects Delivered" },
  { icon: Heart, value: "98%", label: "Client Satisfaction" },
  { icon: Clock, value: "24/7", label: "Support" },
];

const founders = [
  {
    initials: "TB",
    name: "Tathagat Bagchi",
    role: "Co-Founder",
    description: "Sales leader with 15+ years at Flipkart and InMobi. Now making AI-driven solutions accessible.",
    linkedin: "https://www.linkedin.com/in/tathagatbagchi/",
  },
  {
    initials: "VK",
    name: "Vamsi Krishna Kaki",
    role: "Co-Founder",
    description: "Marketing leader with 15+ years at Zomato and Leena.ai. Now combining product thinking with AI to create transformative solutions.",
    linkedin: "https://www.linkedin.com/in/vamsi-krishna-kaki-3a502229/",
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About MyAibo — Marketing & AI Technology Agency"
        description="Founded by veterans from Flipkart, InMobi, Zomato, and Leena.ai. MyAibo combines deep marketing and AI engineering expertise under one roof."
      />
      <main>
      {/* Vision Section */}
      <section
        data-testid="about-vision-section"
        style={{
          background: 'var(--dark)',
          padding: '140px 40px 80px',
          marginTop: 64,
        }}
      >
        <div className="mx-auto text-center" style={{ maxWidth: 1100 }}>
          <h1
            className="headline-dark"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(36px, 4.5vw, 56px)',
              letterSpacing: '-1.5px',
              color: '#fff',
              margin: '0 0 24px',
              lineHeight: 1.15,
            }}
          >
            Our Vision
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px, 2vw, 20px)',
              fontWeight: 300,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.6,
              margin: 0,
              maxWidth: 700,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            To empower every client to grow without limits
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section
        data-testid="about-stats-section"
        style={{
          background: 'var(--white)',
          padding: '80px 40px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <div
                key={stat.label}
                data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-center"
                style={{
                  background: 'var(--off-white)',
                  border: '1px solid var(--border-clr)',
                  borderRadius: 16,
                  padding: '40px 20px',
                }}
              >
                <div
                  className="flex items-center justify-center mx-auto mb-4"
                  style={{
                    width: 56,
                    height: 56,
                    background: 'var(--purple-light)',
                    borderRadius: 12,
                  }}
                >
                  <stat.icon size={28} style={{ color: 'var(--purple-dark)' }} />
                </div>
                <div
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 'clamp(32px, 3.5vw, 42px)',
                    fontWeight: 600,
                    color: 'var(--purple-dark)',
                    margin: '0 0 8px',
                    lineHeight: 1,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 500,
                    color: 'var(--text-secondary)',
                    margin: 0,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section
        data-testid="about-founders-section"
        style={{
          background: 'var(--off-white)',
          padding: '80px 40px',
        }}
      >
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2
              className="headline-light"
              style={{
                fontFamily: "'Fraunces', serif",
                fontWeight: 300,
                fontSize: 'clamp(28px, 3.5vw, 42px)',
                letterSpacing: '-1px',
                color: 'var(--text-primary)',
                margin: '0 0 16px',
                lineHeight: 1.15,
              }}
            >
              <em>Founders</em>
            </h2>
            <p
              style={{
                fontSize: 16,
                fontWeight: 300,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
                margin: 0,
                maxWidth: 700,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              Industry veterans with 30+ years of combined experience. They bring a unique perspective on building scalable technology, informed by experience spanning early-stage startups to billion-dollar enterprises.
            </p>
          </div>

          {/* Founder Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {founders.map((founder) => (
              <div
                key={founder.name}
                data-testid={`founder-${founder.name.toLowerCase().replace(/\s+/g, '-')}`}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-clr)',
                  borderRadius: 16,
                  padding: 32,
                }}
              >
                {/* Avatar with Initials */}
                <div
                  className="flex items-center justify-center mx-auto mb-4"
                  style={{
                    width: 80,
                    height: 80,
                    background: 'linear-gradient(135deg, var(--purple-dark) 0%, var(--purple) 100%)',
                    borderRadius: '50%',
                    fontSize: 28,
                    fontWeight: 600,
                    color: '#fff',
                    fontFamily: "'Fraunces', serif",
                  }}
                >
                  {founder.initials}
                </div>

                {/* Name & Role */}
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0 0 4px',
                    textAlign: 'center',
                  }}
                >
                  {founder.name}
                </h3>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--purple-dark)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    textAlign: 'center',
                    marginBottom: 16,
                  }}
                >
                  {founder.role}
                </div>

                {/* Description */}
                <p
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    margin: '0 0 20px',
                    textAlign: 'center',
                  }}
                >
                  {founder.description}
                </p>

                {/* LinkedIn Link */}
                <div className="flex justify-center">
                  <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`linkedin-${founder.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center gap-2"
                    style={{
                      color: 'var(--purple-dark)',
                      textDecoration: 'none',
                      fontSize: 13,
                      fontWeight: 500,
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--purple)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--purple-dark)')}
                  >
                    <Linkedin size={16} />
                    Connect on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
    </>
  );
}
