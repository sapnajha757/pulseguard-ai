// controllers/medicine.controller.js
// Route handlers only — business logic lives in services/medicine.service.js.
const asyncHandler = require('express-async-handler');
// const medicineService = require('../services/medicine.service');

// @desc    Create a new medicine entry
// @route   POST /api/v1/medicines
// @access  Private
const createMedicine = asyncHandler(async (req, res) => {
  // TODO: delegate to medicineService.create(req.user.id, req.body)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Get all medicines for current user
// @route   GET /api/v1/medicines
// @access  Private
const getMedicines = asyncHandler(async (req, res) => {
  // TODO: delegate to medicineService.findAllForUser(req.user.id, req.query)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Get a single medicine by id
// @route   GET /api/v1/medicines/:id
// @access  Private
const getMedicineById = asyncHandler(async (req, res) => {
  // TODO: delegate to medicineService.findById(req.params.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Update a medicine entry
// @route   PUT /api/v1/medicines/:id
// @access  Private
const updateMedicine = asyncHandler(async (req, res) => {
  // TODO: delegate to medicineService.update(req.params.id, req.body)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Delete a medicine entry
// @route   DELETE /api/v1/medicines/:id
// @access  Private
const deleteMedicine = asyncHandler(async (req, res) => {
  // TODO: delegate to medicineService.remove(req.params.id)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Log medicine adherence (taken/missed/skipped)
// @route   POST /api/v1/medicines/:id/log
// @access  Private
const logAdherence = asyncHandler(async (req, res) => {
  // TODO: delegate to medicineService.logAdherence(req.params.id, req.body)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  logAdherence,
};
