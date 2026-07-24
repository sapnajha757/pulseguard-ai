// backend/__tests__/adherence.service.test.js
const { logMedicine, calculateDailyAdherence } = require('../services/adherence.service');
const Medicine = require('../models/Medicine.model');
const MedicationLog = require('../models/MedicationLog.model');
const mongoose = require('mongoose');

// Mock dependencies to run tests in isolation
jest.mock('../models/Medicine.model');
jest.mock('../models/MedicationLog.model');
jest.mock('../services/alert.service', () => ({
  triggerEmergencyAlert: jest.fn().mockResolvedValue({ _id: 'alert123' }),
}));
jest.mock('../services/blockchain.service', () => ({
  createAuditLog: jest.fn().mockResolvedValue({ hash: '0x123', transactionHash: '0x456' }),
}));

describe('Adherence & Smart Reminder System Tests', () => {
  const mockUserId = new mongoose.Types.ObjectId().toString();
  const mockMedId = new mongoose.Types.ObjectId().toString();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. Patient takes medicine on time (TAKEN)', async () => {
    const mockMed = {
      _id: mockMedId,
      user: mockUserId,
      name: 'Insulin',
      priority: 'CRITICAL',
      reminderTime: '09:00',
      takenDoses: 0,
      missedDoses: 0,
      totalDoses: 0,
      save: jest.fn().mockResolvedValue(true),
    };

    Medicine.findOne.mockResolvedValue(mockMed);
    MedicationLog.findOne.mockResolvedValue(null);
    MedicationLog.create.mockResolvedValue({ status: 'TAKEN' });
    Medicine.find.mockResolvedValue([mockMed]);

    const res = await logMedicine(mockUserId, { medicineId: mockMedId, status: 'TAKEN' });
    expect(mockMed.takenDoses).toBe(1);
    expect(res.log.status).toBe('TAKEN');
  });

  test('2. Patient delays medicine (DELAYED)', async () => {
    const mockMed = {
      _id: mockMedId,
      user: mockUserId,
      name: 'BP Pill',
      priority: 'HIGH',
      reminderTime: '10:00',
      takenDoses: 5,
      missedDoses: 0,
      totalDoses: 5,
      save: jest.fn().mockResolvedValue(true),
    };

    Medicine.findOne.mockResolvedValue(mockMed);
    MedicationLog.findOne.mockResolvedValue(null);
    MedicationLog.create.mockResolvedValue({ status: 'DELAYED' });
    Medicine.find.mockResolvedValue([mockMed]);

    const res = await logMedicine(mockUserId, { medicineId: mockMedId, status: 'DELAYED' });
    expect(mockMed.takenDoses).toBe(6);
    expect(res.log.status).toBe('DELAYED');
  });

  test('3. Patient misses critical medicine (MISSED -> triggers emergency & blockchain)', async () => {
    const mockMed = {
      _id: mockMedId,
      user: mockUserId,
      name: 'Heart Pill',
      priority: 'CRITICAL',
      reminderTime: '08:00',
      takenDoses: 2,
      missedDoses: 0,
      totalDoses: 2,
      save: jest.fn().mockResolvedValue(true),
    };

    Medicine.findOne.mockResolvedValue(mockMed);
    MedicationLog.findOne.mockResolvedValue(null);
    MedicationLog.create.mockResolvedValue({ status: 'MISSED' });
    Medicine.find.mockResolvedValue([mockMed]);

    const res = await logMedicine(mockUserId, { medicineId: mockMedId, status: 'MISSED' });
    expect(mockMed.missedDoses).toBe(1);
    expect(res.blockchainAudit).not.toBeNull();
    expect(res.blockchainAudit.hash).toBe('0x123');
  });

  test('4. Patient skips medicine (SKIPPED)', async () => {
    const mockMed = {
      _id: mockMedId,
      user: mockUserId,
      name: 'Vitamin C',
      priority: 'LOW',
      reminderTime: '14:00',
      takenDoses: 1,
      missedDoses: 0,
      totalDoses: 1,
      save: jest.fn().mockResolvedValue(true),
    };

    Medicine.findOne.mockResolvedValue(mockMed);
    MedicationLog.findOne.mockResolvedValue(null);
    MedicationLog.create.mockResolvedValue({ status: 'SKIPPED' });
    Medicine.find.mockResolvedValue([mockMed]);

    const res = await logMedicine(mockUserId, { medicineId: mockMedId, status: 'SKIPPED' });
    expect(mockMed.missedDoses).toBe(1);
    expect(res.log.status).toBe('SKIPPED');
  });
});
