import winston from 'winston';
import path from 'path';

// Ensure logs directory exists
import fs from 'fs';
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const SENSITIVE_PATTERNS = [
  /\bpassword\s*[:=]\s*["']?([^"'\s]+)["']?/gi,
  /\btoken\s*[:=]\s*["']?([^"'\s]+)["']?/gi,
  /\bapi[_-]?key\s*[:=]\s*["']?([^"'\s]+)["']?/gi,
  /\bsecret\s*[:=]\s*["']?([^"'\s]+)["']?/gi,
  /\bauthorization\s*[:=]\s*bearer\s+["']?([^"'\s]+)["']?/gi,
];

// Sensitive keys for object sanitization
const SENSITIVE_KEYS = ['password', 'token', 'apikey', 'secret', 'authorization'];

const sanitizeMessage = (message: string): string => {
  let sanitized = message;
  SENSITIVE_PATTERNS.forEach(pattern => {
    sanitized = sanitized.split(pattern).join('');
  });
  return sanitized;
};

const customFormat = winston.format.printf(({ level, message, timestamp, ...info }) => {
  const messageStr = typeof message === 'string' ? message : JSON.stringify(message);
  let logMessage = `${timestamp} [${level.toUpperCase()}]: ${sanitizeMessage(messageStr)}`;

  // Sanitize any additional data in the log entry
  if (info.data && typeof info.data === 'object') {
    // Use a more robust cloning approach that handles circular references
    const seen = new WeakSet();
    const sanitizeObject = (obj: any): any => {
      if (typeof obj === 'string') {
        return sanitizeMessage(obj);
      }
      if (Array.isArray(obj)) {
        return obj.map(sanitizeObject);
      }
      if (obj && typeof obj === 'object') {
        if (seen.has(obj)) {
          return '[Circular]';
        }
        seen.add(obj);
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
    logMessage += ` | Data: ${JSON.stringify(info.data)}`;
  }

  return logMessage;
});

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    customFormat
  ),
  transports: [
    // Console transport for development
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        customFormat
      )
    }),
    // File transport for production logs
    new winston.transports.File({
      filename: path.join(logsDir, 'app.log'),
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    }),
    // Error log file
    new winston.transports.File({
      filename: path.join(logsDir, 'error.log'),
      level: 'error',
      maxsize: 5242880, // 5MB
      maxFiles: 5,
    })
  ]
});

export default logger;
