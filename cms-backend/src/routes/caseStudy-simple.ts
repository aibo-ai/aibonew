import express from 'express';
import { Request, Response } from 'express';
import { FileStorage } from '../utils/storage';

const router = express.Router();
const caseStudyStorage = new FileStorage('case-studies');

// Initialize with default case study if none exist
const existingCaseStudies = caseStudyStorage.read();
if (existingCaseStudies.length === 0) {
  caseStudyStorage.add({
    title: 'AI-Powered Customer Service Transformation',
    slug: 'ai-customer-service-transformation',
    client_name: 'TechCorp Inc.',
    client_logo: '',
    challenge: 'High volume of support tickets causing delays and customer dissatisfaction.',
    solution: 'Implemented AI-powered chatbot and automated ticket routing system.',
    results: [
      {
        metric: 'Support Tickets',
        value: '60',
        unit: '%',
        description: 'Reduction in support tickets'
      },
      {
        metric: 'Response Time',
        value: '40',
        unit: '%',
        description: 'Faster response times'
      }
    ],
    content: 'Full case study content here...',
    featured_image: '',
    author_id: 'admin',
    status: 'published',
    published_at: new Date().toISOString(),
    industries: ['SaaS', 'Technology'],
    tags: ['AI', 'Customer Service', 'Automation'],
    testimonial: {
      quote: 'The AI implementation transformed our customer support operations.',
      author: 'John Smith',
      position: 'Head of Customer Success',
      company: 'TechCorp Inc.'
    },
    meta_title: 'AI Customer Service Case Study',
    meta_description: 'Learn how AI automation reduced support tickets by 60%',
    canonical_url: '',
    view_count: 0
  });
}

// @desc    Get all case studies (public)
// @route   GET /api/case-studies
// @access  Public
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as string;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 8;
    
    let caseStudies = caseStudyStorage.read();
    
    if (status && status !== 'all') {
      caseStudies = caseStudies.filter(cs => cs.status === status);
    }
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedCaseStudies = caseStudies.slice(startIndex, endIndex);
    
    return res.json({
      success: true,
      data: paginatedCaseStudies,
      count: caseStudies.length
    });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch case studies'
    });
  }
});

// @desc    Get case study by slug
// @route   GET /api/case-studies/:slug
// @access  Public
router.get('/:slug', async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const caseStudy = caseStudyStorage.findBySlug(slug);
    
    if (!caseStudy) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }
    
    return res.json(caseStudy);
  } catch (error) {
    console.error('Error fetching case study:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch case study'
    });
  }
});

// @desc    Create new case study
// @route   POST /api/case-studies
// @access  Private (Admin)
router.post('/', async (req: Request, res: Response) => {
  try {
    const caseStudyData = req.body;
    
    const newCaseStudy = caseStudyStorage.add(caseStudyData);
    
    return res.status(201).json({
      success: true,
      data: newCaseStudy
    });
  } catch (error) {
    console.error('Error creating case study:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to create case study'
    });
  }
});

// @desc    Update case study
// @route   PUT /api/case-studies/:id
// @access  Private (Admin)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const updatedCaseStudy = caseStudyStorage.update(id, updateData);
    
    if (!updatedCaseStudy) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }
    
    return res.json({
      success: true,
      data: updatedCaseStudy
    });
  } catch (error) {
    console.error('Error updating case study:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to update case study'
    });
  }
});

// @desc    Delete case study
// @route   DELETE /api/case-studies/:id
// @access  Private (Admin)
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const deleted = caseStudyStorage.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Case study not found'
      });
    }
    
    return res.json({
      success: true,
      message: 'Case study deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting case study:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to delete case study'
    });
  }
});

export default router;
