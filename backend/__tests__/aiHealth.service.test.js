// backend/__tests__/aiHealth.service.test.js
const {
  calculateHealthScore,
  calculateRiskScore,
  predictFutureRisk,
  generateRecommendations,
  generateFullIntelligenceReport,
} = require('../services/aiHealth.service');

describe('Advanced AI Health Intelligence Engine Tests', () => {
  test('Patient A - Excellent Adherence (Health Score >90, Risk LOW)', () => {
    const data = {
      medicines: [
        { name: 'Insulin', priority: 'CRITICAL', totalDoses: 20, takenDoses: 20, missedDoses: 0 },
        { name: 'BP Tablet', priority: 'HIGH', totalDoses: 20, takenDoses: 20, missedDoses: 0 },
      ],
      alerts: [],
      riskHistory: [{ riskLevel: 'LOW' }],
    };

    const res = generateFullIntelligenceReport(data);
    expect(res.healthScore).toBeGreaterThanOrEqual(90);
    expect(res.riskScore).toBeLessThanOrEqual(10);
    expect(res.futureRisk.next7Days).toBe('LOW');
    expect(res.recommendations).toContain('Excellent medication discipline. Continue current schedule.');
  });

  test('Patient B - Missed Medium Priority Medicines (Health Score 70-85, Risk MEDIUM)', () => {
    const data = {
      medicines: [
        { name: 'Insulin', priority: 'CRITICAL', totalDoses: 10, takenDoses: 10, missedDoses: 0 },
        { name: 'Multivitamin', priority: 'MEDIUM', totalDoses: 10, takenDoses: 6, missedDoses: 4 },
      ],
      alerts: [],
      riskHistory: [{ riskLevel: 'MEDIUM' }],
    };

    const res = generateFullIntelligenceReport(data);
    expect(res.healthScore).toBeGreaterThanOrEqual(70);
    expect(res.healthScore).toBeLessThanOrEqual(90);
    expect(res.futureRisk.next7Days).toBe('MEDIUM');
  });

  test('Patient C - Missed Critical Medicines & Emergency Alerts (Health Score <60, Risk HIGH)', () => {
    const data = {
      medicines: [
        { name: 'Insulin Injection', priority: 'CRITICAL', totalDoses: 10, takenDoses: 4, missedDoses: 6, doctorNote: 'Life critical' },
        { name: 'Statin', priority: 'HIGH', totalDoses: 10, takenDoses: 5, missedDoses: 5 },
      ],
      alerts: [
        { type: 'EMERGENCY', severity: 'CRITICAL', status: 'ACTIVE' },
      ],
      riskHistory: [{ riskLevel: 'HIGH' }],
    };

    const res = generateFullIntelligenceReport(data);
    expect(res.healthScore).toBeLessThan(60);
    expect(res.riskScore).toBeGreaterThanOrEqual(60);
    expect(res.futureRisk.next7Days).toBe('HIGH');
    expect(res.recommendations).toContain('Immediate consultation with your doctor is recommended due to missed critical medication.');
    expect(res.recommendations).toContain('Enable family notifications and increase monitoring frequency.');
  });
});
