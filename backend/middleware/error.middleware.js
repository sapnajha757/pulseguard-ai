// middleware/error.middleware.js
// Structure only — centralized error formatting to be implemented.
const logger = require('../config/logger');

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // TODO: distinguish operational vs programming errors
  // TODO: format Mongoose validation / cast / duplicate-key errors
  logger.error(err.stack || err.message);

  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
};

module.exports = { errorHandler, notFound };
