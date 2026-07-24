// backend/__tests__/aiRecommendation.service.test.js
const { generateAIRecommendations } = require('../services/aiRecommendation.service');

describe('AI Health Recommendation Engine', () => {
  test('1. Healthy Patient Profile', () => {
    const data = {
      medicines: [
        { name: 'Vitamin D', priority: 'LOW', totalDoses: 10, takenDoses: 10, missedDoses: 0 },
        { name: 'BP Control', priority: 'HIGH', totalDoses: 20, takenDoses: 19, missedDoses: 1, doctorNote: 'Take with food' },
      ],
      alerts: [],
      riskHistory: [{ riskLevel: 'LOW' }],
      profile: { age: 32, medicalConditions: [] },
    };

    const res = generateAIRecommendations(data);
    expect(res.healthScore).toBeGreaterThanOrEqual(80);
    expect(res.riskScore).toBeLessThan(25);
    expect(res.complianceScore).toBeGreaterThanOrEqual(90);
    expect(res.recommendations).toContain('Excellent medication adherence. Continue current routine.');
  });

  test('2. Medium Risk Patient Profile', () => {
    const data = {
      medicines: [
        { name: 'Diabetes Med', priority: 'HIGH', totalDoses: 10, takenDoses: 7, missedDoses: 3, doctorNote: 'Must take before breakfast' },
        { name: 'Statin', priority: 'MEDIUM', totalDoses: 10, takenDoses: 8, missedDoses: 2 },
      ],
      alerts: [{ status: 'ACTIVE', type: 'HEALTH_RISK', severity: 'MEDIUM' }],
      riskHistory: [{ riskLevel: 'MEDIUM' }, { riskLevel: 'LOW' }],
      profile: { age: 58, medicalConditions: ['Type-2 Diabetes'] },
    };

    const res = generateAIRecommendations(data);
    expect(res.complianceScore).toBeLessThan(90);
    expect(res.recommendations).toContain('Patient risk has increased over the last assessments. Schedule follow-up within 48 hours.');
  });

  test('3. Critical Patient Profile (Missed > 5 Critical Doses & Emergency Alerts)', () => {
    const data = {
      medicines: [
        { name: 'Insulin Injection', priority: 'CRITICAL', totalDoses: 20, takenDoses: 13, missedDoses: 7, doctorNote: 'Life sustaining medication' },
        { name: 'Heart Pill', priority: 'HIGH', totalDoses: 10, takenDoses: 4, missedDoses: 6 },
      ],
      alerts: [
        { status: 'ACTIVE', type: 'EMERGENCY', severity: 'CRITICAL', message: 'Severe dose omission alert' },
      ],
      riskHistory: [{ riskLevel: 'HIGH' }, { riskLevel: 'MEDIUM' }],
      profile: { age: 72, medicalConditions: ['Hypertension', 'Cardiovascular Disease'] },
    };

    const res = generateAIRecommendations(data);
    expect(res.healthScore).toBeLessThan(50);
    expect(res.riskScore).toBeGreaterThanOrEqual(60);
    expect(res.recommendations).toContain('Patient has repeatedly missed a life-sustaining medicine. Immediate doctor consultation is recommended.');
    expect(res.recommendations).toContain('Emergency history detected. Increase monitoring frequency.');
  });
});
