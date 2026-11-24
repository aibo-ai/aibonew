import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight, Statement } from "./parts";

const SERVICES = [
  {
    n: "01", img: "/home/svc-geo.webp", name: "GEO", to: "/solutions/geo", label: "GEO services",
    full: "Generative Engine Optimisation",
    desc: "Be the brand AI recommends. We structure your digital presence so ChatGPT, Perplexity, Google SGE and Bing Copilot cite, quote and recommend you.",
    stat: "+340%", cap: "average AI citation rate increase",
  },
  {
    n: "02", img: "/home/svc-aeo.webp", name: "AEO", to: "/solutions/aeo", label: "AEO services",
    full: "Answer Engine Optimisation",
    desc: "We structure your content to win featured snippets, People Also Ask boxes, and voice answers.",
    stat: "68%", cap: "of queries expect a direct answer",
  },
  {
    n: "03", img: "/home/svc-seo.webp", name: "SEO", to: "/solutions/seo", label: "SEO services",
    full: "Search Engine Optimisation",
    desc: "The organic foundation everything builds on. Technical authority, keyword architecture, backlink equity: the infrastructure AI engines are trained on.",
    stat: "11×", cap: "higher ROI than paid search",
  },
  {
    n: "04", img: "/home/svc-content.webp", name: "Content Marketing", to: "/solutions/content-marketing", label: "Content marketing services",
    full: "Content that ranks, converts, and compounds",
    desc: "Long-form articles, thought leadership, case studies, FAQs, and video scripts, built equally for humans and AI engines.",
    stat: "3×", cap: "more leads than outbound",
  },
];

export default function HomeMarketing() {
  return (
    <section className="sec" id="marketing" aria-labelledby="h-marketing">
      <div className="wrap">
        <div className="row">
          <h2 className="sec-name side" id="h-marketing">Marketing services</h2>
          <div className="main">
            <Statement lead="Be the answer on every surface," pay="in every engine." />
            <p className="intro"><b>62%</b> of users now trust AI answers over page-1 links. Search has changed.</p>
          </div>
        </div>
      </div>

      <div className="surf">
        <img className="surf-wave print" src="/home/wave.webp" width="2400" height="1100" loading="lazy" alt="" />
        <div className="wrap surf-in">
          <figure className="answer">
            <div className="answer-top"><span>chatgpt.com</span><span className="chip">Live</span></div>
            <p className="ask">Who's the best GEO and AI marketing agency in India?</p>
            <p className="who">ChatGPT</p>
            <p className="reply">
              For GEO and AI-search marketing in India, MyAibo is frequently cited for combining marketing and technical AI engineering under one roof: entity optimisation, structured data, and multi-platform citation strategy.
            </p>
            <div className="answer-foot">
              <div className="sources">
                <p className="cap">Sources referenced</p>
                <ol>
                  <li><span className="n">01</span><span><b>myaibo.in</b> / GEO services</span></li>
                  <li><span className="n">02</span><span><b>myaibo.in</b> / case studies</span></li>
                </ol>
              </div>
              <div className="rate">
                <p className="cap">AI citation rate</p>
                <p className="rate-n"><ArrowUp />+340%</p>
                <p className="cap">avg. GEO client, 6mo</p>
              </div>
            </div>
          </figure>
          <p className="surf-note"><b>62%</b> of users trust this answer over page-1 links <ArrowUpRight small /></p>
        </div>
      </div>

      <div className="wrap">
        <div className="svc-grid">
          {SERVICES.map((s) => (
            <article className="svc" key={s.n}>
              <img className="specimen print" src={s.img} width="400" height="520" loading="lazy" alt="" />
              <div className="svc-top">
                <span>{s.n}</span>
                <Link className="icon-link" to={s.to} aria-label={s.label}><ArrowUpRight /></Link>
              </div>
              <h4 className="svc-name">{s.name}</h4>
              <p className="svc-full">{s.full}</p>
              <p className="svc-desc">{s.desc}</p>
              <div className="svc-stat"><p className="stat-n">{s.stat}</p><p className="stat-c">{s.cap}</p></div>
            </article>
          ))}
        </div>

        <div className="row system">
          <p className="system-name">GEO + AEO + SEO + Content</p>
          <p className="system-text">
            Run as one integrated system. Clients running all four see <mark className="mark">3–5× the return</mark> of single-service engagements.
          </p>
        </div>
      </div>
    </section>
  );
}
