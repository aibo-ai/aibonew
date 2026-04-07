import express from 'express';
import { Op, WhereAttributeHash, WhereAttributeHashValue } from 'sequelize';
import Blog from '../models/Blog';
import User from '../models/User';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get all blogs (public)
// @route   GET /api/blog
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const category = req.query.category as string;
    const tag = req.query.tag as string;
    const search = req.query.search as string;
    const status = req.query.status as string || 'published';

    const offset = (page - 1) * limit;

    // Build where clause
    const whereClause: any = {};
    
    if (status === 'published') {
      whereClause.status = 'published';
      whereClause.published_at = { [Op.not]: null };
    } else if (status) {
      whereClause.status = status;
    }

    if (category) {
      whereClause.categories = { [Op.contains]: [category] };
    }

    if (tag) {
      whereClause.tags = { [Op.contains]: [tag] };
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: blogs } = await Blog.findAndCountAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        }
      ],
      order: [['published_at', 'DESC']],
      limit,
      offset
    });

    res.json({
      success: true,
      count,
      pagination: {
        page,
        pages: Math.ceil(count / limit),
        limit,
        total: count
      },
      data: blogs
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single blog by ID
// @route   GET /api/blog/id/:id
// @access  Private
router.get('/id/:id', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const blog = await Blog.findByPk(id, {
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatar', 'bio']
        }
      ]
    });

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
      return;
    }

    // Check if user is author or admin
    if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to view this blog'
      });
      return;
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single blog
// @route   GET /api/blog/:slug
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const blog = await Blog.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatar', 'bio']
        }
      ]
    });

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
      return;
    }

    // Increment view count for published blogs
    if (blog.isPublished()) {
      await blog.incrementViewCount();
    }

    // Get related blogs - simplified for SQLite compatibility
    const relatedBlogs = await Blog.findAll({
      where: {
        id: { [Op.ne]: blog.id },
        status: 'published',
        published_at: { [Op.not]: null as unknown as WhereAttributeHashValue<Date | undefined> }
      },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName']
        }
      ],
      order: [['published_at', 'DESC']],
      limit: 3
    });

    res.json({
      success: true,
      data: {
        ...blog.toJSON(),
        relatedBlogs,
        readingTime: blog.getReadingTime(),
        tableOfContents: blog.generateTableOfContents()
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new blog
// @route   POST /api/blog
// @access  Private
router.post('/', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
     const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : typeof req.body.tags === 'string'
        ? JSON.parse(req.body.tags)
        : [];

    const categories = Array.isArray(req.body.categories)
      ? req.body.categories
      : typeof req.body.categories === 'string'
        ? JSON.parse(req.body.categories)
        : [];
    // Accept both camelCase and snake_case for featured_image fields
    const featured_image = req.body.featured_image || req.body.featuredImage;
    const featured_image_alt = req.body.featured_image_alt || req.body.featuredImageAlt;
    // Map camelCase fields to snake_case for Sequelize
    const blogData: any = {
      title: req.body.title,
      slug: req.body.slug,
      excerpt: req.body.excerpt,
      content: req.body.content,
      status: req.body.status,
      categories,
      tags,
      meta_title: req.body.metaTitle,
      meta_description: req.body.metaDescription,
      canonical_url: req.body.canonicalUrl,
      published_at: req.body.status === 'published' ? new Date() : null,
      authorId: req.user.id
    };
    if (featured_image) blogData.featured_image = featured_image;
    if (featured_image_alt) blogData.featured_image_alt = featured_image_alt;

    const blog = await Blog.create(blogData);

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update blog
// @route   PUT /api/blog/:id
// @access  Private
router.put('/:id', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
      return;
    }

    // Check if user is author or admin
    if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this blog'
      });
      return;
    }

    const tags = Array.isArray(req.body.tags)
      ? req.body.tags
      : typeof req.body.tags === 'string'
        ? JSON.parse(req.body.tags)
        : [];

    const categories = Array.isArray(req.body.categories)
      ? req.body.categories
      : typeof req.body.categories === 'string'
        ? JSON.parse(req.body.categories)
        : [];

    // Accept both camelCase and snake_case for featured_image fields
    const featured_image = req.body.featured_image || req.body.featuredImage;
    const featured_image_alt = req.body.featured_image_alt || req.body.featuredImageAlt;
    const updateData: any = { ...req.body, tags, categories };
    if (featured_image) updateData.featured_image = featured_image;
    if (featured_image_alt) updateData.featured_image_alt = featured_image_alt;

    // Set published_at when status changes to 'published'
    if (updateData.status === 'published' && blog.status !== 'published') {
      updateData.published_at = new Date();
    }

    await blog.update(updateData);

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete blog
// @route   DELETE /api/blog/:id
// @access  Private
router.delete('/:id', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const blog = await Blog.findByPk(id);

    if (!blog) {
      res.status(404).json({
        success: false,
        message: 'Blog not found'
      });
      return;
    }

    // Check if user is author or admin
    if (blog.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this blog'
      });
      return;
    }

    await blog.destroy();

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get blog categories
// @route   GET /api/blog/categories
// @access  Public
router.get('/meta/categories', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: 'published' },
      attributes: ['categories']
    });

    const categories = [...new Set(blogs.flatMap(blog => blog.categories))];
    
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get blog tags
// @route   GET /api/blog/tags
// @access  Public
router.get('/meta/tags', async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      where: { status: 'published' },
      attributes: ['tags']
    });

    const tags = [...new Set(blogs.flatMap(blog => blog.tags))];
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
});

export default router;
