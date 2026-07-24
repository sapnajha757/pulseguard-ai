const asyncHandler = require('express-async-handler');
const authService = require('../services/auth.service');

// Register
const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  res.status(201).json(result);
});

// Login
const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  res.status(200).json(result);
});

// Logout
const logout = asyncHandler(async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Coming Soon',
  });
});

const getMe = asyncHandler(async (req, res) => {
  const User = require('../models/User.model');
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user
  });
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Coming Soon',
  });
});

// Update connection details
const updateProfileDetails = asyncHandler(async (req, res) => {
  const User = require('../models/User.model');
  const { doctorDetails, familyDetails, diseaseInfo } = req.body;

  const updateFields = {};
  if (doctorDetails) updateFields.doctorDetails = doctorDetails;
  if (familyDetails) updateFields.familyDetails = familyDetails;
  if (diseaseInfo) updateFields.diseaseInfo = diseaseInfo;

  const user = await User.findByIdAndUpdate(
    req.user.id,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    user
  });
});

// Connect to a patient by email
const connectPatient = asyncHandler(async (req, res) => {
  const User = require('../models/User.model');
  const { email } = req.body;

  const patient = await User.findOne({ email, role: 'patient' });
  if (!patient) {
    return res.status(404).json({ success: false, message: 'Patient with this email not found.' });
  }

  // If user is a doctor or family, link them
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { $addToSet: { connectedPatients: patient._id } },
    { new: true }
  );

  // Cross link on the patient profile
  if (req.user.role === 'doctor') {
    patient.doctorDetails = {
      name: req.user.name,
      email: req.user.email,
      connected: true,
      connectedDoctorId: req.user.id
    };
  } else if (req.user.role === 'family') {
    patient.familyDetails = {
      name: req.user.name,
      email: req.user.email,
      connected: true,
      connectedFamilyId: req.user.id
    };
  }
  await patient.save();

  res.status(200).json({
    success: true,
    user: updatedUser,
    message: `Successfully connected with patient ${patient.name}`
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  updateProfileDetails,
  connectPatient,
};