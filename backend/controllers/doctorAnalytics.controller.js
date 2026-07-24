// backend/controllers/doctorAnalytics.controller.js
const asyncHandler = require('express-async-handler');
const doctorAnalyticsService = require('../services/doctorAnalytics.service');

/**
 * @desc   Get Doctor Dashboard aggregates
 * @route  GET /api/v1/doctor/dashboard
 * @access Private (Doctor only)
 */
const getDashboardOverview = asyncHandler(async (req, res) => {
  const data = await doctorAnalyticsService.getDashboardOverview();
  res.status(200).json({ success: true, data });
});

/**
 * @desc   Get HIGH risk patients sorted by risk score
 * @route  GET /api/v1/doctor/high-risk
 * @access Private (Doctor only)
 */
const getHighRiskPatients = asyncHandler(async (req, res) => {
  const data = await doctorAnalyticsService.getHighRiskPatients();
  res.status(200).json({ success: true, data });
});

/**
 * @desc   Get patient detailed analytics
 * @route  GET /api/v1/doctor/patient/:id/analytics
 * @access Private (Doctor only)
 */
const getPatientAnalytics = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await doctorAnalyticsService.getPatientDetailsAnalytics(id);
  res.status(200).json({ success: true, data });
});

/**
 * @desc   Export patient analytics report in PDF/text data format
 * @route  GET /api/v1/doctor/patient/:id/pdf
 * @access Private (Doctor only)
 */
const exportPatientPDFReport = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const data = await doctorAnalyticsService.getPatientDetailsAnalytics(id);

  // Generate standard clinical report metadata structure for generating client/server PDFs
  const reportData = {
    hospitalLogo: '🏥 PulseGuard Healthcare Network',
    patientDetails: {
      name: data.patient.name,
      age: data.patient.age,
      medicalConditions: data.patient.medicalConditions,
    },
    healthScore: data.healthScore,
    riskScore: data.riskScore,
    medicineAdherence: `${data.weightedAdherence}%`,
    recommendations: data.followUpSuggestions,
    emergencyHistory: data.recentAlerts.map(a => a.message),
    blockchainVerification: data.blockchainVerification.lastTxHash,
    doctorSignatureArea: 'Dr. Aanya Sharma, MD (Clinical Cardiology)\nPulseGuard AI Network Clinic',
  };

  res.status(200).json({ success: true, data: reportData });
});

module.exports = {
  getDashboardOverview,
  getHighRiskPatients,
  getPatientAnalytics,
  exportPatientPDFReport,
};
