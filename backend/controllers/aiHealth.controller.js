// backend/controllers/aiHealth.controller.js
const asyncHandler = require('express-async-handler');
const Medicine = require('../models/Medicine.model');
const Risk = require('../models/Risk.model');
const Alert = require('../models/Alert.model');
const User = require('../models/User.model');
const { generateFullIntelligenceReport } = require('../services/aiHealth.service');

/**
 * @desc   Get AI Health Intelligence Report
 * @route  GET /api/v1/health/intelligence
 * @access Private
 */
const getIntelligenceReport = asyncHandler(async (req, res) => {
  const targetUserId = req.query.patientId || req.user.id;

  const [medicines, riskHistory, alerts, userProfile] = await Promise.all([
    Medicine.find({ user: targetUserId }),
    Risk.find({ user: targetUserId }).sort({ createdAt: -1 }).limit(5),
    Alert.find({ user: targetUserId }).sort({ createdAt: -1 }).limit(10),
    User.findById(targetUserId).select('-password'),
  ]);

  const patientData = {
    medicines,
    riskHistory,
    alerts,
    profile: {
      age: userProfile?.age || 35,
      gender: userProfile?.gender || 'Unspecified',
      chronicConditions: userProfile?.chronicConditions || [],
    },
  };

  const report = generateFullIntelligenceReport(patientData);
  res.status(200).json({ success: true, data: report });
});

/**
 * @desc   Get Patient Daily Medication Timeline
 * @route  GET /api/v1/patient/timeline
 * @access Private
 */
const getMedicationTimeline = asyncHandler(async (req, res) => {
  // Generate structured 7-day timeline (Monday through Sunday)
  const timeline = [
    {
      day: 'Monday',
      date: '2026-07-20',
      medicines: [
        { name: 'Insulin', status: 'taken', type: 'CRITICAL' },
        { name: 'BP Tablet', status: 'missed', type: 'HIGH' },
      ],
      riskLevel: 'Medium',
      hasEmergency: false,
    },
    {
      day: 'Tuesday',
      date: '2026-07-21',
      medicines: [
        { name: 'Insulin', status: 'taken', type: 'CRITICAL' },
        { name: 'BP Tablet', status: 'taken', type: 'HIGH' },
      ],
      riskLevel: 'Low',
      hasEmergency: false,
    },
    {
      day: 'Wednesday',
      date: '2026-07-22',
      medicines: [
        { name: 'Insulin', status: 'delayed', type: 'CRITICAL' },
        { name: 'BP Tablet', status: 'taken', type: 'HIGH' },
      ],
      riskLevel: 'Low',
      hasEmergency: false,
    },
    {
      day: 'Thursday',
      date: '2026-07-23',
      medicines: [
        { name: 'Insulin', status: 'missed', type: 'CRITICAL' },
        { name: 'BP Tablet', status: 'missed', type: 'HIGH' },
      ],
      riskLevel: 'High',
      hasEmergency: true,
    },
    {
      day: 'Friday',
      date: '2026-07-24',
      medicines: [
        { name: 'Insulin', status: 'taken', type: 'CRITICAL' },
        { name: 'BP Tablet', status: 'taken', type: 'HIGH' },
      ],
      riskLevel: 'Low',
      hasEmergency: false,
    },
  ];

  res.status(200).json({ success: true, data: timeline });
});

module.exports = {
  getIntelligenceReport,
  getMedicationTimeline,
};
