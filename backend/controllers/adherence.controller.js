// backend/controllers/adherence.controller.js
const asyncHandler = require('express-async-handler');
const adherenceService = require('../services/adherence.service');

/**
 * @desc   Log medication dose action (TAKEN, MISSED, DELAYED, SKIPPED)
 * @route  POST /api/v1/adherence/log
 * @access Private
 */
const logMedicine = asyncHandler(async (req, res) => {
  const { medicineId, status, notes } = req.body;
  if (!medicineId || !status) {
    return res.status(400).json({ success: false, message: 'medicineId and status are required' });
  }

  const result = await adherenceService.logMedicine(req.user.id, { medicineId, status, notes });
  res.status(200).json({ success: true, data: result });
});

/**
 * @desc   Get daily adherence summary
 * @route  GET /api/v1/adherence/today
 * @access Private
 */
const getTodayAdherence = asyncHandler(async (req, res) => {
  const data = await adherenceService.calculateDailyAdherence(req.user.id);
  res.status(200).json({ success: true, data });
});

/**
 * @desc   Get weekly adherence percentage
 * @route  GET /api/v1/adherence/week
 * @access Private
 */
const getWeekAdherence = asyncHandler(async (req, res) => {
  const adherence = await adherenceService.calculateWeeklyAdherence(req.user.id);
  res.status(200).json({ success: true, data: { weeklyAdherence: adherence } });
});

/**
 * @desc   Get monthly adherence percentage
 * @route  GET /api/v1/adherence/month
 * @access Private
 */
const getMonthAdherence = asyncHandler(async (req, res) => {
  const adherence = await adherenceService.calculateMonthlyAdherence(req.user.id);
  res.status(200).json({ success: true, data: { monthlyAdherence: adherence } });
});

/**
 * @desc   Get adherence history timeline
 * @route  GET /api/v1/adherence/history
 * @access Private
 */
const getAdherenceHistory = asyncHandler(async (req, res) => {
  const history = await adherenceService.getMedicationTimeline(req.user.id);
  res.status(200).json({ success: true, data: history });
});

module.exports = {
  logMedicine,
  getTodayAdherence,
  getWeekAdherence,
  getMonthAdherence,
  getAdherenceHistory,
};
