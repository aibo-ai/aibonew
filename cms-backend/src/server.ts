import app from './app';
import { connectDatabase } from './config/database';
import dns from 'dns';

const PORT = process.env.PORT || 3002;

// Prefer IPv4 DNS resolution to avoid IPv6 ENETUNREACH in some environments
try {
  // Node 18+
  dns.setDefaultResultOrder('ipv4first');
} catch {
  // no-op if not supported
}

const startServer = async () => {
  try {
    // Connect to database
    await connectDatabase();
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 CMS Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
