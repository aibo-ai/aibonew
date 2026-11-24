// Helpers shared by the case study index and detail pages ("Print room").
// Case studies come from /admin/public/case-studies with these fields:
// id, title, client, industry, service, excerpt, challenge, solution, result,
// metrics ({ key: value, timeframe? }), featured_image, content (optional HTML).

export const metricLabel = (key) => key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());

// Headline metrics first; the timeframe reads better as a caption.
export function splitMetrics(metrics) {
  const obj = metrics && typeof metrics === 'object' ? metrics : {};
  const entries = Object.entries(obj).filter(([, v]) => v !== null && v !== '');
  return {
    stats: entries.filter(([k]) => k !== 'timeframe').map(([k, v]) => [k, String(v)]),
    timeframe: obj.timeframe ? String(obj.timeframe) : '',
  };
}

// Titles are often "<Client> - <Headline>"; the index shows the client on its own line.
export function headlineOf(study) {
  const title = study.title || '';
  const client = (study.client || '').trim();
  if (client) {
    const m = title.match(/^(.+?)\s+[-–—]\s+(.+)$/);
    if (m && m[1].trim().toLowerCase() === client.toLowerCase()) return m[2];
  }
  return title;
}

// Free-text fields: blank lines separate paragraphs.
export function paragraphs(text) {
  return String(text || '')
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

// Splits a paragraph block into prose and bullet lines ("- ", "• ", "* ").
export function proseAndBullets(text) {
  const prose = [];
  const bullets = [];
  for (const para of paragraphs(text)) {
    const lines = para.split('\n').map((l) => l.trim()).filter(Boolean);
    const rest = [];
    for (const line of lines) {
      const b = line.match(/^[-•*]\s+(.+)$/);
      if (b) bullets.push(b[1]);
      else rest.push(line);
    }
    if (rest.length) prose.push(rest.join(' '));
  }
  return { prose, bullets };
}

// "What we did" steps: a paragraph whose first line is short and has no full
// stop is read as the step's title, the rest as its body.
export function toStep(para) {
  const [first, ...rest] = para.split('\n');
  const head = first.trim().replace(/[:\s]+$/, '');
  if (rest.length && head.length <= 80 && !/[.!?]$/.test(head)) {
    return { title: head, body: rest.join(' ').trim() };
  }
  return { title: '', body: para.replace(/\n/g, ' ') };
}

// A metric like "7 → 14" (or "7 -> 14", "7 to 14") gives the hero discs their labels.
export function beforeAfter(stats) {
  for (const [, v] of stats) {
    const m = v.match(/^\s*([^\s→]{1,8})\s*(?:→|->|to)\s*([^\s→]{1,8})\s*$/i);
    if (m) return { a: m[1], b: m[2] };
  }
  return null;
}
