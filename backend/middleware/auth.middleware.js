// backend/middleware/auth.middleware.js
// backend/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User.model.js');
const dotenv = require('dotenv');

dotenv.config();

/**
 * Protect – verify JWT and attach user to request
 */
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Header "Authorization: Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    // Optional HttpOnly cookie support
    token = req.cookies.token;
  }

  if (!token) {
    const err = new Error('Not authorized, token missing');
    err.status = 401;
    throw err;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach user without sensitive fields
    req.user = await User.findById(decoded.id).select('-password -__v -resetPasswordToken -resetPasswordExpire');
    if (!req.user) {
      const err = new Error('User not found');
      err.status = 404;
      throw err;
    }
    next();
  } catch (error) {
    const err = new Error('Not authorized, token invalid');
    err.status = 401;
    throw err;
  }
});

module.exports = { protect };
