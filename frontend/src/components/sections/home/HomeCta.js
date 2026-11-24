import { BookButton, Statement } from "./parts";

export default function HomeCta() {
  return (
    <section className="sec" id="start" aria-labelledby="h-start">
      <div className="wrap row cta-row">
        <div className="cta-copy">
          <h2 className="sec-name" id="h-start">Get started</h2>
          <Statement as="h3" className="cta-title" lead="Ready to" pay="start growing?" />
          <div className="actions">
            <BookButton placement="final_cta" />
          </div>
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
