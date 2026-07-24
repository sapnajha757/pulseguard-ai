// backend/controllers/medicine.controller.js

const asyncHandler = require('express-async-handler');
const medicineService = require('../services/medicine.service');

/**
 * @desc   Create a new medicine entry
 * @route  POST /api/v1/medicines
 * @access Private (requires JWT)
 */
const createMedicine = asyncHandler(async (req, res) => {
  // If doctor, they can specify the target patient ID in request body
  let targetUserId = req.user.id;
  if (req.user.role === 'doctor' && req.body.patientId) {
    targetUserId = req.body.patientId;
  }

  const medicine = await medicineService.addMedicine(req.body, targetUserId);
  const { createAuditLog } = require('../services/blockchain.service');
  await createAuditLog({
    userId: targetUserId,
    walletAddress: req.user.walletAddress || '',
    eventType: 'MEDICINE_CREATED',
    timestamp: Date.now(),
  });
  res.status(201).json({ success: true, data: medicine });
});

/**
 * @desc   Get all medicines for the authenticated user
 * @route  GET /api/v1/medicines
 * @access Private
 */
const getMedicines = asyncHandler(async (req, res) => {
  let targetUserId = req.user.id;
  if ((req.user.role === 'doctor' || req.user.role === 'family') && req.query.patientId) {
    targetUserId = req.query.patientId;
  }
  const medicines = await medicineService.getMedicines(targetUserId);
  res.status(200).json({ success: true, data: medicines });
});

/**
 * @desc   Get a single medicine by ID (must belong to user)
 * @route  GET /api/v1/medicines/:id
 * @access Private
 */
const getMedicineById = asyncHandler(async (req, res) => {
  const medicine = await medicineService.getMedicineById(req.params.id, req.user.id);
  if (!medicine) {
    return res.status(404).json({ success: false, message: 'Medicine not found' });
  }
  res.status(200).json({ success: true, data: medicine });
});

/**
 * @desc   Update a medicine (only if owned by user)
 * @route  PUT /api/v1/medicines/:id
 * @access Private
 */
const updateMedicine = asyncHandler(async (req, res) => {
  const medicine = await medicineService.updateMedicine(req.params.id, req.body, req.user.id);
  if (!medicine) {
    return res.status(404).json({ success: false, message: 'Medicine not found or not authorized' });
  }
  res.status(200).json({ success: true, data: medicine });
});

/**
 * @desc   Delete a medicine (only if owned by user)
 * @route  DELETE /api/v1/medicines/:id
 * @access Private
 */
const deleteMedicine = asyncHandler(async (req, res) => {
  const medicine = await medicineService.deleteMedicine(req.params.id, req.user.id);
  if (!medicine) {
    return res.status(404).json({ success: false, message: 'Medicine not found or not authorized' });
  }
  res.status(200).json({ success: true, data: {} });
});

/**
 * @desc   Log adherence for a medicine (placeholder for future feature)
 * @route  POST /api/v1/medicines/:id/log
 * @access Private
 */
const logAdherence = asyncHandler(async (req, res) => {
  // Not implemented yet – return 501
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
