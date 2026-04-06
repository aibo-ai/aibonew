import { useState } from "react";
import SectionLabel from "./SectionLabel";

const filters = [
  { key: 'all', label: 'All' },
  { key: 'marketing', label: 'Marketing' },
  { key: 'technology', label: 'Technology' },
  { key: 'combined', label: 'Combined' },
];

const studies = [
  {
    type: 'marketing',
    badge: 'Marketing \u00b7 GEO + SEO',
    client: 'Iluvia',
    subtitle: 'Premium Haircare \u00b7 Beauty & Wellness',
    metrics: [
      { num: '156%', label: 'Conv. rate' },
      { num: '\u221251%', label: 'CAC reduction' },
      { num: '63%', label: 'Amazon ranking' },
    ],
  },
  {
    type: 'marketing',
    badge: 'Marketing \u00b7 Content + GEO',
    client: 'Trudiance Beauty',
    subtitle: 'Skincare + Makeup \u00b7 D2C',
    metrics: [
      { num: '67%', label: 'Conv. rate' },
      { num: '\u221243%', label: 'CAC' },
      { num: '78%', label: 'LTV' },
    ],
  },
  {
    type: 'marketing',
    badge: 'Marketing \u00b7 GEO + AEO',
    client: 'vPersonalize',
    subtitle: 'Enterprise SaaS \u00b7 Fashion Tech',
    metrics: [
      { num: '63%', label: 'Conv. rate' },
      { num: '\u221241%', label: 'CAC' },
      { num: '47%', label: 'Email engagement' },
    ],
  },
  {
    type: 'technology',
    badge: 'Technology \u00b7 White Label',
    client: 'FinTech Platform',
    subtitle: 'Financial Technology',
    metrics: [
      { num: '<10w', label: 'Launch to market' },
      { num: '\u221270%', label: 'Manual effort' },
      { num: '\u221e', label: 'Reseller seats' },
    ],
  },
  {
    type: 'technology',
    badge: 'Technology \u00b7 AI Automation',
    client: 'Logistics Leader',
    subtitle: 'Last-Mile Delivery',
    metrics: [
      { num: '8 min', label: 'Lead response (was 4hr)' },
      { num: '3\u00d7', label: 'Sales capacity' },
      { num: '96%', label: 'Lead scoring accuracy' },
    ],
  },
  {
    type: 'technology',
    badge: 'Technology \u00b7 Full Stack',
    client: 'Apparel Brand',
    subtitle: 'Retail \u00b7 Ethnic Wear',
    metrics: [
      { num: '8\u00d7', label: 'Inventory speed' },
      { num: '4 hrs', label: 'Design-to-publish (was 3d)' },
      { num: '+2', label: 'Additional licensees' },
    ],
  },
];

export default function CaseStudies() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered =
    activeFilter === 'all'
      ? studies
      : studies.filter((s) => s.type === activeFilter);

  return (
    <section
      id="case-studies"
      data-testid="case-studies-section"
      style={{ background: 'var(--white)', padding: '80px 40px' }}
    >
      <div className="mx-auto" style={{ maxWidth: 1100 }}>
        {/* Intro */}
        <div className="text-center mx-auto mb-8" style={{ maxWidth: 540 }}>
          <SectionLabel text="Case Studies" centered />
          <h2
            className="headline-light"
            style={{
              fontFamily: "'Fraunces', serif",
              fontWeight: 300,
              fontSize: 'clamp(28px, 3.5vw, 42px)',
              letterSpacing: '-1px',
              color: 'var(--text-primary)',
              margin: '0 0 10px',
              lineHeight: 1.15,
            }}
          >
            Real transformations, <em>real</em> numbers.
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            Six clients across marketing and technology. Filter by practice area.
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              data-testid={`filter-${f.key}`}
              className={`filter-pill ${activeFilter === f.key ? 'active' : ''}`}
              onClick={() => setActiveFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Card grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => {
            const isTech = s.type === 'technology';
            const accentColor = isTech ? 'var(--amber)' : 'var(--purple)';
            const numColor = isTech ? 'var(--amber)' : 'var(--purple-dark)';
            const badgeBg = isTech ? 'var(--amber-light)' : 'var(--purple-light)';
            const badgeColor = isTech ? '#92400E' : 'var(--purple-dark)';

            return (
              <div
                key={`${s.client}-${i}`}
                data-testid={`case-study-card-${i}`}
                className="relative overflow-hidden"
                style={{
                  background: 'var(--off-white)',
                  border: '1px solid var(--border-clr)',
                  borderRadius: 12,
                  padding: 28,
                }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0"
                  style={{ height: 3, background: accentColor }}
                />

                {/* Badge */}
                <span
                  style={{
                    display: 'inline-block',
                    background: badgeBg,
                    color: badgeColor,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    borderRadius: 4,
                    padding: '3px 8px',
                    marginBottom: 12,
                  }}
                >
                  {s.badge}
                </span>

                {/* Client */}
                <h3
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: 18,
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    margin: '0 0 2px',
                  }}
                >
                  {s.client}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    margin: '0 0 16px',
                  }}
                >
                  {s.subtitle}
                </p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-x-5 gap-y-2">
                  {s.metrics.map((m, j) => (
                    <div key={j}>
                      <span
                        style={{
                          fontFamily: "'Fraunces', serif",
                          fontSize: 24,
                          fontWeight: 600,
                          color: numColor,
                          display: 'block',
                          lineHeight: 1.2,
                        }}
                      >
                        {m.num}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                        {m.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state for combined */}
        {filtered.length === 0 && (
          <p
            className="text-center py-12"
            style={{ color: 'var(--text-muted)', fontSize: 14, fontStyle: 'italic' }}
          >
            Combined case studies coming soon.
          </p>
        )}
      </div>
    </section>
  );
}
