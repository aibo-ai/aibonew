#!/usr/bin/env node
/**
 * Post-build prerendering.
 *
 * Runs after `npm run build`, EITHER locally/CI (with full Chromium deps
 * installed via `npx playwright install --with-deps chromium`) or skipped
 * gracefully if the browser can't launch (e.g. on Vercel's build machine,
 * which lacks the shared libs Chromium needs).
 *
 * Serves the build/ output locally, visits every known route in headless
 * Chrome, and writes the fully-rendered HTML to build/<route>/index.html.
 *
 * Why: Vercel serves static files before applying the SPA catch-all rewrite
 * in vercel.json (`/((?!api).*) -> /index.html`). Once a real index.html
 * exists for e.g. build/solutions/geo/index.html, Vercel serves that file
 * directly — so crawlers that don't execute JS (most AI bots, and Googlebot
 * before/if it renders) see full content instead of the empty React shell.
 *
 * This does NOT change what real users see. They still get the same HTML,
 * then React mounts on top via createRoot as it does today. It only adds
 * content that was previously missing until JS ran.
 *
 * API calls made by pages during rendering (e.g. BlogPage fetching a post)
 * are proxied through to the real production API (see startServer below),
 * so pages that fetch data client-side render with real content instead of
 * failing against this local static-file server.
 */
const fs = require("fs");
const path = require("path");
const http = require("http");
const https = require("https");
const handler = require("serve-handler");
const { chromium } = require("playwright");

const ROOT = path.join(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const PORT = 45123;
const ORIGIN = `http://localhost:${PORT}`;

// Where to fetch dynamic blog slugs from at build time, and where to proxy
// runtime /api/* calls during rendering. Defaults to production so a Vercel
// build picks up whatever is live right now.
// Override locally with: PRERENDER_API_ORIGIN=http://localhost:3001 node scripts/prerender.js
const PROD_API = process.env.PRERENDER_API_ORIGIN || "https://www.myaibo.in";

// The real public origin used when writing absolute URLs into sitemap.xml.
// Always the production domain, regardless of PRERENDER_API_ORIGIN overrides.
const ORIGIN_PUBLIC = "https://www.myaibo.in";

const STATIC_ROUTES = ["/", "/about", "/blogs", "/case-studies", "/contact"];
const PILLARS = [
  "geo",
  "aeo",
  "seo",
  "content-marketing",
  "ai-automations",
  "full-stack",
];

// Parsed from source rather than imported, so this plain Node/CommonJS
// script doesn't need to execute the app's ESM source through webpack/babel.
function getClusterRoutes() {
  const src = fs.readFileSync(
    path.join(ROOT, "src/data/clusterPagesData.js"),
    "utf8"
  );
  const pairs = [...src.matchAll(/pillar:\s*'([^']+)',\s*\n\s*slug:\s*'([^']+)'/g)];
  return pairs.map(([, pillar, slug]) => `/solutions/${pillar}/${slug}`);
}

async function getBlogRoutes() {
  try {
    const res = await fetch(`${PROD_API}/api/admin/public/blogs`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const blogs = await res.json();
    const slugs = Array.isArray(blogs) ? blogs : blogs.blogs || [];
    return slugs.map((b) => `/blog/${b.slug}`);
  } catch (err) {
    // Don't fail the whole build if the CMS is briefly unreachable —
    // just skip dynamic routes and prerender everything else.
    console.warn(
      `[prerender] Skipping blog routes — could not reach ${PROD_API}: ${err.message}`
    );
    return [];
  }
}

async function getRoutes() {
  const routes = [
    ...STATIC_ROUTES,
    ...PILLARS.map((p) => `/solutions/${p}`),
    ...getClusterRoutes(),
    ...(await getBlogRoutes()),
  ];
  return [...new Set(routes)];
}

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Proxy API calls to the real production backend so pages that fetch
      // data client-side (e.g. blog posts) render with real content during
      // prerendering, instead of hitting this static file server and
      // getting index.html back for an /api/* path (which breaks JSON.parse
      // in the page and produces "Post not found" style fallback content).
      if (req.url.startsWith("/api/")) {
        const target = new URL(req.url, PROD_API);
        const client = target.protocol === "https:" ? https : http;
        const proxyReq = client.request(
          target,
          { method: req.method, headers: { ...req.headers, host: target.host } },
          (proxyRes) => {
            res.writeHead(proxyRes.statusCode, proxyRes.headers);
            proxyRes.pipe(res);
          }
        );
        proxyReq.on("error", (err) => {
          console.warn(`[prerender] API proxy error for ${req.url}: ${err.message}`);
          res.writeHead(502);
          res.end();
        });
        req.pipe(proxyReq);
        return;
      }

      handler(req, res, {
        public: BUILD_DIR,
        cleanUrls: false,
        rewrites: [{ source: "**", destination: "/index.html" }],
      });
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function prerenderRoute(browser, route) {
  const page = await browser.newPage();
  try {
    await page.goto(`${ORIGIN}${route}`, {
      waitUntil: "networkidle",
      timeout: 30000,
    });
    // Let Helmet finish its post-render title/meta update.
    await page.waitForSelector("title", { state: "attached" });
    let html = await page.content();

    // Helmet appends a page-specific <meta name="description"> but has no
    // knowledge of the generic one already baked into index.html, so both
    // end up in the document. Keep only the Helmet one when both exist.
    const descTags = [
      ...html.matchAll(/<meta name="description"[^>]*>/g),
    ];
    if (descTags.length > 1) {
      const genericTag = descTags.find(
        (m) => !m[0].includes('data-react-helmet')
      );
      if (genericTag) {
        html = html.replace(genericTag[0], "");
      }
    }

    const outDir = route === "/" ? BUILD_DIR : path.join(BUILD_DIR, route);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, "index.html"), html);
    console.log(`[prerender] OK   ${route}`);
  } finally {
    await page.close();
  }
}

function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10);
  const priorityFor = (route) => {
    if (route === "/") return "1.0";
    if (/^\/solutions\/[^/]+$/.test(route)) return "0.9";
    if (route.startsWith("/blog/")) return "0.6";
    return "0.7";
  };
  const urls = routes
    .map(
      (route) =>
        `  <url><loc>${ORIGIN_PUBLIC}${route}</loc><lastmod>${today}</lastmod><changefreq>weekly</changefreq><priority>${priorityFor(
          route
        )}</priority></url>`
    )
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  fs.writeFileSync(path.join(BUILD_DIR, "sitemap.xml"), xml);
  console.log(`[prerender] sitemap.xml written with ${routes.length} URLs.`);
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error("[prerender] build/ not found — run `npm run build` first.");
    process.exit(1);
  }

  const routes = await getRoutes();
  console.log(`[prerender] Rendering ${routes.length} routes...`);
  writeSitemap(routes);

  const server = await startServer();

  let browser;
  try {
    browser = await chromium.launch();
  } catch (err) {
    // Environment can't launch a browser (e.g. Vercel's build container,
    // which lacks required shared libs). Skip prerendering rather than
    // failing the whole deployment — the SPA still works without it.
    console.warn(
      `[prerender] Could not launch browser, skipping prerender: ${err.message}`
    );
    server.close();
    return;
  }

  let failures = 0;
  for (const route of routes) {
    try {
      await prerenderRoute(browser, route);
    } catch (err) {
      failures += 1;
      console.error(`[prerender] FAIL ${route}: ${err.message}`);
    }
  }

  await browser.close();
  server.close();

  console.log(
    `[prerender] Done. ${routes.length - failures}/${routes.length} routes rendered.`
  );

  // Fail the build only if prerendering wiped out almost everything —
  // a handful of missed routes shouldn't block a deploy.
  if (failures > routes.length * 0.5) {
    console.error("[prerender] Too many failures — failing build.");
    process.exit(1);
  }
}

main();
