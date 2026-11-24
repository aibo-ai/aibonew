import { Statement } from "./parts";

const REASONS = [
  ["Boutique by Design", "Every engagement gets experienced hands, not a hand-off to someone who wasn't in the briefing."],
  ["AI-Native Across Both Practices", "Our marketing team uses AI to build organic authority. Our tech team builds the AI systems themselves. No other agency bridges both practices at depth."],
  ["Modular & Scalable", "Every service is designed to compound. Start with one, add others as you grow. The architecture supports it from day one, not retrofitted later."],
  ["Outcome-Driven, Not Hours-Driven", "Engagements are structured around measurable KPIs, not retainer hours. We own the outcome. No black-box metrics, no hidden costs."],
  ["Complete Transparency", "Every deliverable ties to a result you can verify independently. No surprises during development."],
  ["Deep Market Expertise", "Specialist knowledge in FMCG, D2C, Logistics, Healthcare, FinTech, SaaS and more."],
];

export default function HomeWhy() {
  return (
    <section className="sec paper-white" id="why" aria-labelledby="h-why">
      <div className="wrap">
        <div className="row">
          <h2 className="sec-name side" id="h-why">Why MyAibo</h2>
          <div className="main">
            <Statement lead="Six reasons" pay="clients stay." />
          </div>
        </div>
        <div className="why-grid">
          {REASONS.map(([title, body], i) => (
            <article className="why-item" key={title}>
              <img className="print" src={`/home/why-${i + 1}.webp`} width="360" height="360" loading="lazy" alt="" />
              <p className="why-n">{String(i + 1).padStart(2, "0")}</p>
              <h4>{title}</h4>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
