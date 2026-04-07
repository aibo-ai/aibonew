import winston from 'winston';
import fs from 'fs';
import path from 'path';

// Create logs directory if it doesn't exist
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Define sensitive patterns to sanitize (removed global flag)
const SENSITIVE_PATTERNS = [
  /password["\s]*:[\s]*["'][^"']*["']/i,
  /token["\s]*:[\s]*["'][^"']*["']/i,
  /secret["\s]*:[\s]*["'][^"']*["']/i,
  /key["\s]*:[\s]*["'][^"']*["']/i,
  /authorization["\s]*:[\s]*["'][^"']*["']/i,
  /bearer[\s]+[^"'\s]+/i,
  /jwt["\s]*:[\s]*["'][^"']*["']/i,
  /session["\s]*:[\s]*["'][^"']*["']/i,
  /cookie["\s]*:[\s]*["'][^"']*["']/i,
  /auth["\s]*:[\s]*["'][^"']*["']/i,
];

// Define sensitive keys for object sanitization
const SENSITIVE_KEYS = ['password', 'token', 'secret', 'key', 'authorization', 'bearer', 'jwt', 'session', 'cookie', 'auth'];

// Sanitize function to remove sensitive data
const sanitizeMessage = (message: string): string => {
  let sanitized = message;
  SENSITIVE_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, (match) => {
      // Handle bearer tokens separately (no colon separator)
      if (match.toLowerCase().startsWith('bearer')) {
        return 'Bearer [REDACTED]';
      }
      const key = match.split(':')[0].trim();
      return `${key}: [REDACTED]`;
    });
  });
  return sanitized;
};

// Custom format for sanitizing logs
const sanitizeFormat = winston.format((info) => {
  if (typeof info.message === 'string') {
    info.message = sanitizeMessage(info.message);
  }

  // Sanitize any additional data in the log entry
  if (info.data && typeof info.data === 'object') {
    // Use a more robust cloning approach that handles circular references
    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        return sanitizeMessage(obj);
      }
      if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      }
      if (obj && typeof obj === 'object') {
        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
          // Fix key matching logic - check keys using simple string matching
          const keyLower = key.toLowerCase();
          if (SENSITIVE_KEYS.some(sensitiveKey => keyLower.includes(sensitiveKey))) {
            result[key] = '[REDACTED]';
          } else {
            result[key] = sanitizeObject(value);
          }
        }
        return result;
      }
      return obj;
    };
    info.data = sanitizeObject(info.data);
  }

  return info;
});

// Create logger instance
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    sanitizeFormat(),
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'cms-backend' },
  transports: [
    // Write all logs with importance level of `error` or less to `error.log`
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    // Write all logs with importance level of `info` or less to `combined.log`
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});

// If we're not in production then log to the console with a simple format
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      sanitizeFormat(),
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

export default logger;

// Export sanitize function for use in other modules
export { sanitizeMessage };
