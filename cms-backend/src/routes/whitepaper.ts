import express from 'express';
import { Op } from 'sequelize';
import Whitepaper from '../models/Whitepaper';
import User from '../models/User';
import { protect, authorize, AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Get all whitepapers (public)
// @route   GET /api/whitepapers
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const topic = req.query.topic as string;
    const search = req.query.search as string;
    const status = req.query.status as string || 'published';

    // Build where clause
    const whereClause: any = {};
    
    if (status === 'published') {
      whereClause.status = 'published';
      whereClause.published_at = { [Op.not]: null };
    } else if (status) {
      whereClause.status = status;
    }

    if (topic) {
      whereClause.topics = { [Op.contains]: [topic] };
    }

    if (search) {
      whereClause[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { abstract: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const whitepapers = await Whitepaper.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatar']
        }
      ],
      order: [['published_at', 'DESC']]
    });

    res.json({
      success: true,
      count: whitepapers.length,
      data: whitepapers
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single whitepaper
// @route   GET /api/whitepapers/:slug
// @access  Public
router.get('/:slug', async (req, res, next) => {
  try {
    const whitepaper = await Whitepaper.findOne({
      where: { slug: req.params.slug },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'firstName', 'lastName', 'avatar', 'bio']
        }
      ]
    });

    if (!whitepaper) {
      res.status(404).json({
        success: false,
        message: 'Whitepaper not found'
      });
      return;
    }

    res.json({
      success: true,
      data: {
        ...whitepaper.toJSON(),
        formattedFileSize: whitepaper.getFormattedFileSize(),
        estimatedReadingTime: whitepaper.getEstimatedReadingTime()
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Download whitepaper
// @route   POST /api/whitepapers/:slug/download
// @access  Public
router.post('/:slug/download', async (req, res, next) => {
  try {
    const { email, name } = req.body;
    const whitepaper = await Whitepaper.findOne({
      where: { slug: req.params.slug }
    });

    if (!whitepaper) {
      res.status(404).json({
        success: false,
        message: 'Whitepaper not found'
      });
      return;
    }

    if (!whitepaper.isPublished()) {
      res.status(404).json({
        success: false,
        message: 'Whitepaper not available'
      });
      return;
    }

    // Increment download count
    await whitepaper.incrementDownloadCount();

    // TODO: Add email to mailing list if gated
    if (whitepaper.isGated && email) {
      // Integrate with Mailchimp or email service
      console.log(`Adding ${email} to mailing list for whitepaper: ${whitepaper.title}`);
    }

    res.json({
      success: true,
      data: {
        downloadUrl: whitepaper.pdfUrl,
        message: 'Download link generated successfully'
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new whitepaper
// @route   POST /api/whitepapers
// @access  Private
router.post('/', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
    const whitepaperData = {
      ...req.body,
      authorId: req.user.id
    };

    const whitepaper = await Whitepaper.create(whitepaperData);

    res.status(201).json({
      success: true,
      data: whitepaper
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update whitepaper
// @route   PUT /api/whitepapers/:id
// @access  Private
router.put('/:id', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const whitepaper = await Whitepaper.findByPk(id);

    if (!whitepaper) {
      res.status(404).json({
        success: false,
        message: 'Whitepaper not found'
      });
      return;
    }

    // Check if user is author or admin
    if (whitepaper.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this whitepaper'
      });
      return;
    }

    await whitepaper.update(req.body);

    res.json({
      success: true,
      data: whitepaper
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete whitepaper
// @route   DELETE /api/whitepapers/:id
// @access  Private
router.delete('/:id', protect, authorize('admin', 'editor'), async (req: AuthRequest, res, next) => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const whitepaper = await Whitepaper.findByPk(id);

    if (!whitepaper) {
      res.status(404).json({
        success: false,
        message: 'Whitepaper not found'
      });
      return;
    }

    // Check if user is author or admin
    if (whitepaper.authorId !== req.user.id && req.user.role !== 'admin') {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this whitepaper'
      });
      return;
    }

    await whitepaper.destroy();

    res.json({
      success: true,
      message: 'Whitepaper deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get whitepaper topics
// @route   GET /api/whitepapers/meta/topics
// @access  Public
router.get('/meta/topics', async (req, res, next) => {
  try {
    const whitepapers = await Whitepaper.findAll({
      where: { status: 'published' },
      attributes: ['topics']
    });

    const topics = [...new Set(whitepapers.flatMap(wp => wp.topics))];
    
    res.json({
      success: true,
      data: topics
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get whitepaper tags
// @route   GET /api/whitepapers/meta/tags
// @access  Public
router.get('/meta/tags', async (req, res, next) => {
  try {
    const whitepapers = await Whitepaper.findAll({
      where: { status: 'published' },
      attributes: ['tags']
    });

    const tags = [...new Set(whitepapers.flatMap(wp => wp.tags))];
    
    res.json({
      success: true,
      data: tags
    });
  } catch (error) {
    next(error);
  }
});

export default router;
