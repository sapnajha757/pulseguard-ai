import { useEffect, useState } from 'react'
import { getLatestRisk, getRiskHistory, predictRisk } from '../api/risk'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import NeonButton from '../components/ui/NeonButton'
import RiskMeter from '../components/ui/RiskMeter'
import Spinner from '../components/ui/Spinner'
import { Activity, Brain, TrendingUp } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import EmergencySystem from '../components/EmergencySystem'

function riskVariant(level) {
  return { low: 'success', moderate: 'warning', high: 'danger', critical: 'danger' }[level] || 'neutral'
}

export default function Risk() {
  const { user } = useAuth()
  const [latest, setLatest] = useState(null)
  const [history, setHistory] = useState([])
  const [vitals, setVitals] = useState({ heartRate: 72, systolic: 118, diastolic: 76 })
  const [loading, setLoading] = useState(true)
  const [predicting, setPredicting] = useState(false)

  async function load() {
    setLoading(true)
    const [latestRes, historyRes] = await Promise.all([getLatestRisk(), getRiskHistory()])
    setLatest(latestRes.data)
    setHistory(historyRes.data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handlePredict(e) {
    e.preventDefault(); setPredicting(true)
    try {
      await predictRisk({ vitals: { heartRate: Number(vitals.heartRate), bloodPressure: { systolic: Number(vitals.systolic), diastolic: Number(vitals.diastolic) } } })
      load()
    } finally { setPredicting(false) }
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Brain size={28} color="var(--neon)" />
            AI Risk Assessment
          </h1>
          <p className="page-subtitle">AI-powered health risk prediction based on your vitals and adherence</p>
        </div>
      </header>

      <div className="two-col">
        {/* Input Form */}
        <GlassCard glow>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <span className="card-title">Run New Assessment</span>
            </div>
            <form onSubmit={handlePredict} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { label: 'Heart Rate (bpm)', key: 'heartRate', min: 40, max: 200 },
                { label: 'Systolic BP (mmHg)', key: 'systolic', min: 80, max: 220 },
                { label: 'Diastolic BP (mmHg)', key: 'diastolic', min: 40, max: 140 },
              ].map(f => (
                <label key={f.key}>
                  {f.label}
                  <input type="number" min={f.min} max={f.max} value={vitals[f.key]}
                    onChange={e => setVitals(v => ({ ...v, [f.key]: e.target.value }))} />
                </label>
              ))}
              <NeonButton type="submit" solid block disabled={predicting} style={{ marginTop: '0.5rem' }}>
                {predicting ? <><div className="spinner sm" style={{ borderTopColor: '#020b12', borderColor: 'rgba(2,11,18,0.3)' }} />Analyzing...</> : <><Brain size={16} />Predict Risk Score</>}
              </NeonButton>
            </form>
          </div>
        </GlassCard>

        {/* Latest Result */}
        <GlassCard glow={latest?.riskLevel !== 'high'} danger={latest?.riskLevel === 'high' || latest?.riskLevel === 'critical'}>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--neon)" />
                <span className="card-title">Latest Result</span>
              </div>
            </div>
            {loading ? (
              <div className="loading-inline"><Spinner /></div>
            ) : latest ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
                  <RiskMeter score={latest.riskScore} level={latest.riskLevel} size={140} />
                  <div>
                    <Badge variant={riskVariant(latest.riskLevel)} style={{ marginBottom: '0.75rem' }}>
                      {latest.riskLevel}
                    </Badge>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                      {new Date(latest.createdAt).toLocaleString()}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                      Model: {latest.modelVersion}
                    </div>
                  </div>
                </div>
                {latest.recommendations?.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>Recommendations</div>
                    <ul style={{ padding: '0 0 0 1.1rem', margin: 0 }}>
                      {latest.recommendations.map(r => (
                        <li key={r} style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.65, marginBottom: '0.375rem' }}>{r}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="empty-state" style={{ padding: '2rem' }}>
                <p>No assessments yet. Run your first prediction.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* History */}
      <GlassCard glow>
        <div style={{ padding: '1.5rem' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} color="var(--neon)" />
              <span className="card-title">Assessment History</span>
            </div>
          </div>
          {history.length === 0 ? (
            <div className="empty-state"><p>No history available yet.</p></div>
          ) : (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr><th>Date & Time</th><th>Score</th><th>Level</th><th>Heart Rate</th><th>Blood Pressure</th><th>Model</th></tr>
                </thead>
                <tbody>
                  {[...history].reverse().map(item => (
                    <tr key={item._id}>
                      <td style={{ fontSize: '0.8rem' }}>{new Date(item.createdAt).toLocaleString()}</td>
                      <td><span style={{ fontWeight: 700, color: riskVariant(item.riskLevel) === 'success' ? 'var(--success)' : riskVariant(item.riskLevel) === 'warning' ? 'var(--warning)' : 'var(--danger)' }}>{item.riskScore}/100</span></td>
                      <td><Badge variant={riskVariant(item.riskLevel)}>{item.riskLevel}</Badge></td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.inputFactors?.vitals?.heartRate ?? '—'} bpm</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.inputFactors?.vitals?.bloodPressure ? `${item.inputFactors.vitals.bloodPressure.systolic}/${item.inputFactors.vitals.bloodPressure.diastolic}` : '—'}</td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.modelVersion}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </GlassCard>

      {/* Emergency System */}
      <EmergencySystem userId={user?.id || 'default_user'} />
    </div>
  )
}
