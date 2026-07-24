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
};
