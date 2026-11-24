// Per-pillar differences for the "Print room" solutions pages (/solutions/:slug).
// Everything that is the same on all six pages lives in PillarSections.js;
// this file only holds what the design varies per page: the printed hero
// figure, the "Why this matters" number layout, and the GEO/AEO audit card.

const AUDITS = {
  // Anonymized findings from a real MyAibo GEO audit (B2B SaaS platform).
  geo: {
    name: "From an Actual MyAibo GEO Audit",
    lead: "Invisible where",
    pay: "buyers actually ask.",
    intro: "A recent audit for a B2B SaaS platform, anonymized. This is the gap most brands don’t know they have.",
    stats: [
      { n: "0%", c: "Visibility on unbranded category prompts" },
      { n: "0 / 5", c: "Topic clusters with any citation at all" },
      { n: "100", c: "Category-intent prompts tested" },
      { n: "6,700+", c: "AI citations analyzed to build the audit" },
    ],
    barsTitle: "Visibility by Topic Cluster",
    // The client scored 0% on every cluster; the grey bar is the category leader.
    bars: [
      { label: "Core platform category", width: 17, val: "Category leader: 17%", leader: true },
      { label: "Governance & compliance", width: 4, val: "Category leader: 4%", leader: true },
      { label: "Infrastructure & scaling", width: 4, val: "Category leader: 4%", leader: true },
      { label: "Interoperability & routing", width: 4, val: "Category leader: 4%", leader: true },
    ],
    note: "The brand dominates searches for its own name: branded queries pull detailed, positive answers. But the moment a prompt drops the brand and just describes the job to be done, it disappears entirely, even on platforms that cite it elsewhere. That’s a citation-supply problem, not a brand-strength one, and it’s exactly what a MyAibo GEO audit is built to find and fix.",
  },
  // Anonymized pre-engagement baseline from a real answer-engine visibility audit (BFSI / insurance).
  aeo: {
    name: "From an Actual MyAibo Visibility Audit",
    lead: "What “not in the answer”",
    pay: "actually looks like.",
    intro: "A recent audit for a BFSI / insurance brand, anonymized, pre-engagement baseline.",
    stats: [
      { n: "10%", c: "Visibility" },
      { n: "69%", c: "Competition" },
      { n: "33%", c: "Sentiment" },
      { n: "77%", c: "Alignment" },
    ],
    barsTitle: "Share of Voice by Topic",
    bars: [
      { label: "Core product category", width: 2.7, val: "2.7%" },
      { label: "Adjacent product line", width: 0, val: "0%" },
      { label: "Category comparison queries", width: 0, val: "0%" },
      { label: "Post-purchase / claims support", width: 0, val: "0%" },
    ],
    note: "High alignment (77%) means the brand’s own content is accurate and on-message where it does appear: this isn’t a messaging problem. Near-zero visibility on category and comparison queries means AI answer engines simply aren’t finding enough citable, structured content to draw from. That’s the exact gap AEO closes.",
  },
};

/**
 * hero.cls     class of the figure next to the hero copy (page CSS hook)
 * hero.img     printed art; omitted for SEO, whose hero shows only the big number
 * why          layout of the "Why this matters" numbers
 * whySkipHero  drop the hero's number from the why list (AI Automation shows 96% in the hero only)
 */
export const PILLARS = {
  geo: {
    short: "GEO",
    hero: { cls: "rings", img: { src: "/print/pillars/geo-rings.webp", w: 1200, h: 1200, print: true, alt: "Concentric purple rings spreading from one small amber dot." } },
    why: "rings",
    audit: AUDITS.geo,
  },
  aeo: {
    short: "AEO",
    hero: { cls: "zero", img: { src: "/print/pillars/aeo-zero.webp", w: 1000, h: 1000, print: true, alt: "A printed purple answer box raised above three faded grey result rows, with an amber dot marking the top." } },
    why: "boxes",
    audit: AUDITS.aeo,
  },
  seo: {
    short: "SEO",
    hero: { cls: "hero-big" },
    why: "strata",
    whyImg: { src: "/print/pillars/seo-strata.webp", w: 1600, h: 760, alt: "Layers of printed ink rising from left to right." },
  },
  "content-marketing": {
    short: "Content Marketing",
    hero: { cls: "lobes", img: { src: "/print/pillars/content-sheets.webp", w: 1000, h: 1100, print: true, alt: "Three printed sheets in grey, purple and plum, stepping upward and overlapping, with a small amber dot on the top sheet." } },
    why: "sheets",
  },
  "ai-automations": {
    short: "AI Automation",
    hero: { cls: "dial", img: { src: "/print/pillars/automation-dial.webp", w: 1200, h: 700, print: true, alt: "A plum half-disc dial with white tick marks and one amber hand." } },
    why: "arc",
    whySkipHero: true,
  },
  "full-stack": {
    short: "Full Stack",
    hero: { cls: "bld", img: { src: "/print/pillars/fullstack-building.webp", w: 900, h: 1200, alt: "A tall plum block with rows of paper windows, two lit amber." } },
    why: "floors",
  },
};
