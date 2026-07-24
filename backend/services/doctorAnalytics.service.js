// backend/services/doctorAnalytics.service.js
const User = require('../models/User.model');
const Medicine = require('../models/Medicine.model');
const Alert = require('../models/Alert.model');
const Risk = require('../models/Risk.model');

// Helper to generate deterministic mock patient records for testing/leaderboards
function generateMockPatients(count = 100) {
  const conditions = ['Hypertension', 'Diabetes', 'Asthma', 'COPD', 'Heart Disease', 'Arthritis', 'Chronic Renal Failure'];
  const firstNames = ['Amit', 'Aanya', 'Rahul', 'Priya', 'Vikram', 'Neha', 'Sanjay', 'Aditi', 'Rajesh', 'Kiran'];
  const lastNames = ['Sharma', 'Nair', 'Joshi', 'Patel', 'Kumar', 'Mehta', 'Gupta', 'Sen', 'Rao', 'Singh'];

  const patients = [];
  for (let i = 1; i <= count; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[i % lastNames.length];
    const name = `${fn} ${ln} ${i}`;
    const age = 30 + (i % 55);
    const cond = conditions[i % conditions.length];
    
    // Determine adherence & risk score based on index to create diverse profiles
    let complianceScore = 50 + (i % 51); // 50 to 100
    if (i % 10 === 0) complianceScore = 30 + (i % 20); // very poor adherence

    const riskScore = 100 - complianceScore;
    let riskLevel = 'LOW';
    if (riskScore >= 60) riskLevel = 'HIGH';
    else if (riskScore >= 30) riskLevel = 'MEDIUM';

    patients.push({
      _id: `mock_patient_${i}`,
      name,
      email: `patient${i}@pulseguard.ai`,
      role: 'user',
      age,
      medicalConditions: [cond],
      complianceScore,
      riskScore,
      riskLevel,
      status: riskLevel === 'HIGH' ? 'Critical' : 'Stable',
      lastVisit: '2026-07-20',
    });
  }
  return patients;
}

const mockPatientsList = generateMockPatients(100);

async function getDashboardOverview() {
  const highRisk = mockPatientsList.filter(p => p.riskLevel === 'HIGH').length;
  const mediumRisk = mockPatientsList.filter(p => p.riskLevel === 'MEDIUM').length;
  const lowRisk = mockPatientsList.filter(p => p.riskLevel === 'LOW').length;

  // Average adherence
  const totalAdherence = mockPatientsList.reduce((sum, p) => sum + p.complianceScore, 0);
  const averageAdherence = Math.round(totalAdherence / mockPatientsList.length);

  return {
    totalPatients: mockPatientsList.length,
    highRiskPatients: highRisk,
    mediumRiskPatients: mediumRisk,
    lowRiskPatients: lowRisk,
    emergencyAlertsToday: mockPatientsList.filter(p => p.riskLevel === 'HIGH').length % 5,
    averageAdherence,
    blockchainVerifiedEvents: mockPatientsList.length * 3 + 12,
  };
}

async function getHighRiskPatients() {
  return mockPatientsList
    .filter(p => p.riskLevel === 'HIGH')
    .sort((a, b) => b.riskScore - a.riskScore);
}

async function getPatientDetailsAnalytics(patientId) {
  // Try to find in mock dataset
  const patient = mockPatientsList.find(p => p._id === patientId) || mockPatientsList[0];

  const topMissed = [
    { name: 'Insulin', missedCount: 12 },
    { name: 'BP Tablet', missedCount: 7 },
  ];

  const highestRiskFactors = [
    'Critical medicine non-compliance',
    'Low average adherence score',
  ];

  const followUpSuggestions = [
    'Immediate appointment required',
    'Increase reminder frequency in application settings',
  ];

  return {
    patient,
    healthScore: patient.complianceScore,
    riskScore: patient.riskScore,
    weightedAdherence: patient.complianceScore,
    criticalMedicineCompliance: patient.complianceScore > 80 ? 95 : 60,
    futureRisk: {
      next7Days: patient.riskLevel,
      next30Days: patient.riskLevel === 'HIGH' ? 'HIGH' : 'MEDIUM',
    },
    topMissed,
    highestRiskFactors,
    followUpSuggestions,
    recentAlerts: [
      { type: 'EMERGENCY', severity: 'HIGH', message: 'Dose missed threshold exceeded' },
    ],
    doctorNotes: 'Keep monitoring regular checkins.',
    blockchainVerification: {
      verified: true,
      lastTxHash: '0x328cfd821adbc9b9809aaef23a8bc8b28cf9cdae',
    },
  };
}

module.exports = {
  getDashboardOverview,
  getHighRiskPatients,
  getPatientDetailsAnalytics,
  generateMockPatients,
  mockPatientsList,
};
