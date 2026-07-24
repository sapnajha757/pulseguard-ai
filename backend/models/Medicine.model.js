// models/Medicine.model.js
// Schema definition only — CRUD logic lives in
// controllers/medicine.controller.js and services/medicine.service.js.
const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Medicine name is required'],
      trim: true,
    },
    dosage: {
      amount: { type: Number, required: true },
      unit: { type: String, required: true }, // mg, ml, tablet, etc.
    },
    frequency: {
      timesPerDay: { type: Number, required: true },
      times: [{ type: String }], // e.g. ["08:00", "20:00"]
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
    },
    condition: {
      type: String,
      trim: true,
    },
    prescribedBy: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    sideEffects: [{ type: String, trim: true }],
    interactions: [{ type: String, trim: true }],
    isActive: {
      type: Boolean,
      default: true,
    },
    adherenceLog: [
      {
        scheduledAt: { type: Date },
        takenAt: { type: Date },
        status: {
          type: String,
          enum: ['taken', 'missed', 'skipped', 'pending'],
          default: 'pending',
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Medicine', medicineSchema);
