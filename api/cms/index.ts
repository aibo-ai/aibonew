import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

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

const getDb = () => neon(process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || '');

const ensureTable = async () => {
  const sql = getDb();
  await sql`
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
  `;
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
  try {
    const sql = getDb();
    await sql`SELECT 1`;
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (e: any) {
    res.status(500).json({ status: 'DB_ERROR', error: e.message });
  }
});

app.post('/api/cms/auth/login', async (req, res) => {
  try {
    await ensureTable();
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });

    const sql = getDb();
    const rows = await sql`SELECT * FROM cms_users WHERE email = ${email} AND "isActive" = true`;
    const user = rows[0];
    if (!user) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    await sql`UPDATE cms_users SET "lastLoginAt" = NOW() WHERE id = ${user.id}`;

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: '30d' } as SignOptions
    );

    res.json({ success: true, token, user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName } });
  } catch (e: any) {
    console.error('[CMS login error]', e);
    res.status(500).json({ success: false, message: 'Server error', error: e.message });
  }
});

app.get('/api/cms/auth/me', protect, async (req: any, res) => {
  try {
    const sql = getDb();
    const rows = await sql`SELECT id, email, role, "firstName", "lastName" FROM cms_users WHERE id = ${req.user.id}`;
    if (!rows[0]) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user: rows[0] });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.use('/api/cms', (_req, res) => {
  res.status(404).json({ success: false, message: 'CMS route not found' });
});

export default app;
