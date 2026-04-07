import express from 'express';
import { Request, Response } from 'express';
import { FileStorage } from '../utils/storage';

const router = express.Router();
const whitepaperStorage = new FileStorage('whitepapers');

// Initialize with default whitepaper if none exist
const existingWhitepapers = whitepaperStorage.read();
if (existingWhitepapers.length === 0) {
  whitepaperStorage.add({
    title: 'The Future of AI in Business',
    slug: 'future-ai-business',
    abstract: 'A comprehensive guide to implementing AI solutions in modern businesses.',
    key_takeaways: ['AI adoption strategies', 'ROI measurement', 'Implementation best practices'],
    pdf_url: '',
    cover_image: '',
    author_id: 'admin',
    status: 'published',
    published_at: new Date().toISOString(),
    topics: ['AI', 'Business Strategy'],
    tags: ['AI', 'Business', 'Strategy'],
    is_gated: true,
    download_count: 0,
    meta_title: 'AI in Business Whitepaper',
    meta_description: 'Learn how to implement AI solutions in your business',
    canonical_url: '',
    file_size: 0
  });
}

// @desc    Get all whitepapers (public)
// @route   GET /api/whitepapers
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    
    let whitepapers = whitepaperStorage.read();
    
    if (status && status !== 'all') {
      whitepapers = whitepapers.filter(wp => wp.status === status);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedWhitepapers = whitepapers.slice(startIndex, endIndex);
    
    return res.json({
      success: true,
      data: paginatedWhitepapers,
      count: whitepapers.length
    });
  } catch (error) {
    console.error('Error fetching whitepapers:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch whitepapers'
    });
  }
});

// @desc    Get whitepaper by slug
// @route   GET /api/whitepapers/:slug
// @access  Public
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const whitepaper = whitepaperStorage.findBySlug(slug);
    
    if (!whitepaper) {
      return res.status(404).json({
        success: false,
        error: 'Whitepaper not found'
      });
    }
    
    return res.json(whitepaper);
  } catch (error) {
    console.error('Error fetching whitepaper:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch whitepaper'
    });
  }
});

// @desc    Create new whitepaper
// @route   POST /api/whitepapers
// @access  Private (Admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const whitepaperData = req.body;
    
    const newWhitepaper = whitepaperStorage.add(whitepaperData);
    
    return res.status(201).json({
      success: true,
      data: newWhitepaper
    });
  } catch (error) {
    console.error('Error creating whitepaper:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create whitepaper'
    });
  }
});

// @desc    Update whitepaper
// @route   PUT /api/whitepapers/:id
// @access  Private (Admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedWhitepaper = whitepaperStorage.update(id, updateData);
    
    if (!updatedWhitepaper) {
      return res.status(404).json({
        success: false,
        error: 'Whitepaper not found'
      });
    }
    
    return res.json({
      success: true,
      data: updatedWhitepaper
    });
  } catch (error) {
    console.error('Error updating whitepaper:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update whitepaper'
    });
  }
});

// @desc    Delete whitepaper
// @route   DELETE /api/whitepapers/:id
// @access  Private (Admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    
    const deleted = whitepaperStorage.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Whitepaper not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Whitepaper deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting whitepaper:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete whitepaper'
    });
  }
});

export default router;
