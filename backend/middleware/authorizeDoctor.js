// backend/middleware/authorizeDoctor.js
// Middleware to ensure the request is made by a user with role 'DOCTOR'.

module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }
  if (req.user.role !== 'DOCTOR') {
    return res.status(403).json({ success: false, message: 'Doctor access required' });
  }
  next();
};
