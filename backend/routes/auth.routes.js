// backend/routes/auth.routes.js
console.log('🔐 Auth routes loaded');

const express = require('express');
const {
  register,
  login,
  logout,
  getMe,
  forgotPassword,
  updateProfileDetails,
  connectPatient,
} = require('../controllers/auth.controller');

const { protect } = require('../middleware/auth.middleware');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.patch('/reset-password/:token', resetPassword);

// Protected routes
router.get('/me', protect, getMe);
router.post('/logout', protect, logout);
router.put('/profile/update', protect, updateProfileDetails);
router.post('/connect-patient', protect, connectPatient);

module.exports = router;