import express from 'express';

const router = express.Router();

// @desc    Health check
// @route   GET /api/health
// @access  Public
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    message: 'MyAibo CMS API is running successfully!'
  });
});

export default router;
