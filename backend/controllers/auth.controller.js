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

// Current User
const getMe = asyncHandler(async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Coming Soon',
  });
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Coming Soon',
  });
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  res.status(501).json({
    success: false,
    message: 'Coming Soon',
  });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
};