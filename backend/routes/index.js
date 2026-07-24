// routes/index.js
console.log('🚀 Routes index loaded');
// Aggregates all feature routers under a single mount point.
const express = require('express');

console.log('🔐 Auth routes loaded');
const authRoutes = require('./auth.routes');
console.log("Routes loaded");
const medicineRoutes = require('./medicine.routes');
const riskRoutes = require('./risk.routes');
const alertRoutes = require('./alert.routes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/medicines', medicineRoutes);
router.use('/risk', riskRoutes);
router.use('/alerts', alertRoutes);

module.exports = router;
