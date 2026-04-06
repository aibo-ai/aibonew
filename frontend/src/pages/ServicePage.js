import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowDown, ArrowRight, Check, X } from "lucide-react";
import SectionLabel from "@/components/sections/SectionLabel";
import { BOOKING_URL } from "@/lib/constants";
import { geoData } from "@/data/geoData";
import { aeoData } from "@/data/aeoData";
import { seoData } from "@/data/seoData";
import { contentMarketingData } from "@/data/contentMarketingData";

const dataMap = {
  geo: geoData,
  aeo: aeoData,
  seo: seoData,
  'content-marketing': contentMarketingData,
};

export default function ServicePage() {
  const { slug } = useParams();
  const data = dataMap[slug];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!data) {
    return (
      <div style={{ padding: '160px 40px 80px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 300, color: 'var(--text-primary)' }}>
          Page not found
        </h1>
        <Link to="/" className="btn-purple inline-flex mt-6" style={{ padding: '12px 24px', fontSize: 14 }}>
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main>
      {/* ─── HERO ─── */}
      <section
        className="relative"
        style={{ background: 'var(--dark)', padding: '140px 40px 72px', overflow: 'hidden' }}
      >
        <div className="absolute pointer-events-none" style={{ width: 560, height: 560, top: -100, right: -100, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,59,237,0.18) 0%, transparent 68%)' }} />
        <div className="relative z-10 mx-auto" style={{ maxWidth: 720 }}>
          {/* Breadcrumb */}
          <div className="mb-5" style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>Home</Link>
            <span className="mx-2">/</span>
            <span style={{ color: '#A07AF0' }}>{data.pageTitle}</span>
          </div>
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-5" style={{ background: 'rgba(124,59,237,0.15)', border: '1px solid rgba(124,59,237,0.35)', borderRadius: 20, padding: '5px 14px' }}>
            <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', display: 'block', flexShrink: 0 }} />
            <span style={{ color: '#A07AF0', fontSize: 12, fontWeight: 500 }}>{data.eyebrow}</span>
          </div>
          <h1 className="headline-dark" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(36px, 5vw, 60px)', letterSpacing: '-1.5px', color: '#fff', lineHeight: 1.1, margin: '0 0 18px' }}>
            {data.headline}
          </h1>
          <p style={{ fontSize: 17, fontWeight: 300, color: 'rgba(255,255,255,0.62)', lineHeight: 1.6, margin: '0 0 28px', maxWidth: 580 }}>
            {data.subheadline}
          </p>
          <div className="flex flex-wrap gap-3">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-purple" style={{ padding: '13px 24px', fontSize: 15, fontWeight: 500 }}>
              <Calendar size={16} /> Book Free Strategy Session
            </a>
            <a href="#intro" className="btn-outline-light" style={{ padding: '12px 22px', fontSize: 15, fontWeight: 500 }}>
              {data.ctaSecondary} <ArrowDown size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ─── INTRO ─── */}
      <section id="intro" style={{ background: 'var(--white)', padding: '80px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <SectionLabel text={data.intro.label} />
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 20px', lineHeight: 1.15 }}>
            {data.intro.headline}
          </h2>
          {data.intro.body.map((p, i) => (
            <p key={i} style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.7, margin: '0 0 14px' }}>{p}</p>
          ))}
          {/* Callout */}
          <div className="mt-8 flex gap-5 items-start" style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.2)', borderRadius: 12, padding: '24px 28px' }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 42, fontWeight: 600, color: 'var(--purple)', lineHeight: 1, flexShrink: 0 }}>
              {data.intro.calloutStat}
            </span>
            <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>
              {data.intro.calloutText}
            </p>
          </div>
        </div>
      </section>

      {/* ─── BEFORE vs AFTER ─── */}
      <section style={{ background: 'var(--off-white)', padding: '80px 40px' }}>
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 gap-6" style={{ maxWidth: 900 }}>
          {/* Without */}
          <div style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 12, padding: 28 }}>
            <div className="flex items-center gap-2 mb-5">
              <X size={18} style={{ color: 'var(--text-muted)' }} />
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: 0 }}>
                {data.comparison.without.title}
              </h3>
            </div>
            {data.comparison.without.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--text-muted)', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
          {/* With */}
          <div style={{ background: 'var(--dark)', borderRadius: 12, padding: 28 }}>
            <div className="flex items-center gap-2 mb-5">
              <Check size={18} style={{ color: '#A07AF0' }} />
              <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: '#fff', margin: 0 }}>
                {data.comparison.with.title}
              </h3>
            </div>
            {data.comparison.with.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3 mb-3">
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--purple)', marginTop: 7, flexShrink: 0 }} />
                <span style={{ fontSize: 14, fontWeight: 300, color: 'rgba(255,255,255,0.72)', lineHeight: 1.55 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 800 }}>
          <SectionLabel text={data.process.label} />
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 36px', lineHeight: 1.15 }}>
            {data.process.headline}
          </h2>
          <div className="space-y-6">
            {data.process.steps.map((s) => (
              <div key={s.num} className="flex gap-5" style={{ borderLeft: '2px solid var(--purple)', paddingLeft: 24 }}>
                <div className="flex-shrink-0 flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--purple-light)', fontFamily: "'Fraunces', serif", fontSize: 14, fontWeight: 600, color: 'var(--purple-dark)' }}>
                  {s.num}
                </div>
                <div className="flex-1">
                  <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 6px' }}>{s.title}</h3>
                  <p style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: '0 0 8px' }}>{s.body}</p>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--purple-dark)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                    Deliverable: {s.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DELIVERABLES ─── */}
      <section style={{ background: 'var(--off-white)', padding: '80px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-10">
            <SectionLabel text={data.deliverables.label} centered />
            <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
              {data.deliverables.headline}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.deliverables.cards.map((c, i) => (
              <div key={i} className="card-lift" style={{ background: 'var(--white)', border: '1px solid var(--border-clr)', borderRadius: 12, padding: 28 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: 'var(--text-primary)', margin: '0 0 8px' }}>{c.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY NOW (dark) ─── */}
      <section className="relative" style={{ background: 'var(--dark)', padding: '80px 40px', overflow: 'hidden' }}>
        <div className="absolute pointer-events-none" style={{ width: 560, height: 560, top: -200, left: -200, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,59,237,0.16) 0%, transparent 65%)' }} />
        <div className="relative z-10 mx-auto" style={{ maxWidth: 1100 }}>
          <div className="text-center mb-10">
            <SectionLabel text={data.whyNow.label} dark centered />
            <h2 style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: '#fff', margin: 0, lineHeight: 1.15 }}>
              {data.whyNow.headline}
            </h2>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1 mb-12" style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 8, overflow: 'hidden' }}>
            {data.whyNow.stats.map((s, i) => (
              <div key={i} className="text-center" style={{ background: 'rgba(255,255,255,0.025)', padding: '24px 16px' }}>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 32, fontWeight: 600, color: 'var(--purple)', display: 'block', lineHeight: 1.1 }}>{s.num}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.4, display: 'block', marginTop: 6 }}>{s.label}</span>
              </div>
            ))}
          </div>
          {/* Context cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {data.whyNow.contextCards.map((c, i) => (
              <div key={i} style={{ background: 'rgba(255,255,255,0.045)', border: '1px solid rgba(255,255,255,0.075)', borderRadius: 12, padding: 28 }}>
                <h3 style={{ fontFamily: "'Fraunces', serif", fontSize: 17, fontWeight: 600, color: '#fff', margin: '0 0 8px' }}>{c.title}</h3>
                <p style={{ fontSize: 13, fontWeight: 300, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, margin: 0 }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── RESULTS ─── */}
      <section style={{ background: 'var(--white)', padding: '80px 40px' }}>
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          <div className="text-center mb-10">
            <SectionLabel text={data.results.label} centered />
            <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: 0, lineHeight: 1.15 }}>
              {data.results.headline}
            </h2>
          </div>
          {/* Metrics table */}
          <div style={{ background: 'var(--off-white)', border: '1px solid var(--border-clr)', borderRadius: 12, overflow: 'hidden', marginBottom: 32 }}>
            <div className="grid grid-cols-2" style={{ borderBottom: '1px solid var(--border-clr)', padding: '14px 28px', background: 'var(--white)' }}>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Metric</span>
              <span style={{ fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>Result</span>
            </div>
            {data.results.metrics.map((m, i) => (
              <div key={i} className="grid grid-cols-2" style={{ padding: '14px 28px', borderBottom: i < data.results.metrics.length - 1 ? '1px solid var(--border-clr)' : 'none' }}>
                <span style={{ fontSize: 14, fontWeight: 300, color: 'var(--text-secondary)' }}>{m.metric}</span>
                <span style={{ fontFamily: "'Fraunces', serif", fontSize: 18, fontWeight: 600, color: 'var(--purple-dark)' }}>{m.result}</span>
              </div>
            ))}
          </div>
          {/* Testimonial */}
          <div style={{ background: 'var(--purple-light)', border: '1px solid rgba(124,59,237,0.2)', borderRadius: 12, padding: 28 }}>
            <span style={{ fontFamily: "'Fraunces', serif", fontSize: 28, color: 'var(--purple)', display: 'block', marginBottom: 6, lineHeight: 1 }}>&ldquo;</span>
            <p style={{ fontSize: 15, fontWeight: 300, color: 'var(--text-primary)', lineHeight: 1.7, fontStyle: 'italic', margin: '0 0 16px' }}>
              {data.results.testimonial.quote}
            </p>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center" style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(124,59,237,0.2)', color: 'var(--purple-dark)', fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                {data.results.testimonial.initials}
              </div>
              <div>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)', margin: 0 }}>{data.results.testimonial.author}</p>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', margin: 0 }}>{data.results.testimonial.role}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── INTEGRATED STACK NOTE ─── */}
      <div style={{ background: 'var(--off-white)', padding: '0 40px 0' }}>
        <div className="mx-auto flex items-center gap-4" style={{ maxWidth: 900, background: 'var(--dark)', borderRadius: 8, padding: '16px 28px' }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--purple)', flexShrink: 0 }} />
          <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: 13, fontStyle: 'italic' }}>
            Running GEO + AEO + SEO + Content as one integrated system? Clients who do see 3&ndash;5&times; the return of single-service engagements. Ask us about the Full Marketing Stack.
          </span>
        </div>
      </div>

      {/* ─── FINAL CTA ─── */}
      <section style={{ background: 'var(--off-white)', padding: '64px 40px 80px' }}>
        <div className="mx-auto text-center" style={{ maxWidth: 500 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--purple-dark)', display: 'block', marginBottom: 16 }}>
            Get Started
          </span>
          <h2 className="headline-light" style={{ fontFamily: "'Fraunces', serif", fontWeight: 300, fontSize: 'clamp(28px, 3.5vw, 42px)', letterSpacing: '-1px', color: 'var(--text-primary)', margin: '0 0 12px', lineHeight: 1.15 }}>
            {data.finalCta.headline}
          </h2>
          <p style={{ fontSize: 16, fontWeight: 300, color: 'var(--text-secondary)', lineHeight: 1.6, maxWidth: 460, margin: '0 auto 24px' }}>
            {data.finalCta.body}
          </p>
          <div className="flex flex-wrap justify-center gap-3 mb-3">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn-purple inline-flex" style={{ padding: '14px 28px', fontSize: 15, fontWeight: 500 }}>
              <Calendar size={16} /> Book Free Strategy Session
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="selection-btn">
              {data.finalCta.ctaSecondary} <ArrowRight size={14} />
            </a>
          </div>
          <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 12 }}>
            Free &middot; No commitment &middot; 30 minutes
          </p>
        </div>
      </section>
    </main>
  );
}
