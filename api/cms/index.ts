import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Client } from 'pg';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

app.use('/api/cms(cors({
  origin: (origin, callback) => {
    const allowed = ['http://localhost:3000', 'https://www.myaibo.in', 'https://myaibo.in'];
    if (!origin || allowed.includes(origin) || (origin && origin.endsWith('.vercel.app'))) {
      callback(null, true);
    } else { callback(new Error('Not allowed by CORS')); }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
);

app.use('/api/cms(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

const getClient = async () => {
 const client = new Client({
    connectionString: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    connectionTimeoutMillis: 10000,
    statement_timeout: 10000,
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
    res.json({ success: true, token, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } });
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

app.use('/api/cms, (_req, res) => {
  res.status(404).json({ success: false, message: 'CMS route not found' });
);

export default app;