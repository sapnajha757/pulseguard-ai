// backend/routes/adherence.routes.js
const express = require('express');
const {
  logMedicine,
  getTodayAdherence,
  getWeekAdherence,
  getMonthAdherence,
  getAdherenceHistory,
} = require('../controllers/adherence.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router.post('/log', logMedicine);
router.get('/today', getTodayAdherence);
router.get('/week', getWeekAdherence);
router.get('/month', getMonthAdherence);
router.get('/history', getAdherenceHistory);

module.exports = router;
