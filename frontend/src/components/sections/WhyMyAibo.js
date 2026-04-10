import { Sparkles, Zap, Layers, Target, Eye, Briefcase } from "lucide-react";

const reasons = [
  {
    icon: Sparkles,
    title: 'Boutique by Design',
    description: 'Every engagement gets experienced hands, not a hand-off to someone who wasn\'t in the briefing.',
  },
  {
    icon: Zap,
    title: 'AI-Native Across Both Practices',
    description: 'Our marketing team uses AI to build organic authority. Our tech team builds the AI systems themselves. No other agency bridges both practices at depth.',
  },
  {
    icon: Layers,
    title: 'Modular & Scalable',
    description: 'Every service is designed to compound. Start with one, add others as you grow. The architecture supports it from day one, not retrofitted later.',
  },
  {
    icon: Target,
    title: 'Outcome-Driven, Not Hours-Driven',
    description: 'Engagements are structured around measurable KPIs not retainer hours. We own the outcome. No black-box metrics. No hidden costs.',
  },
  {
    icon: Eye,
    title: 'Complete Transparency',
    description: 'Every deliverable ties to a result you can verify independently. No surprises during development. We work by our ethos of complete clarity with clients.',
  },
  {
    icon: Briefcase,
    title: 'Deep Market Expertise',
    description: 'Specialist knowledge in FMCG, D2C, Logistics, Healthcare, FinTech, SaaS and more.',
  },
];

export default function WhyMyAibo() {
  return (
    <section
      id="why-myaibo"
      data-testid="why-myaibo-section"
      style={{
        background: 'var(--off-white)',
        padding: '80px 40px',
      }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <div
            style={{
              fontSize: 13,
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--purple-dark)',
              marginBottom: 16,
            }}
          >
            Why MyAibo
          </div>

          <h2
            data-testid="why-myaibo-headline"
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(32px, 4vw, 48px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.15,
              color: 'var(--text-primary)',
              margin: 0,
            }}
          >
            Six reasons the best brands choose us.
          </h2>
        </div>

        {/* Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, idx) => (
            <div
              key={idx}
              data-testid={`why-reason-${idx + 1}`}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                padding: '32px 28px',
              }}
            >
              <div
                className="flex items-center justify-center mx-auto mb-5"
                style={{
                  width: 48,
                  height: 48,
                  background: 'var(--purple-light)',
                  borderRadius: 12,
                }}
              >
                <reason.icon size={24} style={{ color: 'var(--purple-dark)' }} />
              </div>

              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 19,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 12px',
                  textAlign: 'center',
                }}
              >
                {reason.title}
              </h3>

              <p
                style={{
                  fontSize: 14,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
