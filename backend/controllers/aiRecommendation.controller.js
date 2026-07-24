// backend/controllers/aiRecommendation.controller.js
const asyncHandler = require('express-async-handler');
const Medicine = require('../models/Medicine.model');
const Risk = require('../models/Risk.model');
const Alert = require('../models/Alert.model');
const User = require('../models/User.model');
const { generateAIRecommendations } = require('../services/aiRecommendation.service');

/**
 * @desc   Get AI Health Recommendations for authenticated user or targeted patient
 * @route  GET /api/v1/recommendations
 * @access Private
 */
const getRecommendations = asyncHandler(async (req, res) => {
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
      medicalConditions: userProfile?.medicalConditions || [],
    },
  };

  const result = generateAIRecommendations(patientData);
  res.status(200).json({ success: true, data: result });
});

module.exports = { getRecommendations };
