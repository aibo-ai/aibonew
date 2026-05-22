import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { Sequelize, DataTypes } from 'sequelize';
import jwt, { SignOptions } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();

const allowedOrigins: (string | RegExp)[] = [
  'http://localhost:3000',
  'https://www.myaibo.in',
  'https://myaibo.in',
  /^https:\/\/.*\.vercel\.app$/
];
app.use(cors({
  origin(origin, callback) {
    if (!origin) return callback(null, true);
    const isAllowed = allowedOrigins.some(a =>
      typeof a === 'string' ? a === origin : (a as RegExp).test(origin)
    );
    isAllowed ? callback(null, true) : callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

app.use(helmet());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('combined'));

const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL || '';
const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: { ssl: { require: true, rejectUnauthorized: false } },
  logging: false,
});

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  role: { type: DataTypes.ENUM('admin', 'editor'), defaultValue: 'editor' },
  isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
  lastLoginAt: { type: DataTypes.DATE },
}, { tableName: 'cms_users', timestamps: true });

let dbReady: Promise<void> | null = null;
const ensureDb = () => {
  if (!dbReady) dbReady = sequelize.authenticate().then(() => sequelize.sync({ alter: false }));
  return dbReady;
};

const protect = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ success: false, message: 'Not authorized' });
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Token invalid' });
  }
};

app.get('/api/cms/health', async (_req, res) => {
  try {
    await ensureDb();
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (e: any) {
    res.status(500).json({ status: 'DB_ERROR', error: e.message });
  }
});

app.post('/api/cms/auth/login', async (req, res) => {
  try {
    await ensureDb();
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ success: false, message: 'Email and password required' });
    const user: any = await User.findOne({ where: { email, isActive: true } });
    if (!user)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    user.lastLoginAt = new Date();
    await user.save();
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'fallback-secret',
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
    await ensureDb();
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, user });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

app.use('/api/cms', (_req, res) => {
  res.status(404).json({ success: false, message: 'CMS route not found' });
});

export default app;