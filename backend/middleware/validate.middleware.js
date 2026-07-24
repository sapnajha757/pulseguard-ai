// middleware/validate.middleware.js
// Structure only — wraps express-validator result handling.
const { validationResult } = require('express-validator');

/**
 * Runs after an array of express-validator chains on a route.
 * Implementation pending — collect and format validation errors.
 */
const validate = (req, res, next) => {
  // TODO: check validationResult(req), return 422 with formatted errors
  next();
};

module.exports = { validate };
