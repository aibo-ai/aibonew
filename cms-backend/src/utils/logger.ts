import winston from 'winston';

// Define sensitive patterns to sanitize
const SENSITIVE_PATTERNS = [
  /password["\s]*:[\s]*["'][^"']*["']/gi,
  /token["\s]*:[\s]*["'][^"']*["']/gi,
  /secret["\s]*:[\s]*["'][^"']*["']/gi,
  /key["\s]*:[\s]*["'][^"']*["']/gi,
  /authorization["\s]*:[\s]*["'][^"']*["']/gi,
  /bearer[\s]+[^"'\s]+/gi,
  /jwt["\s]*:[\s]*["'][^"']*["']/gi,
  /session["\s]*:[\s]*["'][^"']*["']/gi,
  /cookie["\s]*:[\s]*["'][^"']*["']/gi,
  /auth["\s]*:[\s]*["'][^"']*["']/gi,
];

// Sanitize function to remove sensitive data
const sanitizeMessage = (message: string): string => {
  let sanitized = message;
  SENSITIVE_PATTERNS.forEach(pattern => {
    sanitized = sanitized.replace(pattern, (match) => {
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
    const sanitizedData = JSON.parse(JSON.stringify(info.data));
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
          if (SENSITIVE_PATTERNS.some(pattern => pattern.test(key.toLowerCase()))) {
            result[key] = '[REDACTED]';
          } else {
            result[key] = sanitizeObject(value);
          }
        }
        return result;
      }
      return obj;
    };
    info.data = sanitizeObject(sanitizedData);
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

// Create logs directory if it doesn't exist
import fs from 'fs';
import path from 'path';

const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

export default logger;

// Export sanitize function for use in other modules
export { sanitizeMessage };
