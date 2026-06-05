import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import multer from 'multer';
import { put } from '@vercel/blob';

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

// ── Image Upload ──────────────────────────────────────────────────────────────

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { buffer, originalname, mimetype } = req.file;
    const blob = await put(`blog-images/${Date.now()}-${originalname}`, buffer, {
      access: 'public',
      contentType: mimetype,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    });
    return res.status(200).json({ url: blob.url });
  } catch (err: any) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

// ── Auth ──────────────────────────────────────────────────────────────────────

const verifyToken = (req: any, res: any, next: any) => {
  const auth = req.headers['authorization'];
  const token = auth && auth.startsWith('Bearer ') ? auth.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Not authenticated' });
  }
};

app.post('/login', async (req: any, res: any) => {
  const { email, password } = req.body;
  const sql = getDb();
  try {
    const rows = await sql`SELECT * FROM admin_users WHERE email = ${email}`;
    const user = rows[0];
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' } as SignOptions);
    return res.status(200).json({ token, email: user.email, id: user.id });
  } catch (err: any) {
    console.error('Login error:', err);
    return res.status(500).json({ error: err.message });
  }
});

app.get('/me', verifyToken, async (req: any, res: any) => {
  return res.status(200).json({ email: req.user.email, id: req.user.id });
});

export default app;
