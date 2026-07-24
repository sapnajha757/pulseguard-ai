// backend/services/adherence.service.js
const MedicationLog = require('../models/MedicationLog.model');
const Medicine = require('../models/Medicine.model');
const { generateFullIntelligenceReport } = require('./aiHealth.service');
const { createAuditLog } = require('./blockchain.service');
const alertService = require('./alert.service');

/**
 * Log a medication action and update AI, risk, and blockchain state.
 */
async function logMedicine(userId, { medicineId, status, notes = '', actualTime }) {
  const medicine = await Medicine.findOne({ _id: medicineId, user: userId });
  if (!medicine) {
    throw new Error('Medicine record not found or unauthorized');
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let log = await MedicationLog.findOne({
    user: userId,
    medicine: medicineId,
    date: today,
  });

  let previousStatus = null;
  if (log) {
    previousStatus = log.status;
    log.status = status;
    log.notes = notes;
    log.actualTime = actualTime || new Date();
    await log.save();
  } else {
    log = await MedicationLog.create({
      user: userId,
      medicine: medicineId,
      scheduledTime: medicine.reminderTime || '09:00',
      actualTime: actualTime || new Date(),
      status,
      date: today,
      notes,
    });
  }

  // Update dose counts on Medicine safely
  if (!previousStatus) {
    medicine.totalDoses = (medicine.totalDoses || 0) + 1;
    if (status === 'TAKEN' || status === 'DELAYED') {
      medicine.takenDoses = (medicine.takenDoses || 0) + 1;
    } else if (status === 'MISSED' || status === 'SKIPPED') {
      medicine.missedDoses = (medicine.missedDoses || 0) + 1;
    }
  } else if (previousStatus !== status) {
    // Deduct old status count
    if (previousStatus === 'TAKEN' || previousStatus === 'DELAYED') {
      medicine.takenDoses = Math.max(0, (medicine.takenDoses || 1) - 1);
    } else if (previousStatus === 'MISSED' || previousStatus === 'SKIPPED') {
      medicine.missedDoses = Math.max(0, (medicine.missedDoses || 1) - 1);
    }
    // Add new status count
    if (status === 'TAKEN' || status === 'DELAYED') {
      medicine.takenDoses = (medicine.takenDoses || 0) + 1;
    } else if (status === 'MISSED' || status === 'SKIPPED') {
      medicine.missedDoses = (medicine.missedDoses || 0) + 1;
    }
  }
  await medicine.save();

  // Blockchain audit proof for critical dose omissions or emergency states
  let blockchainAudit = null;
  if (status === 'MISSED' && medicine.priority === 'CRITICAL') {
    // Trigger Emergency Alert
    await alertService.triggerEmergencyAlert(userId, {
      message: `Critical medicine omitted: ${medicine.name}`,
    });

    // Write SHA-256 blockchain proof
    blockchainAudit = await createAuditLog({
      userId,
      eventType: 'MEDICINE_MISSED',
      riskLevel: 'HIGH',
      timestamp: Date.now(),
    });
  }

  // Re-calculate AI scores & intelligence
  const medicines = await Medicine.find({ user: userId });
  const aiReport = generateFullIntelligenceReport({ medicines });

  return {
    log,
    medicine,
    blockchainAudit,
    aiReport,
  };
}

/**
 * Calculate Daily Adherence summary for today
 */
async function calculateDailyAdherence(userId, date = new Date()) {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);

  const medicines = await Medicine.find({ user: userId });
  const logs = await MedicationLog.find({ user: userId, date: targetDate });

  let taken = 0;
  let missed = 0;
  let delayed = 0;
  let skipped = 0;

  logs.forEach(l => {
    if (l.status === 'TAKEN') taken++;
    else if (l.status === 'MISSED') missed++;
    else if (l.status === 'DELAYED') delayed++;
    else if (l.status === 'SKIPPED') skipped++;
  });

  const loggedMedicineIds = new Set(logs.map(l => l.medicine.toString()));
  const upcoming = medicines
    .filter(m => !loggedMedicineIds.has(m._id.toString()))
    .map(m => ({
      id: m._id,
      medicine: m.name,
      time: m.reminderTime || '09:00',
      priority: m.priority || 'MEDIUM',
    }));

  return {
    taken,
    missed,
    delayed,
    skipped,
    upcoming,
  };
}

/**
 * Calculate Weekly Adherence percentage
 */
async function calculateWeeklyAdherence(userId) {
  const startOfWeek = new Date();
  startOfWeek.setDate(startOfWeek.getDate() - 7);
  startOfWeek.setHours(0, 0, 0, 0);

  const logs = await MedicationLog.find({
    user: userId,
    date: { $gte: startOfWeek },
  });

  if (logs.length === 0) return 100;
  const takenCount = logs.filter(l => l.status === 'TAKEN' || l.status === 'DELAYED').length;
  return Math.round((takenCount / logs.length) * 100);
}

/**
 * Calculate Monthly Adherence percentage
 */
async function calculateMonthlyAdherence(userId) {
  const startOfMonth = new Date();
  startOfMonth.setDate(startOfMonth.getDate() - 30);
  startOfMonth.setHours(0, 0, 0, 0);

  const logs = await MedicationLog.find({
    user: userId,
    date: { $gte: startOfMonth },
  });

  if (logs.length === 0) return 100;
  const takenCount = logs.filter(l => l.status === 'TAKEN' || l.status === 'DELAYED').length;
  return Math.round((takenCount / logs.length) * 100);
}

/**
 * Get Medication Timeline History
 */
async function getMedicationTimeline(userId) {
  const logs = await MedicationLog.find({ user: userId })
    .populate('medicine', 'name priority')
    .sort({ date: -1 })
    .limit(30);

  return logs;
}

module.exports = {
  logMedicine,
  calculateDailyAdherence,
  calculateWeeklyAdherence,
  calculateMonthlyAdherence,
  getMedicationTimeline,
};
