const STORAGE_KEY = 'pulseguard_demo'

function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {
    /* ignore */
  }
  return seedStore()
}

function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

function seedStore() {
  const now = new Date().toISOString()
  return {
    user: {
      id: 'demo-user-1',
      name: 'Alex Morgan',
      email: 'alex@example.com',
      role: 'patient',
      phone: '+1 555-0100',
    },
    medicines: [
      {
        _id: 'med-1',
        name: 'Metformin',
        dosage: { amount: 500, unit: 'mg' },
        frequency: { timesPerDay: 2, times: ['08:00', '20:00'] },
        startDate: '2026-01-15',
        condition: 'Type 2 Diabetes',
        prescribedBy: 'Dr. Patel',
        isActive: true,
        adherenceLog: [
          { scheduledAt: now, status: 'taken' },
        ],
      },
      {
        _id: 'med-2',
        name: 'Lisinopril',
        dosage: { amount: 10, unit: 'mg' },
        frequency: { timesPerDay: 1, times: ['09:00'] },
        startDate: '2025-11-01',
        condition: 'Hypertension',
        prescribedBy: 'Dr. Patel',
        isActive: true,
        adherenceLog: [
          { scheduledAt: now, status: 'pending' },
        ],
      },
    ],
    riskAssessments: [
      {
        _id: 'risk-1',
        riskScore: 28,
        riskLevel: 'low',
        modelVersion: 'demo-v1',
        recommendations: [
          'Continue current medication schedule',
          'Monitor blood pressure weekly',
        ],
        inputFactors: {
          vitals: { heartRate: 72, bloodPressure: { systolic: 118, diastolic: 76 } },
          adherenceScore: 92,
        },
        createdAt: now,
      },
    ],
    alerts: [
      {
        _id: 'alert-1',
        type: 'medicine_missed',
        severity: 'warning',
        message: 'Missed evening dose of Metformin yesterday',
        status: 'open',
        createdAt: now,
      },
    ],
  }
}

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const demoStore = {
  getUser() {
    return loadStore().user
  },

  login(email, password) {
    const store = loadStore()
    if (!email || !password) throw new Error('Email and password are required')
    store.user = { ...store.user, email }
    saveStore(store)
    return { success: true, data: store.user }
  },

  register({ name, email, password }) {
    if (!name || !email || !password) throw new Error('All fields are required')
    const store = loadStore()
    store.user = { ...store.user, name, email }
    saveStore(store)
    return { success: true, data: store.user }
  },

  logout() {
    return { success: true }
  },

  getMedicines() {
    return { success: true, data: loadStore().medicines }
  },

  createMedicine(body) {
    const store = loadStore()
    const medicine = {
      _id: uid('med'),
      isActive: true,
      adherenceLog: [],
      ...body,
    }
    store.medicines.push(medicine)
    saveStore(store)
    return { success: true, data: medicine }
  },

  deleteMedicine(id) {
    const store = loadStore()
    store.medicines = store.medicines.filter((m) => m._id !== id)
    saveStore(store)
    return { success: true }
  },

  logAdherence(id, status) {
    const store = loadStore()
    const med = store.medicines.find((m) => m._id === id)
    if (!med) throw new Error('Medicine not found')
    med.adherenceLog.push({ scheduledAt: new Date().toISOString(), status })
    saveStore(store)
    return { success: true, data: med }
  },

  getLatestRisk() {
    const assessments = loadStore().riskAssessments
    return { success: true, data: assessments[assessments.length - 1] || null }
  },

  getRiskHistory() {
    return { success: true, data: loadStore().riskAssessments }
  },

  predictRisk(body) {
    const store = loadStore()
    const hr = body?.vitals?.heartRate ?? 75
    const score = Math.min(95, Math.max(5, Math.round(hr * 0.6 + Math.random() * 20)))
    const riskLevel =
      score >= 75 ? 'critical' : score >= 55 ? 'high' : score >= 35 ? 'moderate' : 'low'
    const assessment = {
      _id: uid('risk'),
      riskScore: score,
      riskLevel,
      modelVersion: 'demo-v1',
      recommendations:
        riskLevel === 'low'
          ? ['Maintain current care plan', 'Stay hydrated']
          : ['Contact your physician', 'Review medication adherence'],
      inputFactors: body,
      createdAt: new Date().toISOString(),
    }
    store.riskAssessments.push(assessment)
    saveStore(store)
    return { success: true, data: assessment }
  },

  getAlerts() {
    return { success: true, data: loadStore().alerts }
  },

  createAlert(body) {
    const store = loadStore()
    const alert = {
      _id: uid('alert'),
      type: 'manual',
      severity: 'critical',
      status: 'open',
      createdAt: new Date().toISOString(),
      message: body.message || 'Manual emergency alert triggered',
      ...body,
    }
    store.alerts.unshift(alert)
    saveStore(store)
    return { success: true, data: alert }
  },

  acknowledgeAlert(id) {
    const store = loadStore()
    const alert = store.alerts.find((a) => a._id === id)
    if (alert) {
      alert.status = 'acknowledged'
      alert.acknowledgedAt = new Date().toISOString()
    }
    saveStore(store)
    return { success: true, data: alert }
  },

  resolveAlert(id) {
    const store = loadStore()
    const alert = store.alerts.find((a) => a._id === id)
    if (alert) {
      alert.status = 'resolved'
      alert.resolvedAt = new Date().toISOString()
    }
    saveStore(store)
    return { success: true, data: alert }
  },
}

async function withFallback(apiCall, demoCall) {
  try {
    return await apiCall()
  } catch (err) {
    if (
      err.status === 501 ||
      err.status === 404 ||
      err.status >= 500 ||
      err.name === 'TypeError'
    ) {
      return demoCall()
    }
    throw err
  }
}

export { withFallback }
