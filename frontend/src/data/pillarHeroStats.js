// One real, already-published headline stat per pillar (lifted straight from
// that pillar's own whyNow.stats[0] in geoData.js / aeoData.js / etc.), used
// to drive the floating stat card on cluster and pillar page hero mockups —
// so every hero mockup shows a real figure, not a fabricated one, without
// importing each pillar's full (large) data file into every cluster page.
export const pillarHeroStats = {
  geo: { value: '+340%', label: 'AI CITATION RATE', sub: 'avg. GEO client, 6mo' },
  aeo: { value: '68%', label: 'ZERO-CLICK QUERIES', sub: 'expect a direct answer' },
  seo: { value: '+156%', label: 'CONVERSION LIFT', sub: 'avg. SEO client' },
  'content-marketing': { value: '3×', label: 'LEADS vs OUTBOUND', sub: 'at 62% lower cost' },
  'ai-automations': { value: '8 min', label: 'LEAD RESPONSE TIME', sub: 'was 4 hours, pre-automation' },
  'full-stack': { value: '8×', label: 'DELIVERY SPEED', sub: 'client inventory mgmt example' },
};
