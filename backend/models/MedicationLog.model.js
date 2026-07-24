// backend/models/MedicationLog.model.js
const mongoose = require('mongoose');

const medicationLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
      required: true,
    },
    scheduledTime: {
      type: String,
      required: true,
    },
    actualTime: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['TAKEN', 'MISSED', 'DELAYED', 'SKIPPED'],
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: () => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
      },
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('MedicationLog', medicationLogSchema);
