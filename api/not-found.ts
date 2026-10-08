// Real 404s for unknown URLs.
//
// vercel.json's last rewrite sends every path that matched no file, no
// prerendered page and no known route shape here. On this project Vercel does
// not fall through to build/404.html on its own: with no catch-all it serves
// "/" (the homepage) with a 200 for any unmatched path, which is a soft 404.
// Rewrites can't set a status code, so this function returns the prerendered
// 404 page (frontend/build/404.html, noindex) with a genuine 404 status.
export const config = { runtime: 'edge' };

const PROBE_HEADER = 'x-not-found-probe';

// Used only if 404.html can't be loaded (e.g. missing from a build).
const FALLBACK_HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page not found | MyAibo</title>
<style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#F7F5FC;color:#0F0A1E;display:flex;min-height:100vh;align-items:center;justify-content:center;text-align:center;padding:24px}a{color:#5A24C7;font-weight:600}</style>
</head>
<body>
<main>
<h1>This page doesn&rsquo;t exist.</h1>
<p>The link may be outdated, or the page may have moved.</p>
<p><a href="/">Back to home</a></p>
</main>
</body>
</html>`;

function notFound(html: string): Response {
  return new Response(html, {
    status: 404,
    headers: {
      'content-type': 'text/html; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
      'x-robots-tag': 'noindex',
    },
  });
}

export default async function handler(request: Request): Promise<Response> {
  // Guard against a loop: if 404.html itself is missing, the request for it
  // would be rewritten straight back to this function.
  if (request.headers.get(PROBE_HEADER)) return notFound(FALLBACK_HTML);

  try {
    const headers: Record<string, string> = { [PROBE_HEADER]: '1' };
    // Pass the visitor's auth through so this also works on protected
    // preview deployments, where the page fetch would otherwise be bounced
    // to Vercel's login.
    for (const name of ['cookie', 'authorization', 'x-vercel-protection-bypass']) {
      const value = request.headers.get(name);
      if (value) headers[name] = value;
    }
    const page = await fetch(new URL('/404.html', request.url), { headers, redirect: 'manual' });
    const type = page.headers.get('content-type') || '';
    if (page.status === 200 && type.includes('text/html')) {
      return notFound(await page.text());
    }
  } catch (err) {
    console.error('[not-found] could not load /404.html:', err);
  }
  return notFound(FALLBACK_HTML);
}
