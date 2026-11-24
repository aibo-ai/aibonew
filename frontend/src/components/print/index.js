// Shared building blocks for "Print room" pages (styles in src/styles/print.css,
// everything scoped under .pr). Page-specific layout lives with each page.
import { useState } from "react";
import { Link } from "react-router-dom";
import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";
import { ArrowRight, Statement } from "@/components/sections/home/parts";
import "@/styles/print.css";

export { ArrowRight, ArrowUpRight, ArrowUp, Statement, Stat } from "@/components/sections/home/parts";

/** Page wrapper: <main class="pr">. Pass extra classes for page-specific CSS hooks. */
export function PrintPage({ className = "", children }) {
  return <main className={`pr ${className}`.trim()}>{children}</main>;
}

/** Breadcrumb trail. items: [{ label, to? }]; the last item is the current page. */
export function Crumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <p className="crumb">
        {items.map((it, i) => (
          <span key={i}>{it.to && i < items.length - 1 ? <Link to={it.to}>{it.label}</Link> : it.label}</span>
        ))}
      </p>
    </nav>
  );
}

/** Calendly booking button with the site's conversion tracking. */
export function BookButton({ page, placement, size = "lg", label = "Book Free Strategy Session" }) {
  return (
    <a
      className={`btn btn-primary${size === "lg" ? " btn-lg" : ""}`}
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBookingClick({ page, placement })}
    >
      {label}
    </a>
  );
}

/** Arrow text link; internal paths use the router, others open as plain anchors. */
export function TextLink({ to, children, className = "link" }) {
  const external = /^(https?:|mailto:)/.test(to);
  if (external) {
    return <a className={className} href={to} target={to.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{children} <ArrowRight /></a>;
  }
  if (to.startsWith("#")) return <a className={className} href={to}>{children} <ArrowRight /></a>;
  return <Link className={className} to={to}>{children} <ArrowRight /></Link>;
}

/** Standard section head: section name in the left rail, two-beat statement in the main column. */
export function SecHead({ id, name, lead, pay, children, mainClass = "main" }) {
  return (
    <div className="row">
      <h2 className="sec-name side" id={id}>{name}</h2>
      <div className={mainClass}>
        <Statement lead={lead} pay={pay} />
        {children}
      </div>
    </div>
  );
}

/** FAQ block: intro on the left, accordion on the right. First item starts open. */
export function Faq({ items, intro = "Here's what founders and marketing leads ask us most.", page, id = "faq" }) {
  const [open, setOpen] = useState(0);
  if (!items || items.length === 0) return null;
  return (
    <section className="sec paper-white" id={id} aria-labelledby={`h-${id}`}>
      <div className="wrap">
        <div className="faq">
          <div className="faq-side">
            <h2 className="sec-name" id={`h-${id}`}>FAQ</h2>
            <Statement lead="Everything you need" pay="to know." />
            <p className="intro">{intro}</p>
            <p className="actions" style={{ marginTop: "var(--pr-s3)" }}>
              <a className="link" href={BOOKING_URL} target="_blank" rel="noopener noreferrer" onClick={() => trackBookingClick({ page, placement: "faq" })}>
                Book a call <ArrowRight />
              </a>
            </p>
          </div>
          <div className="faq-list">
            {items.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className="q" key={f.q}>
                  <h4>
                    <button type="button" aria-expanded={isOpen} aria-controls={`${id}-a${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                      {f.q}<span aria-hidden="true">{isOpen ? "−" : "+"}</span>
                    </button>
                  </h4>
                  <p id={`${id}-a${i}`} hidden={!isOpen}>{f.a}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Testimonial printed over a tint disc. */
export function Quote({ text, name, role, initials }) {
  return (
    <figure className="quote">
      <img className="quote-disc print" src="/home/quote-disc.webp" width="1000" height="1000" loading="lazy" alt="" />
      <blockquote><p>{text}</p></blockquote>
      <figcaption>
        {initials && <span className="mono" aria-hidden="true">{initials}</span>}
        <span>{name && <b style={{ color: "var(--pr-ink)", fontWeight: 500 }}>{name}</b>}{name && role ? ", " : ""}{role}</span>
      </figcaption>
    </figure>
  );
}

/** Closing call to action with the seedling print. Same on every page. */
export function CtaSection({ page }) {
  return (
    <section className="sec" id="start" aria-labelledby="h-start">
      <div className="wrap row cta-row">
        <div className="cta-copy">
          <h2 className="sec-name" id="h-start">Get started</h2>
          <Statement as="h3" className="cta-title" lead="Ready to" pay="start growing?" />
          <div className="actions"><BookButton page={page} placement="final_cta" /></div>
          <p className="terms"><span>Free</span><span>No commitment</span><span>30 minutes</span></p>
        </div>
        <img
          className="seedling print"
          src="/home/seedling.webp"
          width="900"
          height="1100"
          loading="lazy"
          alt="A seedling with two leaves and an amber bud, printed over a pale purple sun."
        />
      </div>
    </section>
  );
}
