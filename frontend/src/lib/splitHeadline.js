// Splits a headline into { a, b } so the final clause can be styled
// differently (highlighter block on H1s, italic on H2s/CTAs). Mirrors the
// heuristic from the design handoff: prefer an em-dash break, then a
// short trailing clause after punctuation, then fall back to the last
// 1-3 words.
export function splitHeadline(h) {
  h = h || '';
  const i = h.lastIndexOf(' — ');
  if (i > 0) return { a: h.slice(0, i + 3), b: h.slice(i + 3) };
  const m = h.match(/^(.*[.?!,:]\s)(\S.*)$/);
  if (m && m[2].split(' ').length <= 7) return { a: m[1], b: m[2] };
  const w = h.split(' ');
  const k = Math.min(3, Math.max(1, w.length - 2));
  return { a: w.slice(0, -k).join(' ') + ' ', b: w.slice(-k).join(' ') };
}
