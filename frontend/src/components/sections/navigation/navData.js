// Pillar → cluster map for nav (mega-menu / mobile accordion).
// Uses the existing short pillar slugs so no in-app links break.
// White Label Solutions is intentionally removed; /solutions/white-label
// is redirected to /solutions/full-stack in App.js.

export const pillars = [
  {
    slug: 'geo',
    name: 'Generative Engine Optimization',
    short: 'GEO',
    group: 'Marketing',
    clusters: [
      { slug: 'llmo-company', name: 'LLM Optimization (LLMO) Company' },
      { slug: 'perplexity-gemini-chatgpt-optimization', name: 'Perplexity, Gemini & ChatGPT Optimization' },
      { slug: 'zero-click-search-synthetic-traffic', name: 'Zero-Click Search & Synthetic Traffic' },
    ],
  },
  {
    slug: 'aeo',
    name: 'Answer Engine Optimization',
    short: 'AEO',
    group: 'Marketing',
    clusters: [
      { slug: 'llm-bot-compliance-llms-txt', name: 'LLM Bot Compliance & llms.txt' },
      { slug: 'semantic-faq-knowledge-graph-schema', name: 'Semantic FAQ & Knowledge Graph Schema' },
    ],
  },
  {
    slug: 'seo',
    name: 'Search Engine Optimization',
    short: 'SEO',
    group: 'Marketing',
    clusters: [
      { slug: 'programmatic-seo-engine', name: 'Programmatic SEO Engine' },
      { slug: 'topical-authority-entity-seo', name: 'Topical Authority & Entity SEO' },
      { slug: 'ai-agent-optimization', name: 'AI Agent Optimization' },
      { slug: 'community-ugc-search-amplification', name: 'Community & UGC Search Amplification' },
    ],
  },
  {
    slug: 'content-marketing',
    name: 'Content Marketing',
    short: 'Content',
    group: 'Marketing',
    clusters: [
      { slug: 'data-driven-inbound-original-research', name: 'Data-Driven Inbound & Original Research' },
      { slug: 'multi-channel-b2b-saas-growth-loops', name: 'Multi-Channel B2B SaaS Growth Loops' },
    ],
  },
  {
    slug: 'ai-automations',
    name: 'AI Automation',
    short: 'AI Automation',
    group: 'Technical',
    clusters: [
      { slug: 'aiaa-operational-auditing', name: 'AIAA Operational Auditing' },
      { slug: 'agentic-workflow-consulting', name: 'Agentic Workflow & Multi-Agent Orchestration' },
      { slug: 'n8n-automation-services', name: 'Production-Grade n8n Automation' },
    ],
  },
  {
    slug: 'full-stack',
    name: 'Full Stack Development',
    short: 'Full Stack',
    group: 'Technical',
    clusters: [
      { slug: 'ai-native-generative-ui-development', name: 'AI-Native & Generative UI Development' },
      { slug: 'enterprise-rag-vector-database-architecture', name: 'Enterprise RAG & Vector Database' },
      { slug: 'ai-solutions-integrator-operations', name: 'AI Solutions Integrator (ASI)' },
      { slug: 'fractional-ai-engineering-cto', name: 'Fractional AI Engineering & CTO' },
    ],
  },
];

// Backward-compat exports (still consumed by some legacy imports).
export const marketingServices = pillars
  .filter((p) => p.group === 'Marketing')
  .map((p) => ({ name: p.name, slug: p.slug }));

export const technicalServices = pillars
  .filter((p) => p.group === 'Technical')
  .map((p) => ({ name: p.name, slug: p.slug }));
