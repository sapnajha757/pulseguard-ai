// backend/services/risk.service.js

const Medicine = require('../models/Medicine.model');
const Risk = require('../models/Risk.model');

/**
 * Simple rule‑based AI recommendation generator.
 * Future implementation can call OpenAI / custom ML models.
 */
function generateAIRecommendation(riskLevel) {
  const map = {
    LOW: [
      'Continue current medication routine',
      'Maintain regular health tracking',
    ],
    MEDIUM: [
      'Set medicine reminders',
      'Consult doctor if symptoms increase',
    ],
    HIGH: [
      'Immediate medical consultation recommended',
      'Enable emergency alerts',
    ],
  };
  return map[riskLevel] || [];
}

/**
 * Calculate medication adherence risk for a user.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Object>} Risk document saved in DB.
 */
async function calculateRisk(userId) {
  // Fetch all medicines belonging to the user
  const medicines = await Medicine.find({ user: userId });

  // Placeholder logic – real adherence data would be stored elsewhere.
  const totalDoses = medicines.length * 30; // assume 30 doses per medicine per month
  const missedDoses = 0; // currently no adherence logs, set to 0
  const adherenceScore = totalDoses ? Math.round(((totalDoses - missedDoses) / totalDoses) * 100) : 0;

  // Determine risk level based on adherence percentage
  let riskLevel = 'LOW';
  if (adherenceScore < 50) riskLevel = 'HIGH';
  else if (adherenceScore < 80) riskLevel = 'MEDIUM';
  // Trigger emergency alert when risk is HIGH
  if (riskLevel === 'HIGH') {
    await triggerEmergencyAlert(userId, { riskLevel, adherenceScore });
  }

  const analysis = `Medication adherence is ${adherenceScore}%.`;
  const recommendations = generateAIRecommendation(riskLevel);

  // Save a new risk report (each call creates a fresh document)
  const riskReport = await Risk.create({
    user: userId,
    adherenceScore,
    missedDoses,
    totalDoses,
    riskLevel,
    analysis,
    recommendations,
  });

  return riskReport;
}

/**
 * Retrieve the latest risk assessment for a user.
 * @param {string} userId - Authenticated user ID.
 * @returns {Promise<Object|null>} Latest risk document or null.
 */
async function getLatestRisk(userId) {
  return await Risk.findOne({ user: userId }).sort({ createdAt: -1 });
}

module.exports = {
  calculateRisk,
  getLatestRisk,
};
