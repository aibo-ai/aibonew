import SEO from "@/components/SEO";
import { PrintPage, Crumb, BookButton, TextLink, SecHead, CtaSection, ArrowRight } from "@/components/print";
import "@/components/print/company/about.css";

const PAGE = "/about";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "24/7", label: "Support" },
];

const founders = [
  {
    initials: "TB",
    name: "Tathagat Bagchi",
    role: "Co-Founder",
    background: "Flipkart · InMobi",
    description: "Sales leader with 15+ years at Flipkart and InMobi. Now making AI-driven solutions accessible.",
    linkedin: "https://www.linkedin.com/in/tathagatbagchi/",
  },
  {
    initials: "VK",
    name: "Vamsi Krishna Kaki",
    role: "Co-Founder",
    background: "Zomato · Leena.ai",
    description: "Marketing leader with 15+ years at Zomato and Leena.ai. Now combining product thinking with AI to create transformative solutions.",
    linkedin: "https://www.linkedin.com/in/vamsi-krishna-kaki-3a502229/",
  },
];

const testId = (s) => s.toLowerCase().replace(/\s+/g, "-");

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About MyAibo — Marketing & AI Technology Agency"
        description="Founded by veterans from Flipkart, InMobi, Zomato, and Leena.ai. MyAibo combines deep marketing and AI engineering expertise under one roof."
        path="/about"
      />
      <PrintPage className="pg-about">
        {/* Hero: the vision inside a paper arch cut from a plum ink field */}
        <section className="hero" data-testid="about-vision-section" aria-labelledby="h-hero">
          <div className="wrap">
            <Crumb items={[{ label: "Home", to: "/" }, { label: "About" }]} />
            <p className="kicker" style={{ marginTop: "var(--pr-s2)" }}>About MyAibo</p>
            <figure className="arch">
              <img src="/print/company/about-arch.webp" width="1600" height="1000" alt="" />
              <div className="arch-in">
                <h1 className="display" id="h-hero">Our Vision: To empower every client to grow without limits</h1>
                <div className="actions">
                  <BookButton page={PAGE} placement="hero" />
                  <TextLink to="/case-studies">View Case Studies</TextLink>
                </div>
              </div>
              <div className="arch-stat stat">
                <p className="stat-n">30+</p>
                <p className="stat-c">years of combined experience: Flipkart, InMobi, Zomato &amp; Leena.ai</p>
              </div>
            </figure>
          </div>
        </section>

        {/* By the numbers: a three-step ladder */}
        <section className="sec" id="numbers" data-testid="about-stats-section" aria-labelledby="h-numbers">
          <div className="wrap">
            <SecHead id="h-numbers" name="By the numbers" lead="A boutique team," pay="measured by outcomes." />
            <div className="ladder">
              {stats.map((s, i) => (
                <div className="rung" key={s.label} data-testid={`stat-${testId(s.label)}`}>
                  <p className="n">{String(i + 1).padStart(2, "0")}</p>
                  <p className="stat-n">{s.value}</p>
                  <p className="stat-c">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Founders: printed monograms */}
        <section className="sec paper-white" id="founders" data-testid="about-founders-section" aria-labelledby="h-founders">
          <div className="wrap">
            <SecHead id="h-founders" name="Founders" lead="Industry veterans," pay="30+ years combined.">
              <p className="intro">
                Industry veterans with 30+ years of combined experience. They bring a unique perspective on building scalable technology, informed by experience spanning early-stage startups to billion-dollar enterprises.
              </p>
            </SecHead>
            <div className="founders">
              {founders.map((f) => (
                <article className="founder" key={f.name} data-testid={`founder-${testId(f.name)}`}>
                  <div className="monogram" aria-hidden="true">{f.initials}</div>
                  <div>
                    <h4>{f.name}</h4>
                    <p className="role"><b>{f.role}</b>{f.background}</p>
                    <p className="bio">{f.description}</p>
                    <p>
                      <a className="link" href={f.linkedin} target="_blank" rel="noopener noreferrer" data-testid={`linkedin-${testId(f.name)}`}>
                        Connect on LinkedIn <ArrowRight />
                      </a>
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <CtaSection page={PAGE} />
      </PrintPage>
    </>
  );
}
