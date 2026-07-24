// routes/alert.routes.js
const express = require('express');
const alertController = require('../controllers/alert.controller');
const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(protect);

router
  .route('/')
  .post(alertController.createAlert)
  .get(alertController.getAlerts);

router.get('/:id', alertController.getAlertById);
router.patch('/:id/acknowledge', alertController.acknowledgeAlert);
router.patch('/:id/resolve', alertController.resolveAlert);

module.exports = router;
