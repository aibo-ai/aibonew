import { Building2, Lightbulb, Infinity, Search, TrendingUp, Zap } from "lucide-react";
import SectionLabel from "./SectionLabel";

const reasons = [
  { icon: Building2, title: 'Built for You', body: "Tailored AI solutions that adapt to your unique world — not templates, not off-the-shelf tools, not generic playbooks." },
  { icon: Lightbulb, title: 'Inventive Architecture', body: "Our solutioning is complex, robust, and modular. Best-in-class across marketing intelligence and AI engineering." },
  { icon: Infinity, title: 'Infinite Scale', body: "Multiply capabilities, not headcount or budget. Every solution is built to scale with you without rebuilding from scratch." },
  { icon: Search, title: 'Full Transparency', body: "No hidden costs, no surprises. You always know what we're building, why we're building it, and what it costs." },
  { icon: TrendingUp, title: 'Dual Practice Advantage', body: "Marketing and technology under one roof means less friction, faster execution, and strategies that reinforce each other." },
  { icon: Zap, title: 'Speed to Impact', body: "Two-week tech sprints. Monthly content cycles. We move fast without sacrificing quality or stability." },
];

export default function WhyMyAibo() {
  return (
    <section
      id="why-myaibo"
      data-testid="why-myaibo-section"
      style={{ background: 'var(--white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Intro */}
        <div className="text-center mx-auto mb-12" style={{ maxWidth: 560 }}>
          <SectionLabel text="Why MyAibo" centered />
          <h2
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-1px',
              color: 'var(--text-primary)',
              margin: 0,
              lineHeight: 1.15,
            }}
          >
            Six reasons the best brands <em>choose us.</em>
          </h2>
        </div>

        {/* 3x2 card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reasons.map((r) => (
            <div
              key={r.title}
              data-testid={`why-card-${r.title.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                background: 'var(--off-white)',
                border: '1px solid var(--border-clr)',
                borderRadius: 12,
                padding: 28,
              }}
            >
              <div
                className="flex items-center justify-center mb-4"
                style={{
                  width: 36,
                  height: 36,
                  background: 'var(--purple-light)',
                  borderRadius: 8,
                }}
              >
                <r.icon size={18} style={{ color: 'var(--purple-dark)' }} />
              </div>
              <h3
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: '0 0 8px',
                }}
              >
                {r.title}
              </h3>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 300,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                {r.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
