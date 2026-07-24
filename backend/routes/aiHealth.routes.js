// backend/routes/aiHealth.routes.js
const express = require('express');
const { getIntelligenceReport, getMedicationTimeline } = require('../controllers/aiHealth.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/intelligence', protect, getIntelligenceReport);
router.get('/patient/timeline', protect, getMedicationTimeline);

module.exports = router;
