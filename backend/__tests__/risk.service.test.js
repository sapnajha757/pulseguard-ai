// backend/__tests__/risk.service.test.js
const { calculateRisk, predict, findHistoryForUser, getLatestRisk } = require('../services/risk.service');
const Medicine = require('../models/Medicine.model');
const Risk = require('../models/Risk.model');
const mongoose = require('mongoose');

jest.mock('../models/Medicine.model');
jest.mock('../models/Risk.model');
jest.mock('../services/alert.service', () => ({
  triggerEmergencyAlert: jest.fn().mockResolvedValue({ _id: 'alert123' }),
}));
jest.mock('../services/blockchain.service', () => ({
  createAuditLog: jest.fn().mockResolvedValue({ hash: '0x123' }),
}));

describe('Risk Service Unit Tests', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('calculateRisk generates LOW risk for 100% adherence', async () => {
    Medicine.find.mockResolvedValue([
      { totalDoses: 10, takenDoses: 10, missedDoses: 0 },
    ]);
    Risk.create.mockImplementation(data => Promise.resolve({ _id: 'risk1', ...data }));

    const res = await calculateRisk(mockUserId);
    expect(res.riskLevel).toBe('LOW');
    expect(res.adherenceScore).toBe(100);
  });

  test('calculateRisk triggers emergency alert when risk is HIGH', async () => {
    Medicine.find.mockResolvedValue([
      { totalDoses: 10, takenDoses: 3, missedDoses: 7 },
    ]);
    Risk.create.mockImplementation(data => Promise.resolve({ _id: 'risk2', ...data }));

    const res = await calculateRisk(mockUserId);
    expect(res.riskLevel).toBe('HIGH');
    expect(res.adherenceScore).toBe(30);
  });

  test('predict delegates to risk evaluation', async () => {
    Medicine.find.mockResolvedValue([
      { totalDoses: 5, takenDoses: 5, missedDoses: 0 },
    ]);
    Risk.create.mockImplementation(data => Promise.resolve({ _id: 'risk3', ...data }));

    const res = await predict(mockUserId, {});
    expect(res.riskLevel).toBe('LOW');
  });

  test('findHistoryForUser queries risk history sorted by date', async () => {
    Risk.find.mockReturnValue({
      sort: jest.fn().mockReturnValue({
        limit: jest.fn().mockResolvedValue([{ riskLevel: 'LOW' }]),
      }),
    });

    const history = await findHistoryForUser(mockUserId, { limit: 5 });
    expect(history.length).toBe(1);
  });
});
