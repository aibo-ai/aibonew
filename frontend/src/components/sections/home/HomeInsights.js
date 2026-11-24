import { Link } from "react-router-dom";
import { ArrowRight, Statement } from "./parts";

// Curated, not fetched: static links land in the prerendered HTML crawlers see.
const POSTS = [
  {
    slug: "website-speed-architecture-seo-ai-ranking-factor",
    img: "/home/spec-technology.webp",
    tag: "SEO",
    title: "Website speed & architecture: the ranking factor marketing teams keep outsourcing to no one",
    excerpt: "Site speed and architecture aren't just Google ranking signals anymore. They decide whether AI engines cite you.",
  },
  {
    slug: "topical-authority-replacing-keywords",
    img: "/home/svc-aeo.webp",
    tag: "SEO",
    title: "What is topical authority, and how it's replacing keywords as the #1 SEO signal",
    excerpt: "Google no longer rewards pages that mention the right keywords. It rewards websites that genuinely own a subject.",
  },
  {
    slug: "ai-native-agency-vs-traditional-marketing-agency",
    img: "/home/why-2.webp",
    tag: "AI-Native Agency",
    title: "AI-native agency vs. traditional marketing agency: how to choose in 2026",
    excerpt: "Every marketing leader evaluating agency partners in 2026 faces a question that didn't exist five years ago.",
  },
];

export default function HomeInsights() {
  return (
    <section className="sec paper-white" id="insights" data-testid="latest-insights-section" aria-labelledby="h-insights">
      <div className="wrap">
        <div className="row">
          <h2 className="sec-name side" id="h-insights">Latest insights</h2>
          <div className="main">
            <Statement lead="What we're seeing in" pay="GEO, AEO & SEO." />
            <p className="intro"><Link className="link" to="/blogs">All articles <ArrowRight /></Link></p>
          </div>
        </div>
        <div className="posts">
          {POSTS.map((p) => (
            <Link className="post" to={`/blog/${p.slug}`} key={p.slug}>
              <div className="poster paper-lav"><img className="print" src={p.img} width="400" height="520" loading="lazy" alt="" /></div>
              <div className="post-tag">{p.tag}</div>
              <h4>{p.title}</h4>
              <p>{p.excerpt}</p>
              <div className="post-more">Read more <ArrowRight /></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
