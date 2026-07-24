// backend/routes/doctorAnalytics.routes.js
const express = require('express');
const {
  getDashboardOverview,
  getHighRiskPatients,
  getPatientAnalytics,
  exportPatientPDFReport,
} = require('../controllers/doctorAnalytics.controller');
const { protect } = require('../middleware/auth.middleware');
const authorizeDoctor = require('../middleware/authorizeDoctor');

const router = express.Router();

// Role-restricted: Doctor access only
router.use(protect);
router.use(authorizeDoctor);

router.get('/dashboard', getDashboardOverview);
router.get('/high-risk', getHighRiskPatients);
router.get('/patient/:id/analytics', getPatientAnalytics);
router.get('/patient/:id/pdf', exportPatientPDFReport);

module.exports = router;
