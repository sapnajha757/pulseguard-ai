import React, { useState } from 'react';
import { useApi } from '../hooks/useApi';
import { aiService } from '../services';

export default function EmergencySystem({ userId }) {
  const [riskScore, setRiskScore] = useState(0);
  const { loading, error, execute: triggerAlert } = useApi(aiService.triggerEmergencyAlert);
  const [success, setSuccess] = useState(false);

  const handleSimulateRisk = async () => {
    // Generate a random risk score to simulate AI output
    const simulatedScore = Math.floor(Math.random() * 100);
    setRiskScore(simulatedScore);
    setSuccess(false);

    if (simulatedScore > 80) {
      try {
        await triggerAlert({
          userId: userId,
          riskScore: simulatedScore,
          message: `CRITICAL: AI detected extreme risk score of ${simulatedScore}. Immediate action required.`
        });
        setSuccess(true);
      } catch (err) {
        console.error('Failed to trigger emergency alert', err);
      }
    }
  };

  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 shadow-xl backdrop-blur-sm mt-6">
      <h3 className="text-xl font-bold text-red-500 mb-2 flex items-center gap-2">
        ⚠️ Emergency Alert System
      </h3>
      <p className="text-sm text-gray-300 mb-6">
        Simulate an AI risk assessment. If the risk score exceeds 80, the system will automatically 
        trigger an emergency alert to notify your assigned doctor and family members, and securely store the event.
      </p>

      <div className="flex items-center gap-6">
        <button
          onClick={handleSimulateRisk}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-red-600/30 transition-all disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Simulate Vitals Check'}
        </button>

        {riskScore > 0 && (
          <div className="flex flex-col">
            <span className="text-sm text-gray-400">Current AI Risk Score</span>
            <span className={`text-3xl font-black ${riskScore > 80 ? 'text-red-500' : 'text-green-500'}`}>
              {riskScore} / 100
            </span>
          </div>
        )}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-500 text-red-200 rounded text-sm">
          Error triggering alert: {error}
        </div>
      )}

      {success && riskScore > 80 && (
        <div className="mt-4 p-4 bg-red-600/20 border border-red-500 text-red-200 rounded-lg">
          <strong>🚨 EMERGENCY ALERT DEPLOYED!</strong>
          <ul className="mt-2 list-disc list-inside text-sm text-red-300 space-y-1">
            <li>Doctor notified immediately.</li>
            <li>Emergency family contacts notified.</li>
            <li>Critical event stored securely on backend.</li>
          </ul>
        </div>
      )}

      {riskScore > 0 && riskScore <= 80 && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-500/30 text-green-400 rounded text-sm">
          ✅ Risk is manageable. No emergency alert triggered.
        </div>
      )}
    </div>
  );
}
