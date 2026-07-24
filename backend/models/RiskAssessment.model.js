// models/RiskAssessment.model.js
// Schema definition only — prediction logic lives in
// services/risk.service.js.
const mongoose = require('mongoose');

const riskAssessmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    inputFactors: {
      vitals: {
        heartRate: Number,
        bloodPressure: {
          systolic: Number,
          diastolic: Number,
        },
        oxygenSaturation: Number,
        temperature: Number,
        glucoseLevel: Number,
      },
      medicines: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Medicine',
        },
      ],
      adherenceScore: Number,
      symptoms: [{ type: String, trim: true }],
      age: Number,
      preExistingConditions: [{ type: String, trim: true }],
    },
    riskScore: {
      type: Number, // 0-100
    },
    riskLevel: {
      type: String,
      enum: ['low', 'moderate', 'high', 'critical'],
    },
    modelVersion: {
      type: String,
    },
    recommendations: [{ type: String, trim: true }],
    triggeredAlert: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Alert',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('RiskAssessment', riskAssessmentSchema);
