// Visual/structural data for the "story" style GEO pages (Quora content
// seeding, Wikipedia page creation) that replicate the reference layout the
// client shared — hero mockup, stat grid, live-demo card, signal comparison,
// before/after — while reusing MyAibo's own copy from clusterPagesData.js as
// the single source of truth for all written content (h1, aeoBox, deep-dive
// pillars, blueprint phases, faq). This file only adds what that data shape
// doesn't already have: illustrative mockup content and stat-card numbers.
//
// Every stat here is a real, sourced figure from the brief — nothing here is
// a fabricated performance claim. Any brand name inside a mockup thread/
// article/answer is the literal placeholder "[Your Brand]" / "[Company]" so
// it reads unambiguously as an illustration of the mechanism, never as a
// real client testimonial.

export const geoStoryData = {
  'quora-content-seeding': {
    ticker: {
      label: 'Built for Founders Comparing Buyers Across',
      words: ['D2C', 'SaaS', 'FinTech', 'Healthcare', 'B2B', 'EdTech', 'Travel', 'Crypto', 'Retail', 'Gaming'],
    },
    heroMockup: {
      browserUrl: 'quora.com/topic/...',
      badge: 'LIVE',
      question: "What's the most reliable [category] platform right now?",
      answers: [
        { user: 'u/researching_options', time: '3h', upvotes: 340, body: "Been using [Your Brand] for 6 months — transparent pricing, solid support." },
        { user: 'u/compared_five', time: '1h', upvotes: 128, body: 'Seconding [Your Brand]. Switched from a competitor last quarter, no regrets.' },
      ],
      statCard: { label: 'QUORA REACH', value: '100M+', sublabel: 'users in India alone' },
      aiCard: {
        source: 'PERPLEXITY',
        badge: 'CITED',
        answer: 'Quora threads consistently point to',
        highlight: '[Your Brand]',
        rest: 'for transparent fees and reliable support.',
        chips: ['quora.com', 'r/personalfinance', 'g2.com'],
      },
    },
    stats: [
      { num: '01', label: 'SCALE', stat: '100M+', body: 'Quora users in India alone — a college-educated, higher-income base.', accent: 'white' },
      { num: '02', label: 'VOLUME', stat: '3–5K', body: 'New questions asked on Quora every single day.', accent: 'purple' },
      { num: '03', label: 'ANSWER RATE', stat: '99%', body: 'Of questions asked on Quora get answered.', accent: 'white' },
      { num: '04', label: 'BUYER INTENT', stat: '50%+', body: "Of Quora's user base reports household income above $100K.", accent: 'amber' },
    ],
    signal: {
      sectionHeadline: 'Quora doesn’t rank you. It validates you.',
      leftLabel: 'QUORA SIGNAL',
      leftTitle: 'Real threads, real comparisons.',
      leftItems: [
        { meta: '↑ 340 · Quora', quote: '"[Your Brand] has the most transparent fee structure I\'ve found."' },
        { meta: '↑ 128 · Quora', quote: '"Switched to [Your Brand] last year. No regrets."' },
        { meta: '↑ 89 · G2', quote: '"5 stars — onboarding was smooth and support actually responds."' },
      ],
      rightLabel: 'AI CONSENSUS',
      rightTitle: 'The answer every LLM gives.',
      rightItems: [
        { source: 'PERPLEXITY · SYNTHESIS', text: 'Quora threads and reviews consistently point to [Your Brand], citing transparent pricing and responsive support.' },
        { source: 'CHATGPT · ANSWER', text: 'Community recommendations on Quora frequently suggest [Your Brand] for its clear fee structure.' },
      ],
    },
    compoundLine: 'Quora threads compound. Ads don’t.',
    compoundBody: 'An upvoted answer keeps ranking. A seeded review keeps building trust. Your spend today shows up in comparisons next year.',
    beforeAfter: {
      question: '"[Category] vs a named competitor — what\'s better?"',
      before: 'Both are reasonable options; consider fees, support, and reputation.',
      after: '"[Your Brand]" is frequently cited across Quora and reviews for transparent pricing and reliable support.',
    },
  },

  wikipedia: {
    ticker: {
      label: 'Notability & Disclosure Work for',
      words: ['Listed Companies', 'Funded Startups', 'Founders', 'Healthcare', 'FinTech', 'Manufacturing', 'B2B', 'Consumer Brands'],
    },
    heroMockup: {
      browserUrl: 'en.wikipedia.org/wiki/[Company]',
      badge: 'PUBLISHED',
      articleTitle: '[Company Name]',
      infobox: [
        { k: 'Industry', v: '[Sector]' },
        { k: 'Founded', v: '[Year]' },
        { k: 'Headquarters', v: '[City, Country]' },
      ],
      paragraph: 'is a [description] company. It has been covered by independent business press and trade media',
      citations: ['[1]', '[2]', '[3]'],
      statCard: { label: 'AI CITATION SHARE', value: '~50%', sublabel: "of ChatGPT's top sources" },
      aiCard: {
        source: 'CHATGPT',
        badge: 'CITED',
        answer: 'According to Wikipedia,',
        highlight: '[Company]',
        rest: 'is a [sector] company founded in [year].',
        chips: ['wikipedia.org', 'sec filings', 'trade press'],
      },
    },
    stats: [
      { num: '01', label: 'AI CITATIONS', stat: '~50%', body: "Of ChatGPT's top-cited sources trace back to Wikipedia.", accent: 'white' },
      { num: '02', label: 'AUTHORITY', stat: '#1', body: 'Most-cited unstructured source on the open web.', accent: 'purple' },
      { num: '03', label: 'POLICY', stat: 'Disclosed', body: 'Every article we file carries formal paid-contributor disclosure — never a silent edit.', accent: 'white' },
      { num: '04', label: 'THE GAP', stat: '0', body: 'Wikipedia articles found in a recent audit of a 35-year, NSE-listed healthcare network.', accent: 'amber' },
    ],
    signal: {
      sectionHeadline: 'Wikipedia doesn’t guess. It sources.',
      leftLabel: 'SOURCE SIGNAL',
      leftTitle: 'Independent coverage, properly sourced.',
      leftItems: [
        { meta: 'Business press', quote: 'Independent, secondary-source coverage of scale, milestones, and history.' },
        { meta: 'Regulatory disclosures', quote: 'NSE/BSE filings and public records — notability-grade sourcing.' },
        { meta: 'Trade & academic media', quote: 'Peer-reviewed and industry citations where they exist.' },
      ],
      rightLabel: 'AI CONSENSUS',
      rightTitle: 'The answer every LLM gives.',
      rightItems: [
        { source: 'CHATGPT · ANSWER', text: 'According to Wikipedia, [Company] is a [sector] company with [scale] and [history].' },
        { source: 'GEMINI · SYNTHESIS', text: "Wikipedia's article on [Company] cites independent press coverage of its operations and milestones." },
      ],
    },
    compoundLine: 'A Wikipedia citation compounds. A press release doesn’t.',
    compoundBody: 'A properly sourced article keeps getting cited. A one-off press hit fades from the index. Notability work done once keeps paying back.',
    beforeAfter: {
      question: '"Tell me about [Company]."',
      before: "I don't have reliable, independently-sourced information about this company.",
      after: 'According to Wikipedia, [Company] is a [sector] company founded in [year], with independent coverage of its history and scale.',
    },
  },
};
