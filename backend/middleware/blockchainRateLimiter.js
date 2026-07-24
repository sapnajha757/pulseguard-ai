// backend/middleware/blockchainRateLimiter.js
// Rate limiting middleware for blockchain audit endpoints to prevent abuse.
// Uses express-rate-limit. Adjust limits as needed for production.

const rateLimit = require('express-rate-limit');

// Example: limit to 20 requests per minute per IP.
const blockchainLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: {
    success: false,
    message: 'Too many blockchain requests, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { blockchainLimiter };
