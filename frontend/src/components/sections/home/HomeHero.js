import { ArrowRight, BookButton } from "./parts";

const CLIENTS = ["ITC", "Hansaplast", "ElasticRun", "OptimHire", "Trudiance", "Harmony", "Iluvia", "Fego", "vPersonalize"];

export default function HomeHero() {
  return (
    <>
      <section className="hero" id="hero" data-testid="hero-section" aria-labelledby="h-hero">
        <div className="wrap row hero-row">
          <div className="hero-copy">
            <h1 className="display" id="h-hero">Where great marketing meets serious engineering.</h1>
            <p className="lead">
              We help brands grow on two fronts: providing marketing services that generate demand and building technical products that deliver efficiency.
            </p>
            <div className="actions">
              <BookButton placement="hero" />
              <a className="link" href="#case-studies">View Case Studies <ArrowRight /></a>
            </div>
            <p className="hero-meta"><span>Boutique Agency</span><span>Marketing + Technology</span></p>
          </div>
          <figure className="meet">
            <img
              className="print"
              src="/home/meet.webp"
              width="1200"
              height="1000"
              fetchPriority="high"
              alt="A purple circle overlapping a grey square; where they meet, the inks print darker."
            />
            <figcaption>
              <span className="meet-cap m">Marketing</span>
              <span className="meet-cap t">Technology</span>
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="clients" aria-labelledby="h-clients">
        <div className="wrap row">
          <h2 className="sec-name side" id="h-clients">Trusted by</h2>
          <ul className="client-list">
            {CLIENTS.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </div>
      </section>
    </>
  );
}
