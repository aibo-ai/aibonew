import express from 'express';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/User';
import { protect } from '../middleware/auth';
import { AuthRequest } from '../middleware/auth';

const router = express.Router();

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName, role = 'editor' } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User already exists'
      });
      return;
    }

    // Create user
    const user = await User.create({
      email,
      password,
      firstName,
      lastName,
      role,
      isActive: true
    });

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role } as unknown as object, jwtSecret as unknown as string, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as unknown as SignOptions) as unknown as string;

    res.status(201).json({
      success: true,
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  console.log("is it coming in auth.ts");
  try {
    const { email, password } = req.body;
    console.log("what is the password here auth.ts", password);

    // Validate email & password
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: 'Please provide an email and password'
      });
      return;
    }

    // Check for user
    const user = await User.findOne({ where: { email } });
    if (!user || !user.isActive) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Check if password matches
    console.log("About to validate password for user:", user.email);
    console.log("Password provided:", password);
    const isMatch = await user.validatePassword(password);
    console.log("Password match result:", isMatch);
    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
      return;
    }

    // Update last login
    user.lastLoginAt = new Date();
    await user.save();

    // Generate JWT
    const jwtSecret = process.env.JWT_SECRET || 'fallback-secret';
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role } as unknown as object, jwtSecret as unknown as string, { expiresIn: process.env.JWT_EXPIRES_IN || '30d' } as unknown as SignOptions) as unknown as string;

    res.json({
      success: true,
      token,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req: AuthRequest, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    
    res.json({
      success: true,
      user: user?.toJSON()
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req: AuthRequest, res, next) => {
  try {
    const { firstName, lastName, bio, avatar } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      bio: bio || user.bio,
      avatar: avatar || user.avatar
    });

    res.json({
      success: true,
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
router.put('/change-password', protect, async (req: AuthRequest, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findByPk(req.user.id);
    if (!user) {
      res.status(404).json({
        success: false,
        message: 'User not found'
      });
      return;
    }

    // Check current password
    const isMatch = await user.validatePassword(currentPassword);
    if (!isMatch) {
      res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
      return;
    }

    // Update password
    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    next(error);
  }
});

export default router;
