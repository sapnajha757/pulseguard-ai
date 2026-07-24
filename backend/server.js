// server.js
// Application entrypoint: middleware wiring, DB connection, and startup.
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');

const env = require('./config/env');
const logger = require('./config/logger');
const connectDB = require('./config/db');
const apiRoutes = require('./routes');
const { errorHandler, notFound } = require('./middleware/error.middleware');

const app = express();

// --- Security & core middleware ---
app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);
app.use(compression());
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Logging ---
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));

// --- Rate limiting ---
const limiter = rateLimit({
  windowMs: env.rateLimitWindowMs,
  max: env.rateLimitMax,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// --- Health check ---
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'pulseguard-ai-backend' });
});

// --- API routes ---
app.use('/api/v1', apiRoutes);

// --- 404 + error handling ---
app.use(notFound);
app.use(errorHandler);

// --- Startup ---
const startServer = async () => {
  await connectDB();

  const server = app.listen(env.port, () => {
    logger.info(`PulseGuard AI backend running in ${env.nodeEnv} mode on port ${env.port}`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(`Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });

  process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully.');
    server.close(() => process.exit(0));
  });
};

startServer();

module.exports = app;
