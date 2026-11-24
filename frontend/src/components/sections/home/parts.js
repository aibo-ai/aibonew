import { BOOKING_URL } from "@/lib/constants";
import { trackBookingClick } from "@/lib/analytics";

// Small stroke icons used across the homepage sections.
export function ArrowRight() {
  return (
    <svg className="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" /></svg>
  );
}

export function ArrowUpRight({ small = false }) {
  return (
    <svg className={small ? "ic ic-sm" : "ic"} viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11L11 5M6 5h5v5" /></svg>
  );
}

export function ArrowUp() {
  return (
    <svg className="ic" viewBox="0 0 16 16" aria-hidden="true"><path d="M8 13V3M4 7l4-4 4 4" /></svg>
  );
}

// Two-beat serif headline: a roman lead-in and a purple payoff line.
export function Statement({ lead, pay, as: Tag = "h3", className = "statement" }) {
  return (
    <Tag className={className}>
      <span className="beat">{lead}</span>
      <span className="beat pay">{pay}</span>
    </Tag>
  );
}

export function BookButton({ placement }) {
  return (
    <a
      className="btn btn-primary btn-lg"
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackBookingClick({ page: "/", placement })}
    >
      Book Free Strategy Session
    </a>
  );
}

export function Stat({ n, c }) {
  return (
    <div className="stat">
      <p className="stat-n">{n}</p>
      <p className="stat-c">{c}</p>
    </div>
  );
}
