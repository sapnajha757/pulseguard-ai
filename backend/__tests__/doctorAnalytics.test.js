// backend/__tests__/doctorAnalytics.test.js
const {
  getDashboardOverview,
  getHighRiskPatients,
  getPatientDetailsAnalytics,
  generateMockPatients,
} = require('../services/doctorAnalytics.service');

describe('Doctor Analytics Platform Engine Tests', () => {
  test('Should generate exactly 100 mock patient records', () => {
    const patients = generateMockPatients(100);
    expect(patients.length).toBe(100);
  });

  test('Should calculate correct aggregates in dashboard overview', async () => {
    const data = await getDashboardOverview();
    expect(data.totalPatients).toBe(100);
    expect(data.highRiskPatients).toBeGreaterThan(0);
    expect(data.mediumRiskPatients).toBeGreaterThan(0);
    expect(data.blockchainVerifiedEvents).toBeGreaterThan(100);
  });

  test('Should return only HIGH risk patients sorted in descending order', async () => {
    const patients = await getHighRiskPatients();
    expect(patients.every(p => p.riskLevel === 'HIGH')).toBe(true);

    for (let i = 0; i < patients.length - 1; i++) {
      expect(patients[i].riskScore).toBeGreaterThanOrEqual(patients[i + 1].riskScore);
    }
  });

  test('Should retrieve specific patient detailed analytics structures', async () => {
    const details = await getPatientDetailsAnalytics('mock_patient_1');
    expect(details.healthScore).toBeDefined();
    expect(details.riskScore).toBeDefined();
    expect(details.blockchainVerification.verified).toBe(true);
    expect(details.topMissed.length).toBeGreaterThan(0);
  });
});
