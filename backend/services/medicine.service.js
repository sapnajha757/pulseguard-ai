// backend/services/medicine.service.js

const Medicine = require('../models/Medicine.model');

/**
 * Add a new medicine for a user.
 * @param {Object} data - Medicine data from request body.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Object>} Created medicine document.
 */
const addMedicine = async (data, userId) => {
  const medicine = await Medicine.create({ ...data, user: userId });
  return medicine;
};

/**
 * Retrieve all medicines belonging to a user.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Array>} List of medicines.
 */
const getMedicines = async (userId) => {
  const medicines = await Medicine.find({ user: userId });
  return medicines;
};

/**
 * Retrieve a single medicine by its ID, ensuring ownership.
 * @param {string} medicineId - Medicine document ID.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Object|null>} Medicine document or null.
 */
const getMedicineById = async (medicineId, userId) => {
  const medicine = await Medicine.findOne({ _id: medicineId, user: userId });
  return medicine; // null if not found or not owned
};

/**
 * Update a medicine belonging to the user.
 * @param {string} medicineId - Medicine document ID.
 * @param {Object} data - Fields to update.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Object|null>} Updated medicine or null.
 */
const updateMedicine = async (medicineId, data, userId) => {
  const medicine = await Medicine.findOneAndUpdate(
    { _id: medicineId, user: userId },
    data,
    { new: true, runValidators: true }
  );
  return medicine; // null if not found / not owned
};

/**
 * Delete a medicine belonging to the user.
 * @param {string} medicineId - Medicine document ID.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Object|null>} Deleted medicine or null.
 */
const deleteMedicine = async (medicineId, userId) => {
  const medicine = await Medicine.findOneAndDelete({ _id: medicineId, user: userId });
  return medicine; // null if not found / not owned
};

module.exports = {
  addMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
};