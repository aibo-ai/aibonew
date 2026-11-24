import { Stat, Statement } from "./parts";

const COLUMNS = [
  {
    title: "Marketing results",
    kpis: [
      ["+180%", "AI citation rate (GEO, 6 months)"],
      ["156%", "website conversion rate increase"],
      ["−63%", "reduction in customer acquisition cost"],
      ["92%", "growth in repeat purchase rate"],
    ],
  },
  {
    title: "Technical results",
    kpis: [
      ["80%", "data workflows automated"],
      ["5×", "efficiency gains from automation"],
      ["4–8 wks", "to production-ready MVP"],
      ["100%", "IP ownership transferred to client"],
    ],
  },
];

export default function HomeResults() {
  return (
    <section className="sec" id="case-studies" aria-labelledby="h-results">
      <div className="wrap">
        <div className="row">
          <h2 className="sec-name side" id="h-results">Proven results</h2>
          <div className="main">
            <Statement lead="Results across" pay="both practices." />
            <div className="results-grid">
              {COLUMNS.map((col) => (
                <div className="results-col" key={col.title}>
                  <h4>{col.title}</h4>
                  <div className="kpis">
                    {col.kpis.map(([n, c]) => <Stat key={c} n={n} c={c} />)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <figure className="quote">
          <img className="quote-disc print" src="/home/quote-disc.webp" width="1000" height="1000" loading="lazy" alt="" />
          <blockquote><p>“52% conversion increase in three months? That's not just growth.”</p></blockquote>
          <figcaption><b>Bala S</b>, CEO, vPersonalize</figcaption>
        </figure>
      </div>
    </section>
  );
}
