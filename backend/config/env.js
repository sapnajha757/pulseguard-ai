// config/env.js
// Centralized, validated access to environment variables.
require('dotenv').config();

const required = ['MONGO_URI', 'JWT_SECRET'];

function loadEnv() {
  const missing = required.filter((key) => !process.env[key]);
  if (missing.length > 0 && process.env.NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.warn(`[env] Missing recommended environment variables: ${missing.join(', ')}`);
  }

  return {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    clientUrl: process.env.CLIENT_URL || '*',

    mongoUri: process.env.MONGO_URI,

    jwtSecret: process.env.JWT_SECRET,
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
    jwtCookieExpiresIn: process.env.JWT_COOKIE_EXPIRES_IN || 7,

    rateLimitWindowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
    rateLimitMax: Number(process.env.RATE_LIMIT_MAX) || 100,

    smtp: {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
      from: process.env.ALERT_EMAIL_FROM,
    },

    twilio: {
      accountSid: process.env.TWILIO_ACCOUNT_SID,
      authToken: process.env.TWILIO_AUTH_TOKEN,
      phoneNumber: process.env.TWILIO_PHONE_NUMBER,
    },

    riskModel: {
      apiUrl: process.env.RISK_MODEL_API_URL,
      apiKey: process.env.RISK_MODEL_API_KEY,
    },
  };
}

module.exports = loadEnv();
