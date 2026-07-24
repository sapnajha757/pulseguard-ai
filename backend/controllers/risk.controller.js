// controllers/risk.controller.js
// Route handlers only — prediction logic lives in services/risk.service.js.
const asyncHandler = require('express-async-handler');
const riskService = require('../services/risk.service');

// @desc    Run a new risk prediction for the current user
// @route   POST /api/v1/risk/predict
// @access  Private
const predictRisk = asyncHandler(async (req, res) => {
  const result = await riskService.predict(req.user.id, req.body);
  res.status(200).json({ success: true, data: result });
});

// @desc    Get risk assessment history for current user
// @route   GET /api/v1/risk/history
// @access  Private
const getRiskHistory = asyncHandler(async (req, res) => {
  const history = await riskService.findHistoryForUser(req.user.id, req.query);
  res.status(200).json({ success: true, data: history });
});

// @desc    Get a single risk assessment by id
// @route   GET /api/v1/risk/:id
// @access  Private
const getRiskById = asyncHandler(async (req, res) => {
  // TODO: delegate to riskService.findById(req.params.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Get the latest risk assessment for current user
// @route   GET /api/v1/risk/latest
// @access  Private
const getLatestRisk = asyncHandler(async (req, res) => {
  // TODO: delegate to riskService.findLatestForUser(req.user.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

module.exports = {
  predictRisk,
  getRiskHistory,
  getRiskById,
  getLatestRisk,
};
