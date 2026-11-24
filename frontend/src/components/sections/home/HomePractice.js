import { Link } from "react-router-dom";
import { Statement } from "./parts";

const PRACTICES = [
  {
    img: "/home/spec-marketing.webp",
    title: "Marketing that compounds.",
    body: "We build the organic infrastructure that makes brands findable on any search engine, LLM platform and in the minds of the right audience. From GEO and AEO to SEO and content marketing, every service compounds into a lasting authority.",
    label: "Marketing services",
    tags: [
      ["GEO", "/solutions/geo"],
      ["AEO", "/solutions/aeo"],
      ["SEO", "/solutions/seo"],
      ["Content marketing", "/solutions/content-marketing"],
    ],
  },
  {
    img: "/home/spec-technology.webp",
    title: "Technology that scales.",
    body: "We build AI systems, platforms and products that remove operational ceilings. Agentic AI workforces, white-label platforms and full-stack products engineered for enterprise, delivered at boutique speed.",
    label: "Technology services",
    tags: [
      ["AI automation", "/solutions/ai-automations"],
      ["Full stack dev", "/solutions/full-stack"],
    ],
  },
];

export default function HomePractice() {
  return (
    <section className="sec paper-white" id="practice" aria-labelledby="h-practice">
      <div className="wrap">
        <div className="row">
          <h2 className="sec-name side" id="h-practice">Our practice</h2>
          <div className="main">
            <Statement lead="We're not a vendor." pay="We're your growth partner." />
            <p className="intro">
              One agency. Two deep practice areas. Built to work around your specific growth challenge. No generalist fluff. Just deep expertise in both.
            </p>
            <div className="duo">
              {PRACTICES.map((p) => (
                <article className="practice" key={p.title}>
                  <img className="specimen print" src={p.img} width="400" height="520" loading="lazy" alt="" />
                  <h4 className="title">{p.title}</h4>
                  <p>{p.body}</p>
                  <ul className="tags" aria-label={p.label}>
                    {p.tags.map(([name, to]) => (
                      <li key={to}><Link className="tag" to={to}>{name}</Link></li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
