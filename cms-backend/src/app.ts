import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';

// Import routes
import authRoutes from './routes/auth';
import authSimpleRoutes from './routes/auth-simple';
import uploadRoutes from './routes/upload';
import blogRoutes from './routes/blog';
// import caseStudyRoutes from './routes/caseStudy'; // Disabled for SQLite compatibility
import caseStudyRoutes from './routes/caseStudy';
// import whitepaperRoutes from './routes/whitepaper'; // Disabled for SQLite compatibility
import userRoutes from './routes/user';

// Import middleware
import { errorHandler } from './middleware/errorHandler';
import { notFound } from './middleware/notFound';

// Load environment variables
dotenv.config();

const app = express();

// Security middleware
app.use(helmet());
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'http://localhost:3002',
  'http://localhost:3003',
  'http://localhost:10000',
  'https://www.myaibo.in',
  'https://myaibo.in',
  /^https:\/\/.*\.vercel\.app$/ // Allow all Vercel preview deployments
];

app.use(cors({
  origin(origin, callback) {
    // Allow server-to-server and tools without an Origin header
    if (!origin) {
      callback(null, true);
      return;
    }
    
    // Check if origin matches any allowed pattern
    const isAllowed = allowedOrigins.some(allowed => {
      if (typeof allowed === 'string') {
        return allowed === origin;
      } else if (allowed instanceof RegExp) {
        return allowed.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin'],
  exposedHeaders: ['Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(morgan('combined'));

// Static file serving for uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use('/contentseeding', express.static(path.join(__dirname, '../../contentseeding')));


// API routes
console.log('Registering auth routes...');
app.use('/api/auth', authRoutes);
console.log('Auth routes registered');

console.log('Registering auth-simple routes...');
app.use('/api/auth-simple', authSimpleRoutes);
console.log('Auth-simple routes registered');

console.log('Registering upload routes...');
app.use('/api/upload', uploadRoutes);
console.log('Upload routes registered');

console.log('Registering case study routes...');
app.use('/api/case-studies', caseStudyRoutes);
console.log('Case study routes registered');

console.log('Registering whitepaper routes...');
// app.use('/api/whitepapers', whitepaperRoutes); // Disabled for SQLite compatibility
console.log('Whitepaper routes registered');

console.log('Registering blog routes...');
app.use('/api/blog', blogRoutes);
console.log('Blog routes registered');

app.use('/api/users', userRoutes);

app.get('/contentseeding', (req, res) => {
  res.sendFile(path.join(__dirname, '../../contentseeding/index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
