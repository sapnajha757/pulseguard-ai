// backend/models/Alert.model.js
const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: {
    type: String,
    enum: ['MEDICATION', 'HEALTH_RISK', 'EMERGENCY'],
    required: true,
  },
  severity: {
    type: String,
    enum: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'],
    required: true,
  },
  message: { type: String, required: true },
  status: {
    type: String,
    enum: ['ACTIVE', 'RESOLVED'],
    default: 'ACTIVE',
  },
  notifiedTo: [
    {
      name: { type: String },
      phone: { type: String },
      relation: { type: String },
    },
  ],
  blockchainHash: { type: String },
  transactionHash: { type: String },
  verifiedOnChain: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model('Alert', alertSchema);
