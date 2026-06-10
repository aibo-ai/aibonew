import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

app.use(cors({
  origin: (origin, callback) => {
    const allowed = ['http://localhost:3000', 'https://www.myaibo.in', 'https://myaibo.in'];
    if (!origin || allowed.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
      callback(null, true);
    } else { callback(new Error('Not allowed by CORS')); }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));

app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

const getClient = async () => {
  const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
  });
  await client.connect();
  return client;
};

const ensureTable = async (client: Client) => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS cms_users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      "firstName" VARCHAR(255),
      "lastName" VARCHAR(255),
      role VARCHAR(50) DEFAULT 'editor',
      "isActive" BOOLEAN DEFAULT true,
      "lastLoginAt" TIMESTAMPTZ,
      "createdAt" TIMESTAMPTZ DEFAULT NOW(),
      "updatedAt" TIMESTAMPTZ DEFAULT NOW()
    )
  `);
};

const protect = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalid' });
  }
};

const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

// ─────────────────────────────────────────────
// HEALTH
// ─────────────────────────────────────────────

app.get('/api/cms/health', async (_req, res) => {
  let client;
  try {
    client = await getClient();
    await client.query('SELECT 1');
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (e: any) {
    res.status(500).json({ status: 'DB_ERROR', error: e.message });
  } finally {
    if (client) await client.end();
  }
});

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

app.post('/api/cms/auth/login', async (req, res) => {
  let client;
  try {
    client = await getClient();
    await ensureTable(client);
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });
    const result = await client.query(
      'SELECT * FROM cms_users WHERE email = $1 AND "isActive" = true', [email]
    );
    const user = result.rows[0];
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });
    await client.query('UPDATE cms_users SET "lastLoginAt" = NOW() WHERE id = $1', [user.id]);
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' } as SignOptions
    );
    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (e: any) {
    console.error('[CMS login error]', e);
    res.status(500).json({ success: false, message: 'Server error', error: e.message });
  } finally {
    if (client) await client.end();
  }
});

app.get('/api/cms/auth/me', protect, async (req: any, res) => {
  let client;
  try {
    client = await getClient();
    const result = await client.query(
      'SELECT id, email, role, "firstName", "lastName" FROM cms_users WHERE id = $1', [req.user.id]
    );
    if (!result.rows[0]) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: result.rows[0] });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  } finally {
    if (client) await client.end();
  }
});

// ─────────────────────────────────────────────
// OG TAG ENDPOINT FOR SOCIAL MEDIA CRAWLERS
// @route   GET /api/cms/blog/og/:slug
// @access  Public
// Called by vercel.json rewrite when /blog/:slug is hit by a social bot
// ─────────────────────────────────────────────

app.get('/api/cms/blog/og/:slug', async (req: any, res) => {
  let client;
  const siteUrl = 'https://www.myaibo.in';
  const defaultOgImage = `${siteUrl}/og-default.png`;
  const { slug } = req.params;
  const blogUrl = `${siteUrl}/blog/${slug}`;

  try {
    client = await getClient();

    // Query the blogs table — adjust column names if yours differ
    const result = await client.query(
      `SELECT title, excerpt, featured_image
       FROM blogs
       WHERE slug = $1
         AND status = 'published'
         AND published_at IS NOT NULL
       LIMIT 1`,
      [slug]
    );

    const post = result.rows[0];

    const title = escapeHtml(post?.title || 'MyAibo Blog');
    const description = escapeHtml(
      post?.meta_description || post?.excerpt || 'AI-powered insights from MyAibo.'
    );
    const ogImage = escapeHtml(post?.featured_image || defaultOgImage);
    const safeUrl = escapeHtml(blogUrl);
    const safeSiteUrl = escapeHtml(siteUrl);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'public, max-age=3600');

    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title} | MyAibo</title>
  <meta name="description" content="${description}" />

  <!-- Open Graph -->
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="MyAibo" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:url" content="${safeUrl}" />

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImage}" />

  <!-- Redirect humans who land here directly back to the SPA -->
  <meta http-equiv="refresh" content="0; url=${safeUrl}" />
  <link rel="canonical" href="${safeUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${safeUrl}">${title}</a>...</p>
</body>
</html>`);

  } catch (e: any) {
    console.error('[OG route error]', e);
    // On any error still return a valid OG page so the social card doesn't break
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>MyAibo — AI-Powered Growth</title>
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="MyAibo" />
  <meta property="og:title" content="MyAibo — AI-Powered Growth" />
  <meta property="og:description" content="MyAibo builds AI-powered marketing systems and technical products — GEO, AEO, SEO, content, automation, and full-stack development." />
  <meta property="og:image" content="${defaultOgImage}" />
  <meta property="og:url" content="${safeSiteUrl}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="MyAibo — AI-Powered Growth" />
  <meta name="twitter:description" content="MyAibo builds AI-powered marketing systems and technical products — GEO, AEO, SEO, content, automation, and full-stack development." />
  <meta name="twitter:image" content="${defaultOgImage}" />
  <meta http-equiv="refresh" content="0; url=${safeSiteUrl}" />
</head>
<body>
  <p>Redirecting to <a href="${safeSiteUrl}">MyAibo</a>...</p>
</body>
</html>`);
  } finally {
    if (client) await client.end();
  }
});

// ─────────────────────────────────────────────
// CATCH-ALL for unmatched /api/cms/* routes
// ─────────────────────────────────────────────

app.use('/api/cms', (_req, res) => {
  res.status(404).json({ success: false, message: 'CMS route not found' });
});

export default app;
