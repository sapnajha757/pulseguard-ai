// backend/services/risk.service.js

const Medicine = require('../models/Medicine.model');
const MedicationLog = require('../models/MedicationLog.model');
const Risk = require('../models/Risk.model');
const { createAuditLog } = require('./blockchain.service');
const { triggerEmergencyAlert } = require('./alert.service');

/**
 * Simple rule‑based AI recommendation generator.
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
  const medicines = await Medicine.find({ user: userId });

  let totalDoses = 0;
  let takenDoses = 0;
  let missedDoses = 0;

  for (const med of medicines) {
    const tot = med.totalDoses || (med.takenDoses || 0) + (med.missedDoses || 0);
    totalDoses += tot;
    takenDoses += med.takenDoses || 0;
    missedDoses += med.missedDoses || 0;
  }

  const adherenceScore = totalDoses > 0 ? Math.round((takenDoses / totalDoses) * 100) : 100;

  let riskLevel = 'LOW';
  if (adherenceScore < 50 || missedDoses > 3) riskLevel = 'HIGH';
  else if (adherenceScore < 80 || missedDoses > 0) riskLevel = 'MEDIUM';

  if (riskLevel === 'HIGH') {
    await triggerEmergencyAlert(userId, { riskLevel, adherenceScore });
  }

  const analysis = `Medication adherence is ${adherenceScore}%. Total missed doses: ${missedDoses}.`;
  const recommendations = generateAIRecommendation(riskLevel);

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
 * Predict risk endpoint handler matching controller call riskService.predict(userId, body)
 */
async function predict(userId, data = {}) {
  return await calculateRisk(userId);
}

/**
 * Find risk history for user matching riskService.findHistoryForUser(userId, query)
 */
async function findHistoryForUser(userId, query = {}) {
  const limit = Number(query.limit) || 20;
  return await Risk.find({ user: userId }).sort({ createdAt: -1 }).limit(limit);
}

/**
 * Retrieve the latest risk assessment for a user.
 */
async function getLatestRisk(userId) {
  return await Risk.findOne({ user: userId }).sort({ createdAt: -1 });
}

module.exports = {
  calculateRisk,
  predict,
  findHistoryForUser,
  getLatestRisk,
};

