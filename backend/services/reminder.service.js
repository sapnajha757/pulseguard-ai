// backend/services/reminder.service.js
const cron = require('node-cron');
const Medicine = require('../models/Medicine.model');
const MedicationLog = require('../models/MedicationLog.model');
const { logMedicine } = require('./adherence.service');

// Priority grace windows in minutes
const GRACE_WINDOWS = {
  CRITICAL: 30,
  HIGH: 60,
  MEDIUM: 120,
  LOW: 240,
};

let cronTask = null;

/**
 * Initialize node-cron background task running every minute.
 */
function initReminderEngine() {
  if (cronTask) return;

  cronTask = cron.schedule('* * * * *', async () => {
    try {
      await processReminderEngine();
    } catch (err) {
      console.error('⚠️ Reminder engine cron error:', err.message);
    }
  });

  console.log('⏰ Smart Reminder Engine started (running every minute)');
}

/**
 * Main reminder & missed-dose evaluation function
 */
async function processReminderEngine() {
  const now = new Date();
  const currentHours = String(now.getHours()).padStart(2, '0');
  const currentMinutes = String(now.getMinutes()).padStart(2, '0');
  const currentTimeString = `${currentHours}:${currentMinutes}`;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 1. Scan medicines whose reminderTime matches current time
  const matchingMedicines = await Medicine.find({ reminderTime: currentTimeString, status: 'active' });
  for (const med of matchingMedicines) {
    const existing = await MedicationLog.findOne({ user: med.user, medicine: med._id, date: today });
    if (!existing) {
      console.log(`🔔 Reminder generated for user ${med.user}: Take ${med.name} (${med.priority})`);
    }
  }

  // 2. Scan active medicines for auto-marking MISSED after grace window
  const allActiveMedicines = await Medicine.find({ status: 'active' });
  for (const med of allActiveMedicines) {
    if (!med.reminderTime) continue;

    const [rHours, rMins] = med.reminderTime.split(':').map(Number);
    const scheduledDate = new Date(today);
    scheduledDate.setHours(rHours, rMins, 0, 0);

    const graceMinutes = GRACE_WINDOWS[med.priority] || 120;
    const expirationDate = new Date(scheduledDate.getTime() + graceMinutes * 60 * 1000);

    if (now > expirationDate) {
      const log = await MedicationLog.findOne({ user: med.user, medicine: med._id, date: today });
      if (!log) {
        console.warn(`🚨 Auto-marking MISSED for ${med.name} (${med.priority}) after ${graceMinutes} min window`);
        await logMedicine(med.user, {
          medicineId: med._id,
          status: 'MISSED',
          notes: `Auto-marked MISSED after ${graceMinutes} minute grace window`,
        });
      }
    }
  }
}

module.exports = {
  initReminderEngine,
  processReminderEngine,
  GRACE_WINDOWS,
};
