// controllers/auth.controller.js
// Route handlers only — business logic lives in services/auth.service.js.
const asyncHandler = require('express-async-handler');
// const authService = require('../services/auth.service');

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  // TODO: delegate to authService.register(req.body)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Log in a user
// @route   POST /api/v1/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  // TODO: delegate to authService.login(req.body)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Log out current user
// @route   POST /api/v1/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  // TODO: clear auth cookie / invalidate token
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Get currently authenticated user
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  // TODO: return req.user profile
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Request password reset
// @route   POST /api/v1/auth/forgot-password
// @access  Public
const forgotPassword = asyncHandler(async (req, res) => {
  // TODO: delegate to authService.forgotPassword(req.body.email)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

// @desc    Reset password with token
// @route   PATCH /api/v1/auth/reset-password/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  // TODO: delegate to authService.resetPassword(req.params.token, req.body.password)
  res.status(501).json({ success: false, message: 'Not implemented' });
});

module.exports = {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
};
