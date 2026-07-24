// backend/models/Risk.model.js

const mongoose = require('mongoose');

const riskSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    adherenceScore: {
      type: Number,
      min: 0,
      max: 100,
    },
    missedDoses: {
      type: Number,
      default: 0,
    },
    totalDoses: {
      type: Number,
      default: 0,
    },
    riskLevel: {
      type: String,
      enum: ['LOW', 'MEDIUM', 'HIGH'],
    },
    analysis: {
      type: String,
    },
    recommendations: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Risk', riskSchema);
