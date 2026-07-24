// middleware/auth.middleware.js
// Structure only — JWT verification logic to be implemented.

/**
 * Verifies the JWT from the Authorization header (or cookie) and
 * attaches the decoded user to req.user.
 * Implementation pending — see services/auth.service.js.
 */
const protect = async (req, res, next) => {
  // TODO: implement token extraction + verification
  next();
};

/**
 * Restricts a route to specific roles, e.g. restrictTo('admin', 'caregiver').
 * Implementation pending.
 */
const restrictTo = (...roles) => (req, res, next) => {
  // TODO: implement role check against req.user.role
  next();
};

module.exports = { protect, restrictTo };
