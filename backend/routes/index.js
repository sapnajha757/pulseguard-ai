// backend/routes/index.js
const express = require('express');

const authRoutes = require('./auth.routes');
const medicineRoutes = require('./medicine.routes');
const riskRoutes = require('./risk.routes');
const alertRoutes = require('./alert.routes');
const blockchainRoutes = require('./blockchain.routes');
const aiRecommendationRoutes = require('./aiRecommendation.routes');
const aiHealthRoutes = require('./aiHealth.routes');
const adherenceRoutes = require('./adherence.routes');
const doctorAnalyticsRoutes = require('./doctorAnalytics.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/medicines', medicineRoutes);
router.use('/risk', riskRoutes);
router.use('/alerts', alertRoutes);
router.use('/blockchain', blockchainRoutes);
router.use('/recommendations', aiRecommendationRoutes);
router.use('/health', aiHealthRoutes);
router.use('/patient', aiHealthRoutes);
router.use('/adherence', adherenceRoutes);
router.use('/doctor', doctorAnalyticsRoutes);

module.exports = router;
