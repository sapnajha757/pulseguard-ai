// controllers/alert.controller.js
const asyncHandler = require('express-async-handler');
const alertService = require('../services/alert.service');

// @desc    Manually trigger an emergency alert
// @route   POST /api/v1/alerts
// @access  Private
const createAlert = asyncHandler(async (req, res) => {
  const alert = await alertService.createAlert(req.user.id, req.body);
  res.status(201).json({ success: true, data: alert });
});

// @desc    Get all alerts for current user
// @route   GET /api/v1/alerts
// @access  Private
const getAlerts = asyncHandler(async (req, res) => {
  const alerts = await alertService.getUserAlerts(req.user.id);
  res.status(200).json({ success: true, data: alerts });
});

// @desc    Get a single alert by id
// @route   GET /api/v1/alerts/:id
// @access  Private
const getAlertById = asyncHandler(async (req, res) => {
  const alert = await alertService.getAlertById(req.params.id, req.user.id);
  if (!alert) {
    return res.status(404).json({ success: false, message: 'Alert not found' });
  }
  res.status(200).json({ success: true, data: alert });
});

// @desc    Acknowledge an alert
// @route   PATCH /api/v1/alerts/:id/acknowledge
// @access  Private
const acknowledgeAlert = asyncHandler(async (req, res) => {
  const alert = await alertService.acknowledgeAlert(req.params.id, req.user.id);
  if (!alert) {
    return res.status(404).json({ success: false, message: 'Alert not found' });
  }
  res.status(200).json({ success: true, data: alert });
});

// @desc    Resolve an alert
// @route   PATCH /api/v1/alerts/:id/resolve
// @access  Private
const resolveAlert = asyncHandler(async (req, res) => {
  const alert = await alertService.resolveAlert(req.params.id, req.user.id);
  if (!alert) {
    return res.status(404).json({ success: false, message: 'Active alert not found' });
  }
  res.status(200).json({ success: true, data: alert });
});

module.exports = {
  createAlert,
  getAlerts,
  getAlertById,
  acknowledgeAlert,
  resolveAlert,
};
