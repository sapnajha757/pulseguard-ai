const Alert = require('../models/Alert.model');
const User = require('../models/User.model');

// Mock notification services
const notifyDoctor = (patient, alert, score) => {
  console.log(`[EMERGENCY ALERT] Notifying Doctor for Patient ${patient.name} (Risk Score: ${score})`);
};

const notifyFamily = (patient, alert, score) => {
  if (patient.emergencyContacts && patient.emergencyContacts.length > 0) {
    patient.emergencyContacts.forEach(contact => {
      console.log(`[EMERGENCY ALERT] Notifying Family (${contact.name} - ${contact.relation}) for Patient ${patient.name} (Risk Score: ${score})`);
    });
  } else {
    console.log(`[EMERGENCY ALERT] No family contacts found for Patient ${patient.name}`);
  }
};

const create = async (userId, data) => {
  const { type, message, riskScore, relatedMedicine } = data;
  
  // Create the alert document
  const alert = new Alert({
    user: userId,
    type: type || 'risk_threshold',
    severity: riskScore > 80 ? 'critical' : 'warning',
    message: message || `High risk detected. Score: ${riskScore}`,
    relatedMedicine: relatedMedicine || null,
    status: 'open',
  });

  await alert.save();

  // Condition: If AI Risk Score > 80
  if (riskScore > 80) {
    // We need user details to get emergency contacts
    const user = await User.findById(userId);
    if (user) {
      notifyDoctor(user, alert, riskScore);
      notifyFamily(user, alert, riskScore);
      
      // We could also update the alert with recipients who were notified
      alert.recipients = user.emergencyContacts?.map(contact => ({
        name: contact.name,
        contact: contact.phone || contact.email,
        channel: 'sms',
        deliveryStatus: 'sent'
      })) || [];
      await alert.save();
    }
  }

  return alert;
};

const findAllForUser = async (userId, query) => {
  return await Alert.find({ user: userId }).sort({ createdAt: -1 });
};

module.exports = {
  create,
  findAllForUser
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
  return createAlert(userId, alertData);
}

module.exports = {
  createAlert,
  getUserAlerts,
  resolveAlert,
  triggerEmergencyAlert,
};
