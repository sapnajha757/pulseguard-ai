// routes/risk.routes.js
const express = require('express');
const riskController = require('../controllers/risk.controller');
// const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/predict', riskController.predictRisk);
router.get('/history', riskController.getRiskHistory);
router.get('/latest', riskController.getLatestRisk);
router.get('/:id', riskController.getRiskById);

module.exports = router;
