// models/Alert.model.js
// Schema definition only — dispatch logic lives in
// services/alert.service.js.
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    type: {
      type: String,
      enum: ['medicine_missed', 'risk_threshold', 'manual', 'vital_abnormal'],
      required: true,
    },
    severity: {
      type: String,
      enum: ['info', 'warning', 'critical'],
      default: 'warning',
    },
    message: {
      type: String,
      required: true,
    },
    relatedRiskAssessment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'RiskAssessment',
    },
    relatedMedicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Medicine',
    },
    channels: [
      {
        type: String,
        enum: ['sms', 'email', 'push', 'call'],
      },
    ],
    recipients: [
      {
        name: String,
        contact: String,
        channel: { type: String, enum: ['sms', 'email', 'push', 'call'] },
        deliveryStatus: {
          type: String,
          enum: ['pending', 'sent', 'failed', 'delivered'],
          default: 'pending',
        },
      },
    ],
    status: {
      type: String,
      enum: ['open', 'acknowledged', 'resolved'],
      default: 'open',
    },
    acknowledgedAt: {
      type: Date,
    },
    resolvedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Alert', alertSchema);
