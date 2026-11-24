// Per-page layout choices for the 20 sub-service (cluster) pages, read off the
// design artboards (LLMOptimization.dc.html + Sub*.dc.html). Copy comes from
// clusterPagesData.js; this file only picks layout variants, art and the few
// bits of headline/stat typography the design sets by hand.
//
// hero:    1 copy left / print right, box under print   2 print left / box in copy
//          3 big head, print right, lead + box below     5 head split, wide printed strip + sheet
//          6 copy left / print on a white sheet right
// sheet:   (hero 5 only) 'mid' | 'over' | 'wide' | 'mid below'
// problem: 0-6   work: 1 notes, 2 rows, 3 cards, 4 alternating, 5 dark columns, 6 split list
// frame:   1 cards, 2 track, 3 stairs, 4 gantt, 5 big numbers (dark), 6 tiles
// related: 1 plum, 2 white + round arrow, 3 rows, 4 purple, 5 midnight, 6 tickets
// pay:     the h1's second beat, exactly as the design breaks it
// stat:    big figure for the statbox (statBadge is the caption). No stat and a
//          statBadge -> claim box; no statBadge -> "What's inside" list.
// extra:   optional extraSection styling (x1/x2/x3) and its heading's second beat

const C = {
  'llmo-company': {
    hero: 1, problem: 0, work: 1, frame: 1, related: 1,
    pay: 'Not a Footnote', stat: '500',
    alt: 'A giant printed purple asterisk.',
  },
  'perplexity-gemini-chatgpt-optimization': {
    hero: 1, problem: 2, work: 2, frame: 4, related: 3,
    pay: 'Before Your Competitor Does', stat: '300',
    alt: 'Four overlapping printed discs, one for each AI platform, with an amber dot where they all meet.',
  },
  'zero-click-search-synthetic-traffic': {
    hero: 2, problem: 3, work: 5, frame: 2, related: 2,
    pay: 'for the Click', stat: '60%+',
    alt: 'A cursor arrow stopped just outside a printed target ring with an amber centre.',
  },
  'reddit-community-seeding': {
    hero: 6, problem: 6, work: 4, frame: 6, related: 5,
    pay: 'Is Your Brand In It?', stat: '46.7%',
    alt: 'Three nested comment blocks in a thread, with an amber upvote arrow.',
    extra: { variant: 'x1', ink: 'dark ink-plum', pay: 'and AEO Work' },
  },
  'quora-content-seeding': {
    hero: 3, problem: 5, work: 3, frame: 5, related: 4,
    pay: 'Buyers Doing Research.',
    alt: 'A large printed purple question mark with an amber dot.',
    extra: { variant: 'x3', ink: 'paper-white', pay: 'Where This Fits' },
  },
  'wikipedia-page-creation': {
    hero: 5, sheet: 'wide', problem: 4, work: 6, frame: 3, related: 6,
    pay: "It Still Doesn't Have a Page.",
    alt: 'An open book with an amber bookmark and reference lines on either side.',
    extra: { variant: 'x2', ink: 'dark ink-mid', pay: 'a DIY Task' },
  },
  'llm-bot-compliance-llms-txt': {
    hero: 2, problem: 4, work: 3, frame: 4, related: 1,
    pay: 'Control How LLMs Access Your Content',
    alt: 'A printed file sheet with a folded corner and an amber check mark.',
  },
  'semantic-faq-knowledge-graph-schema': {
    hero: 1, problem: 6, work: 6, frame: 1, related: 2,
    pay: 'Your Content Machine-Extractable', stat: '60–90',
    alt: 'A printed graph of linked nodes, one of them amber.',
  },
  'programmatic-seo-engine': {
    hero: 5, sheet: 'mid', problem: 2, work: 1, frame: 6, related: 3,
    pay: 'Manual Content Production', stat: '6–12',
    alt: 'A grid of many small printed page tiles, a few in amber.',
  },
  'topical-authority-entity-seo': {
    hero: 1, problem: 3, work: 4, frame: 5, related: 6,
    pay: 'Authority at Scale', stat: '60–120',
    alt: 'A printed classical column under a small amber sun.',
  },
  'ai-agent-optimization': {
    hero: 6, problem: 5, work: 2, frame: 2, related: 4,
    pay: 'Autonomous Browsing Bots', stat: '18–24',
    alt: 'A simple printed robot head with an amber antenna.',
  },
  'data-driven-inbound-original-research': {
    hero: 3, problem: 1, work: 5, frame: 3, related: 5,
    pay: 'Converts B2B Buyers', stat: '12–24',
    alt: 'A printed bar chart with the tallest bar in amber.',
  },
  'multi-channel-b2b-saas-growth-loops': {
    hero: 2, problem: 4, work: 6, frame: 2, related: 1,
    pay: 'Loops That Compound',
    alt: 'Three printed rings joined in a triangle, with an amber dot travelling round the top one.',
  },
  'aiaa-operational-auditing': {
    hero: 1, problem: 5, work: 4, frame: 4, related: 2,
    pay: 'the Wrong Workflows', stat: '30–40%',
    alt: 'A magnifying glass over a printed checklist, one box marked in amber.',
  },
  'agentic-workflow-consulting': {
    hero: 3, problem: 3, work: 1, frame: 6, related: 6,
    pay: 'Autonomous Business Operations', stat: '45-minute', long: true,
    alt: 'One printed node branching to three, with an amber result under the middle one.',
  },
  'n8n-automation-services': {
    hero: 5, sheet: 'over', problem: 1, work: 3, frame: 5, related: 3,
    pay: 'Production-Grade Automation Infrastructure', stat: '30–50%',
    alt: 'A printed workflow of linked square nodes ending in an amber dot.',
  },
  'ai-native-generative-ui-development': {
    hero: 1, problem: 1, work: 6, frame: 3, related: 5,
    pay: 'From Day One',
    alt: 'Printed interface blocks with an amber sparkle on the main panel.',
  },
  'enterprise-rag-vector-database-architecture': {
    hero: 6, problem: 2, work: 4, frame: 1, related: 4,
    pay: 'Private Knowledge Base', stat: '15–25%',
    alt: 'A printed database cylinder beside a cloud of small dots, one of them amber.',
  },
  'ai-solutions-integrator-operations': {
    hero: 5, sheet: 'mid below', problem: 3, work: 5, frame: 6, related: 1,
    pay: 'AI Solutions Integrator (ASI) Services',
    alt: 'A printed bridge joining a legacy system block to a new one, with an amber dot crossing.',
  },
  'fractional-ai-engineering-cto': {
    hero: 2, problem: 4, work: 2, frame: 5, related: 2,
    pay: 'On-Demand Technical Leadership Without the Full-Time Hire', stat: '$500K–$5M', long: true,
    alt: 'A grey disc with one purple quarter pulled out and an amber dot on it.',
  },
};

// Fallback for any cluster added to the data later without a design.
const DEFAULT = { hero: 1, problem: 3, work: 2, frame: 2, related: 2 };

// Strip (hero 5) prints are 1600x600, every other hero print 1000x1000, problem spots 500x500.
export function getClusterConfig(slug) {
  const c = C[slug] || DEFAULT;
  const wide = c.hero === 5;
  return {
    ...c,
    heroImg: { src: `/print/clusters/${slug}-hero.webp`, w: wide ? 1600 : 1000, h: wide ? 600 : 1000, has: !!C[slug] },
    spotImg: c.problem === 0 || !C[slug] ? null : { src: `/print/clusters/${slug}-spot.webp`, w: 500, h: 500 },
  };
}
