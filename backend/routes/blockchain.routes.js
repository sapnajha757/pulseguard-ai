// backend/routes/blockchain.routes.js
// Routes for blockchain audit retrieval.

const express = require('express');
const { getAuditEvents } = require('../controllers/blockchain.controller');
const { protect } = require('../middleware/auth.middleware');
const { blockchainLimiter } = require('../middleware/blockchainRateLimiter');

const router = express.Router();

// Apply authentication and rate limiting to the audit endpoint.
router.get('/events', protect, blockchainLimiter, getAuditEvents);

module.exports = router;
