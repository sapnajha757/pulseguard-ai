// services/alert.service.js
// Business logic for alert-related operations
const Alert = require('../models/Alert.model');
const notification = require('../utils/notification'); // placeholder utility

/** Create a generic alert */
async function createAlert(userId, data) {
  const alert = await Alert.create({ user: userId, ...data });
  // Future: send notifications based on alert.notifiedTo
  if (Array.isArray(alert.notifiedTo) && alert.notifiedTo.length) {
    alert.notifiedTo.forEach(contact => {
      if (contact.phone) notification.sendSMS(contact.phone, alert.message);
    });
  }
  return alert;
}

/** Return all alerts belonging to a user */
async function getUserAlerts(userId) {
  return Alert.find({ user: userId }).sort({ createdAt: -1 });
}

/** Resolve an active alert */
async function resolveAlert(alertId, userId) {
  const alert = await Alert.findOne({ _id: alertId, user: userId, status: 'ACTIVE' });
  if (!alert) return null;
  alert.status = 'RESOLVED';
  await alert.save();
  return alert;
}

/** Trigger emergency alert from risk engine */
async function triggerEmergencyAlert(userId, riskData) {
  const message = 'High medication risk detected. Immediate attention required.';
  const alertData = {
    type: 'EMERGENCY',
    severity: 'HIGH',
    message,
  };
  const alert = await createAlert(userId, alertData);

  try {
    const { createAuditLog } = require('./blockchain.service');
    const auditRes = await createAuditLog({
      userId,
      eventType: 'EMERGENCY_ALERT',
      alertType: 'SOS',
      timestamp: Date.now(),
    });
    alert.blockchainHash = auditRes.hash;
    alert.transactionHash = auditRes.transactionHash;
    alert.verifiedOnChain = new Date();
    await alert.save();
  } catch (err) {
    console.warn('⚠️ Blockchain logging failed for emergency alert:', err.message);
  }

  return alert;
}

module.exports = {
  createAlert,
  getUserAlerts,
  resolveAlert,
  triggerEmergencyAlert,
};
