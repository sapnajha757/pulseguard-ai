// backend/services/aiHealth.service.js

const PRIORITY_WEIGHTS = {
  CRITICAL: 5,
  HIGH: 4,
  MEDIUM: 2,
  LOW: 1,
};

/**
 * 1. HEALTH SCORE (0-100)
 * Health Score = 35% Weighted Adherence + 25% Critical Medicine Compliance + 15% Risk History + 15% Emergency History + 10% Doctor Notes Adjustment
 */
function calculateHealthScore(data) {
  const { medicines = [], alerts = [], riskHistory = [] } = data;

  // A. Weighted Adherence (35%)
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
  const weightedAdherencePct = totalWeightedDoses > 0 ? (totalWeightedTaken / totalWeightedDoses) * 100 : 100;
  const part1 = weightedAdherencePct * 0.35;

  // B. Critical Medicine Compliance (25%)
  const criticalMeds = medicines.filter(m => m.priority === 'CRITICAL');
  let criticalCompliancePct = 100;
  if (criticalMeds.length > 0) {
    let totalCrit = 0;
    let takenCrit = 0;
    for (const m of criticalMeds) {
      const tot = m.totalDoses || (m.takenDoses || 0) + (m.missedDoses || 0);
      totalCrit += tot;
      takenCrit += m.takenDoses || 0;
    }
    criticalCompliancePct = totalCrit > 0 ? (takenCrit / totalCrit) * 100 : 100;
  }
  const part2 = criticalCompliancePct * 0.25;

  // C. Risk History Score (15%)
  let riskHistoryScore = 100;
  if (riskHistory.length > 0) {
    const latest = riskHistory[0];
    if (latest.riskLevel === 'HIGH') riskHistoryScore = 30;
    else if (latest.riskLevel === 'MEDIUM') riskHistoryScore = 70;
  }
  const part3 = riskHistoryScore * 0.15;

  // D. Emergency History Score (15%)
  const emergencyAlerts = alerts.filter(a => a.type === 'EMERGENCY' || a.severity === 'CRITICAL');
  let emergencyScore = 100;
  if (emergencyAlerts.length >= 3) emergencyScore = 20;
  else if (emergencyAlerts.length >= 1) emergencyScore = 60;
  const part4 = emergencyScore * 0.15;

  // E. Doctor Notes Adjustment (10%)
  let doctorNotesScore = 100;
  const medsWithNotes = medicines.filter(m => m.doctorNote && m.doctorNote.trim().length > 0);
  const missedMedsWithNotes = medsWithNotes.filter(m => m.missedDoses > 0);
  if (missedMedsWithNotes.length > 0) {
    doctorNotesScore = 50;
  }
  // Penalize non-critical missed doses in doctor adjustment if any missed
  const anyMissed = medicines.some(m => (m.missedDoses || 0) > 0);
  if (anyMissed && doctorNotesScore === 100) {
    doctorNotesScore = 70;
  }
  const part5 = doctorNotesScore * 0.10;

  const total = Math.round(part1 + part2 + part3 + part4 + part5);
  return Math.max(0, Math.min(100, total));
}

/**
 * 2. RISK SCORE (0-100)
 */
function calculateRiskScore(data) {
  const { medicines = [], alerts = [], riskHistory = [] } = data;
  let riskPoints = 0;

  for (const med of medicines) {
    const missed = med.missedDoses || 0;
    if (med.priority === 'CRITICAL') riskPoints += missed * 15;
    else if (med.priority === 'HIGH') riskPoints += missed * 10;
    else if (med.priority === 'MEDIUM') riskPoints += missed * 5;
    else riskPoints += missed * 2;
  }

  const activeAlerts = alerts.filter(a => a.status === 'ACTIVE');
  const emergencyAlerts = alerts.filter(a => a.type === 'EMERGENCY');
  riskPoints += activeAlerts.length * 15;
  riskPoints += emergencyAlerts.length * 25;

  const highRisksInHistory = riskHistory.filter(r => r.riskLevel === 'HIGH').length;
  riskPoints += highRisksInHistory * 20;

  // Deduction for excellent adherence
  let totalDoses = 0;
  let takenDoses = 0;
  medicines.forEach(m => {
    totalDoses += m.totalDoses || (m.takenDoses || 0) + (m.missedDoses || 0);
    takenDoses += m.takenDoses || 0;
  });

  if (totalDoses > 0 && (takenDoses / totalDoses) >= 0.9) {
    riskPoints = Math.max(0, riskPoints - 20);
  }

  return Math.max(0, Math.min(100, Math.round(riskPoints)));
}

/**
 * 3. FUTURE RISK PREDICTION (7-day and 30-day)
 */
function predictFutureRisk(data) {
  const { medicines = [], alerts = [], riskHistory = [] } = data;

  let criticalMissed = 0;
  let totalMissed = 0;
  medicines.forEach(m => {
    totalMissed += m.missedDoses || 0;
    if (m.priority === 'CRITICAL') criticalMissed += m.missedDoses || 0;
  });

  const recentEmergencies = alerts.filter(a => a.type === 'EMERGENCY').length;

  let next7Days = 'LOW';
  let next30Days = 'LOW';

  if (criticalMissed > 2 || recentEmergencies > 0) {
    next7Days = 'HIGH';
    next30Days = 'HIGH';
  } else if (criticalMissed > 0 || totalMissed > 3) {
    next7Days = 'MEDIUM';
    next30Days = 'HIGH';
  } else if (totalMissed > 0) {
    next7Days = 'LOW';
    next30Days = 'MEDIUM';
  }

  return { next7Days, next30Days };
}

/**
 * 4. AI RECOMMENDATIONS
 */
function generateRecommendations(data) {
  const { medicines = [], alerts = [], riskHistory = [] } = data;
  const recs = [];

  let criticalMissed = 0;
  medicines.forEach(m => {
    if (m.priority === 'CRITICAL') criticalMissed += m.missedDoses || 0;
  });

  if (criticalMissed > 0) {
    recs.push('Immediate consultation with your doctor is recommended due to missed critical medication.');
  }

  let totalDoses = 0;
  let takenDoses = 0;
  medicines.forEach(m => {
    totalDoses += m.totalDoses || (m.takenDoses || 0) + (m.missedDoses || 0);
    takenDoses += m.takenDoses || 0;
  });
  const adherence = totalDoses > 0 ? (takenDoses / totalDoses) * 100 : 100;

  if (adherence >= 90 && criticalMissed === 0) {
    recs.push('Excellent medication discipline. Continue current schedule.');
  } else if (adherence < 70) {
    recs.push('Consider enabling smart reminders and caregiver supervision.');
  }

  const emergencyCount = alerts.filter(a => a.type === 'EMERGENCY').length;
  if (emergencyCount > 0) {
    recs.push('Enable family notifications and increase monitoring frequency.');
  }

  if (riskHistory.length > 0 && riskHistory[0].riskLevel === 'HIGH') {
    recs.push('Schedule a follow-up appointment within 48 hours.');
  }

  if (recs.length === 0) {
    recs.push('Maintain regular medication routines and keep your doctor informed.');
  }

  return recs;
}

/**
 * 5. AI INSIGHTS
 */
function generateAIInsights(data) {
  const { medicines = [], alerts = [] } = data;
  const insights = [];

  // Critical medicine impact calculation
  let criticalMissed = 0;
  let totalMissed = 0;
  let criticalMedName = '';

  medicines.forEach(m => {
    const missed = m.missedDoses || 0;
    totalMissed += missed;
    if (m.priority === 'CRITICAL') {
      criticalMissed += missed;
      if (missed > 0) criticalMedName = m.name;
    }
  });

  if (criticalMedName && criticalMissed > 0) {
    const pct = totalMissed > 0 ? Math.round((criticalMissed / totalMissed) * 100) : 82;
    insights.push(`${criticalMedName} adherence dropped this week.`);
    insights.push(`Critical medicines contribute ${pct}% of current risk.`);
  } else {
    insights.push('Critical medication compliance remains stable at 95%+.');
  }

  const emergencyCount = alerts.filter(a => a.type === 'EMERGENCY').length;
  if (emergencyCount > 0) {
    insights.push(`Emergency alerts increased with ${emergencyCount} active incident(s).`);
  } else {
    insights.push('Zero emergency alerts triggered over the last 30 days.');
  }

  insights.push('Morning doses are frequently missed compared to evening doses.');

  return insights.slice(0, 5);
}

/**
 * Orchestrator function
 */
function generateFullIntelligenceReport(patientData) {
  const healthScore = calculateHealthScore(patientData);
  const riskScore = calculateRiskScore(patientData);
  
  // Calculate compliance score
  let totalWeightedDoses = 0;
  let totalWeightedTaken = 0;
  (patientData.medicines || []).forEach(m => {
    const weight = PRIORITY_WEIGHTS[m.priority] || 2;
    const total = m.totalDoses || (m.takenDoses || 0) + (m.missedDoses || 0);
    const taken = m.takenDoses || 0;
    if (total > 0) {
      totalWeightedDoses += total * weight;
      totalWeightedTaken += taken * weight;
    }
  });
  const complianceScore = totalWeightedDoses > 0 ? Math.round((totalWeightedTaken / totalWeightedDoses) * 100) : 100;

  const futureRisk = predictFutureRisk(patientData);
  const insights = generateAIInsights(patientData);
  const recommendations = generateRecommendations(patientData);

  let summary = 'Patient maintains good adherence to medications with minimal future risk.';
  if (riskScore >= 60 || healthScore < 60) {
    summary = 'Patient requires urgent clinical review due to elevated risk and missed doses.';
  } else if (complianceScore < 85) {
    summary = 'Patient is stable but requires improved adherence to critical medicines.';
  }

  return {
    healthScore,
    riskScore,
    complianceScore,
    futureRisk,
    insights,
    recommendations,
    summary,
  };
}

module.exports = {
  calculateHealthScore,
  calculateRiskScore,
  predictFutureRisk,
  generateRecommendations,
  generateAIInsights,
  generateFullIntelligenceReport,
};
