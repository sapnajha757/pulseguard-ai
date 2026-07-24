// routes/auth.routes.js
const express = require('express');
const authController = require('../controllers/auth.controller');
// const { protect } = require('../middleware/auth.middleware');
// const { validate } = require('../middleware/validate.middleware');

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.get('/me', authController.getMe);
router.post('/forgot-password', authController.forgotPassword);
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;
