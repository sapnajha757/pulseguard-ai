// backend/services/aiRecommendation.service.js

/**
 * Priority weight mapping
 */
const PRIORITY_WEIGHTS = {
  CRITICAL: 5,
  HIGH: 4,
  MEDIUM: 2,
  LOW: 1,
};

/**
 * Calculates priority-weighted compliance score (0-100)
 */
function calculateComplianceScore(medicines = []) {
  if (!medicines || medicines.length === 0) return 100;

  let totalWeightedDoses = 0;
  let totalWeightedTaken = 0;

  for (const med of medicines) {
    const weight = PRIORITY_WEIGHTS[med.priority] || 2;
    const total = med.totalDoses || (med.takenDoses || 0) + (med.missedDoses || 0);
    const taken = med.takenDoses || 0;

    if (total > 0) {
      totalWeightedDoses += total * weight;
      totalWeightedTaken += taken * weight;
    }
  }

  if (totalWeightedDoses === 0) return 100;
  const score = Math.round((totalWeightedTaken / totalWeightedDoses) * 100);
  return Math.max(0, Math.min(100, score));
}

/**
 * Calculates overall risk score (0-100)
 */
function calculateRiskScore(data) {
  const { medicines = [], alerts = [], riskHistory = [] } = data;
  let riskPoints = 0;

  // 1. Check missed doses & priority
  let missedCriticalCount = 0;
  for (const med of medicines) {
    const missed = med.missedDoses || 0;
    if (med.priority === 'CRITICAL') {
      missedCriticalCount += missed;
      riskPoints += missed * 12;
    } else if (med.priority === 'HIGH') {
      riskPoints += missed * 8;
    } else if (med.priority === 'MEDIUM') {
      riskPoints += missed * 4;
    } else {
      riskPoints += missed * 2;
    }
  }

  // 2. Alert history penalty
  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const emergencyAlerts = alerts.filter(a => a.type === 'EMERGENCY');
  riskPoints += activeAlerts.length * 15;
  riskPoints += emergencyAlerts.length * 20;

  // 3. Risk history trajectory penalty
  if (riskHistory.length >= 2) {
    const latest = riskHistory[0];
    const previous = riskHistory[1];
    const levelScore = { LOW: 10, MEDIUM: 40, HIGH: 80 };
    const latestScore = levelScore[latest.riskLevel] || 20;
    const previousScore = levelScore[previous.riskLevel] || 20;

    if (latestScore > previousScore) {
      riskPoints += 15; // Penalty for increasing risk trajectory
    }
  } else if (riskHistory.length === 1) {
    const levelScore = { LOW: 0, MEDIUM: 25, HIGH: 60 };
    riskPoints += levelScore[riskHistory[0].riskLevel] || 0;
  }

  return Math.max(0, Math.min(100, Math.round(riskPoints)));
}

/**
 * Calculates overall Health Score (0-100)
 */
function calculateHealthScore(complianceScore, riskScore, profile = {}) {
  const { age = 30, medicalConditions = [] } = profile;

  // Base score computed from compliance and risk inverse
  let score = complianceScore * 0.5 + (100 - riskScore) * 0.4;

  // Age & condition factors (max 10% weight)
  let conditionFactor = 10;
  if (medicalConditions.length > 2) {
    conditionFactor -= 4;
  } else if (medicalConditions.length > 0) {
    conditionFactor -= 2;
  }

  if (age > 70) {
    conditionFactor -= 3;
  } else if (age > 50) {
    conditionFactor -= 1;
  }

  score += Math.max(0, conditionFactor);
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * Modular Rule Engine to evaluate patient health insights
 */
function evaluateRules(data, complianceScore, riskScore) {
  const { medicines = [], alerts = [], riskHistory = [], profile = {} } = data;
  const recommendations = [];

  // Check 1: Critical medicine missed > 5
  let criticalMissedTotal = 0;
  for (const med of medicines) {
    if (med.priority === 'CRITICAL') {
      criticalMissedTotal += med.missedDoses || 0;
    }
  }

  if (criticalMissedTotal > 5) {
    recommendations.push('Patient has repeatedly missed a life-sustaining medicine. Immediate doctor consultation is recommended.');
  } else if (criticalMissedTotal > 0) {
    recommendations.push(`Patient has missed ${criticalMissedTotal} critical medication dose(s). Close supervision required.`);
  }

  // Check 2: High weighted adherence > 90
  if (complianceScore >= 90) {
    recommendations.push('Excellent medication adherence. Continue current routine.');
  } else if (complianceScore < 70) {
    recommendations.push('Medication compliance is low. Consider setting daily automated alarm reminders.');
  }

  // Check 3: Risk trend increasing
  if (riskHistory.length >= 2) {
    const levelMap = { LOW: 1, MEDIUM: 2, HIGH: 3 };
    const currentLevel = levelMap[riskHistory[0].riskLevel] || 1;
    const pastLevel = levelMap[riskHistory[1].riskLevel] || 1;
    if (currentLevel > pastLevel) {
      recommendations.push('Patient risk has increased over the last assessments. Schedule follow-up within 48 hours.');
    }
  }

  // Check 4: Emergency alerts generated recently
  const recentEmergencies = alerts.filter(a => a.type === 'EMERGENCY' || a.severity === 'HIGH' || a.severity === 'CRITICAL');
  if (recentEmergencies.length > 0) {
    recommendations.push('Emergency history detected. Increase monitoring frequency.');
  }

  // Check 5: Doctor Notes check
  medicines.forEach(med => {
    if (med.doctorNote && med.missedDoses > 0) {
      recommendations.push(`Note for ${med.name}: "${med.doctorNote}". Please ensure doses are taken as directed.`);
    }
  });

  // Default fallback if list empty
  if (recommendations.length === 0) {
    recommendations.push('Maintain regular medication routines and consult your doctor for periodic health checkups.');
  }

  return recommendations;
}

/**
 * Generate human-readable summary
 */
function generateSummary(healthScore, riskScore, complianceScore, recommendations) {
  if (healthScore >= 80 && riskScore < 25) {
    return 'Patient is in good health with high adherence and low risk factors.';
  }
  if (riskScore >= 60 || healthScore < 50) {
    return 'Patient requires immediate clinical attention due to high risk indicators or low compliance.';
  }
  if (complianceScore < 85) {
    return 'Patient is stable but requires better adherence to critical medicines.';
  }
  return 'Patient condition is stable with moderate monitoring recommended.';
}

/**
 * Main entry point: Aggregates patient data and produces AI recommendation payload.
 */
function generateAIRecommendations(patientData = {}) {
  const { medicines = [], alerts = [], riskHistory = [], profile = {} } = patientData;

  const complianceScore = calculateComplianceScore(medicines);
  const riskScore = calculateRiskScore({ medicines, alerts, riskHistory });
  const healthScore = calculateHealthScore(complianceScore, riskScore, profile);
  const recommendations = evaluateRules({ medicines, alerts, riskHistory, profile }, complianceScore, riskScore);
  const summary = generateSummary(healthScore, riskScore, complianceScore, recommendations);

  return {
    healthScore,
    riskScore,
    complianceScore,
    recommendations,
    summary,
  };
}

module.exports = {
  generateAIRecommendations,
  calculateComplianceScore,
  calculateRiskScore,
  calculateHealthScore,
  evaluateRules,
};
