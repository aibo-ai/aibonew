import express from 'express';
import { Request, Response } from 'express';
import { FileStorage } from '../utils/storage';
import { protect, AuthRequest } from '../middleware/auth-simple';

const router = express.Router();
const blogStorage = new FileStorage('blogs');

// Initialize with default blog if none exist
const existingBlogs = blogStorage.read();
if (existingBlogs.length === 0) {
  blogStorage.add({
    title: 'Getting Started with AI in Business',
    slug: 'getting-started-ai-business',
    excerpt: 'A comprehensive guide to implementing AI solutions in your business operations.',
    content: 'Full blog content here...',
    featured_image: '',
    featured_image_alt: '',
    author_id: 'admin',
    status: 'published',
    published_at: new Date().toISOString(),
    categories: ['AI', 'Business'],
    tags: ['AI', 'Business', 'Technology'],
    meta_title: 'Getting Started with AI in Business',
    meta_description: 'Learn how to implement AI solutions in your business',
    canonical_url: '',
    view_count: 0
  });
}

// @desc    Get all blogs (public)
// @route   GET /api/blog
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    
    let blogs = blogStorage.read();
    
    if (status && status !== 'all') {
      blogs = blogs.filter(blog => blog.status === status);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedBlogs = blogs.slice(startIndex, endIndex);
    
    return res.json({
      success: true,
      data: paginatedBlogs,
      count: blogs.length
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blogs'
    });
  }
});

// @desc    Get blog by ID (for admin editing)
// @route   GET /api/blog/id/:id
// @access  Private (Admin)
router.get('/id/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const blog = blogStorage.findById(id);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }
    
    return res.json(blog);
  } catch (error) {
    console.error('Error fetching blog by ID:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blog'
    });
  }
});

// @desc    Get blog by slug
// @route   GET /api/blog/:slug
// @access  Public
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = blogStorage.findBySlug(slug);
    
    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }
    
    return res.json(blog);
  } catch (error) {
    console.error('Error fetching blog:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch blog'
    });
  }
});

// @desc    Create new blog
// @route   POST /api/blog
// @access  Private (Admin)
router.post('/', protect, async (req: AuthRequest, res: Response) => {
  try {
    // Accept both camelCase and snake_case for featured_image fields
    const blogData = {
      ...req.body,
      featured_image: req.body.featured_image || req.body.featuredImage || '',
      featured_image_alt: req.body.featured_image_alt || req.body.featuredImageAlt || '',
    };
    const newBlog = blogStorage.add(blogData);
    return res.status(201).json({
      success: true,
      data: newBlog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create blog'
    });
  }
});

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private (Admin)
router.put('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    // Accept both camelCase and snake_case for featured_image fields
    const updateData = {
      ...req.body,
      featured_image: req.body.featured_image || req.body.featuredImage || '',
      featured_image_alt: req.body.featured_image_alt || req.body.featuredImageAlt || '',
    };
    const updatedBlog = blogStorage.update(id, updateData);
    if (!updatedBlog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }
    return res.json({
      success: true,
      data: updatedBlog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update blog'
    });
  }
});

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private (Admin)
router.delete('/:id', protect, async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    
    const deleted = blogStorage.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete blog'
    });
  }
});

export default router;
