// controllers/alert.controller.js
// Route handlers only — dispatch logic lives in services/alert.service.js.
const asyncHandler = require('express-async-handler');
const alertService = require('../services/alert.service');

// @desc    Manually trigger an emergency alert
// @route   POST /api/v1/alerts
// @access  Private
const createAlert = asyncHandler(async (req, res) => {
  const userId = req.user?.id || req.body.userId;
  if (!userId) {
    return res.status(400).json({ success: false, message: 'User ID is required' });
  }
  const alert = await alertService.create(userId, req.body);
  res.status(201).json({ success: true, data: alert });
});

// @desc    Get all alerts for current user
// @route   GET /api/v1/alerts
// @access  Private
const getAlerts = asyncHandler(async (req, res) => {
  // TODO: delegate to alertService.findAllForUser(req.user.id, req.query)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Get a single alert by id
// @route   GET /api/v1/alerts/:id
// @access  Private
const getAlertById = asyncHandler(async (req, res) => {
  // TODO: delegate to alertService.findById(req.params.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Acknowledge an alert
// @route   PATCH /api/v1/alerts/:id/acknowledge
// @access  Private
const acknowledgeAlert = asyncHandler(async (req, res) => {
  // TODO: delegate to alertService.acknowledge(req.params.id, req.user.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Resolve an alert
// @route   PATCH /api/v1/alerts/:id/resolve
// @access  Private
const resolveAlert = asyncHandler(async (req, res) => {
  // TODO: delegate to alertService.resolve(req.params.id, req.user.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

module.exports = {
  createAlert,
  getAlerts,
  getAlertById,
  acknowledgeAlert,
  resolveAlert,
};
