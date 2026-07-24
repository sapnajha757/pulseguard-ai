// utils/notification.js
// Simple placeholder notification utilities
function sendSMS(phone, message) {
  // TODO: integrate with Twilio or other SMS provider
  console.log(`[SMS] to ${phone}: ${message}`);
}

function sendEmail(email, message) {
  // TODO: integrate with SendGrid, Nodemailer, etc.
  console.log(`[Email] to ${email}: ${message}`);
}

module.exports = { sendSMS, sendEmail };
