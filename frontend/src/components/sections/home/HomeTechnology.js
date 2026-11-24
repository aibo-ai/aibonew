import { Link } from "react-router-dom";
import { Stat, Statement } from "./parts";

const STATS = [
  ["80%", "process automation rate"],
  ["10×", "operational velocity"],
  ["5×", "efficiency gains"],
  ["100%", "IP ownership to client"],
];

const ROWS = [
  {
    img: "/home/tech-ai.webp", name: "AI Automation", to: "/solutions/ai-automations",
    tagline: "Turn your biggest workflows into your biggest advantage.",
    desc: "Production-grade agentic systems, multi-step LLM workflows, RAG pipelines, intelligent automation, built to run at enterprise scale from day one.",
  },
  {
    img: "/home/tech-fullstack.webp", name: "Full Stack Development", to: "/solutions/full-stack",
    tagline: "Complete products, built to last.",
    desc: "From pixel-perfect frontends to high-throughput backend engines. You own 100% of the IP.",
  },
];

export default function HomeTechnology() {
  return (
    <section className="sec tech dark" id="technology" aria-labelledby="h-technology">
      <div className="wrap">
        <div className="row">
          <h2 className="sec-name side" id="h-technology">Technical services</h2>
          <div className="tech-main">
            <Statement lead="From AI pilots to production systems," pay="engineered to scale." />
            <p className="intro">
              Most AI projects never reach production and most dev partners vanish after handover. We build production-grade systems and stay accountable to outcomes, not billable hours.
            </p>
          </div>
          <div className="tech-sun">
            <img src="/home/sun.webp" width="1000" height="1000" loading="lazy" alt="" />
            <p className="stat-n">4–8 wks</p>
            <p className="stat-c">to production-ready MVP</p>
          </div>
        </div>

        <div className="tech-stats">
          {STATS.map(([n, c]) => <Stat key={c} n={n} c={c} />)}
        </div>

        <div className="tech-list">
          {ROWS.map((r) => (
            <article className="tech-row" key={r.to}>
              <img className="specimen" src={r.img} width="400" height="520" loading="lazy" alt="" />
              <div className="tech-t">
                <h4><Link to={r.to}>{r.name}</Link></h4>
                <p>{r.tagline}</p>
              </div>
              <p className="tech-d">{r.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
