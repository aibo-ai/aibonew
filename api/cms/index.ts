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

import multer from 'multer';
import { put } from '@vercel/blob';

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });

app.post('/upload', upload.single('file'), async (req: any, res: any) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
    const { buffer, originalname, mimetype } = req.file;
    const blob = await put(`blog-images/${Date.now()}-${originalname}`, buffer, {
      access: 'public',
      contentType: mimetype,
    });
    return res.status(200).json({ url: blob.url });
  } catch (err: any) {
    console.error('Upload error:', err);
    return res.status(500).json({ error: err.message || 'Upload failed' });
  }
});

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
