import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure upload directories exist
const uploadDirs = {
  images: './uploads/images',
  pdfs: './uploads/pdfs'
};

Object.values(uploadDirs).forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = './uploads';
    
    if (file.fieldname === 'featuredImage' || file.fieldname === 'coverImage' || file.fieldname === 'avatar' || file.fieldname === 'clientLogo') {
      uploadPath = uploadDirs.images;
    } else if (file.fieldname === 'pdf' || file.fieldname === 'pdfFile') {
      uploadPath = uploadDirs.pdfs;
    }
    
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '-');
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  }
});

// File filter
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const allowedPdfTypes = ['application/pdf'];
  
  if (file.fieldname === 'featuredImage' || file.fieldname === 'coverImage' || file.fieldname === 'avatar' || file.fieldname === 'clientLogo') {
    if (allowedImageTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only image files (JPEG, PNG, GIF, WebP) are allowed for images'));
    }
  } else if (file.fieldname === 'pdf' || file.fieldname === 'pdfFile') {
    if (allowedPdfTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'));
    }
  } else {
    cb(new Error('Invalid file field'));
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760'), // 10MB default
    files: 5 // Maximum 5 files per request
  }
});

// Middleware for different upload types
export const uploadImage = upload.single('featuredImage');
export const uploadAvatar = upload.single('avatar');
export const uploadClientLogo = upload.single('clientLogo');
export const uploadCoverImage = upload.single('coverImage');
export const uploadPdf = upload.single('pdf');
export const uploadMultiple = upload.array('files', 5);

// Helper function to delete file
export const deleteFile = (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.unlink(filePath, (err) => {
      if (err && err.code !== 'ENOENT') {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Helper function to get file size
export const getFileSize = (filePath: string): Promise<number> => {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(err);
      } else {
        resolve(stats.size);
      }
    });
  });
};

// Helper function to validate file exists
export const fileExists = (filePath: string): Promise<boolean> => {
  return new Promise((resolve) => {
    fs.access(filePath, fs.constants.F_OK, (err) => {
      resolve(!err);
    });
  });
};

export default upload;
