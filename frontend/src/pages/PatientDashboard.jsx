import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMedicines, logAdherence, createMedicine, deleteMedicine } from '../api/medicines'
import { getLatestRisk } from '../api/risk'
import { getAlerts, createAlert } from '../api/alerts'
import GlassCard from '../components/ui/GlassCard'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import RiskMeter from '../components/ui/RiskMeter'
import NeonButton from '../components/ui/NeonButton'
import Spinner from '../components/ui/Spinner'
import {
  Pill, CheckCircle, XCircle, Plus, AlertTriangle, Clock,
  Heart, Activity, TrendingUp, Shield, Phone, X
} from 'lucide-react'

const emptyForm = {
  name: '', dosageAmount: '', dosageUnit: 'mg',
  timesPerDay: '1', times: '08:00', condition: '', prescribedBy: '',
  startDate: new Date().toISOString().slice(0, 10),
}

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function riskVariant(level) {
  return { low: 'success', moderate: 'warning', high: 'danger', critical: 'danger' }[level] || 'neutral'
}

export default function PatientDashboard() {
  const { user } = useAuth()
  const [medicines, setMedicines] = useState([])
  const [risk, setRisk] = useState(null)
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [showEmergency, setShowEmergency] = useState(false)
  const [form, setForm] = useState(emptyForm)
  const [emergencyMsg, setEmergencyMsg] = useState('')

  async function load() {
    try {
      const [meds, riskRes, alertRes] = await Promise.all([getMedicines(), getLatestRisk(), getAlerts()])
      setMedicines(meds.data ?? [])
      setRisk(riskRes.data)
      setAlerts((alertRes.data ?? []).filter(a => a.status === 'open'))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function handleLog(id, status) {
    await logAdherence(id, status)
    load()
  }

  async function handleCreate(e) {
    e.preventDefault()
    await createMedicine({
      name: form.name,
      dosage: { amount: Number(form.dosageAmount), unit: form.dosageUnit },
      frequency: { timesPerDay: Number(form.timesPerDay), times: form.times.split(',').map(t => t.trim()) },
      startDate: form.startDate,
      condition: form.condition,
      prescribedBy: form.prescribedBy,
    })
    setForm(emptyForm)
    setShowForm(false)
    load()
  }

  async function handleEmergency() {
    await createAlert({ type: 'emergency', severity: 'critical', message: emergencyMsg || 'Emergency alert triggered by patient!' })
    setShowEmergency(false)
    setEmergencyMsg('')
    load()
  }

  const takenToday = medicines.filter(m => m.adherenceLog?.some(l => l.status === 'taken' && new Date(l.scheduledAt).toDateString() === new Date().toDateString())).length
  const missedToday = medicines.filter(m => m.adherenceLog?.some(l => l.status === 'missed' && new Date(l.scheduledAt).toDateString() === new Date().toDateString())).length
  const adherenceRate = medicines.length > 0 ? Math.round((takenToday / medicines.length) * 100) : 0

  // Upcoming: next 3 scheduled times
  const now = new Date()
  const upcoming = medicines.flatMap(m =>
    (m.frequency?.times ?? []).map(t => ({ med: m.name, time: t, id: m._id }))
  ).sort((a, b) => a.time.localeCompare(b.time)).slice(0, 4)

  if (loading) return (
    <div className="loading-screen">
      <Spinner size="lg" label="Loading your dashboard..." />
    </div>
  )

  return (
    <div className="page">
      {/* Header */}
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span>{getGreeting()},</span>
            <span style={{ color: 'var(--neon)' }}>{user?.name?.split(' ')[0] || 'there'}</span>
            <span style={{ animation: 'heartbeat 1.5s ease-in-out infinite', display: 'inline-block' }}>
              <Heart size={28} color="var(--danger)" fill="var(--danger)" />
            </span>
          </h1>
          <p className="page-subtitle">Here's your health overview for today — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <NeonButton variant="danger" solid onClick={() => setShowEmergency(true)}>
          <Phone size={16} />
          Emergency
        </NeonButton>
      </header>

      {/* Stats */}
      <div className="stat-grid">
        <StatCard icon={<Pill size={20} />} value={medicines.length} label="Active Medicines" color="neon" delay={0} />
        <StatCard icon={<CheckCircle size={20} />} value={takenToday} label="Taken Today" color="success" delay={100} />
        <StatCard icon={<XCircle size={20} />} value={missedToday} label="Missed Today" color="danger" delay={200} />
        <StatCard icon={<TrendingUp size={20} />} value={`${adherenceRate}%`} label="Adherence Rate" color="purple" delay={300} />
      </div>

      <div className="two-col">
        {/* AI Risk Score Card */}
        <GlassCard glow={risk?.riskLevel !== 'high' && risk?.riskLevel !== 'critical'} danger={risk?.riskLevel === 'high' || risk?.riskLevel === 'critical'}>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                  <Activity size={16} color="var(--neon)" />
                  <span className="card-title">AI Risk Score</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Powered by predictive model</p>
              </div>
              {risk && <Badge variant={riskVariant(risk.riskLevel)}>{risk.riskLevel}</Badge>}
            </div>

            {risk ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                  <RiskMeter score={risk.riskScore} level={risk.riskLevel} size={160} />
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '0.5rem', fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Recommendations</div>
                    <ul style={{ padding: '0 0 0 1.1rem', margin: 0 }}>
                      {(risk.recommendations ?? []).map(rec => (
                        <li key={rec} style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.375rem' }}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                    <span>Adherence Score</span>
                    <span style={{ color: 'var(--neon)' }}>{risk.inputFactors?.adherenceScore ?? 0}%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: `${risk.inputFactors?.adherenceScore ?? 0}%` }} />
                  </div>
                </div>
              </>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon"><Shield size={36} /></div>
                <p>No risk assessment yet</p>
                <NeonButton size="sm" onClick={() => {}} style={{ marginTop: '1rem' }}>
                  Run Assessment
                </NeonButton>
              </div>
            )}
          </div>
        </GlassCard>

        {/* Upcoming Medicines */}
        <GlassCard glow>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={16} color="var(--warning)" />
                <span className="card-title">Upcoming Doses</span>
              </div>
              <span className="live-dot" style={{ marginLeft: 'auto' }} />
            </div>
            {upcoming.length === 0 ? (
              <div className="empty-state" style={{ padding: '1.5rem' }}>
                <p>No upcoming doses</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {upcoming.map((u, i) => (
                  <div key={`${u.id}-${u.time}`} style={{
                    display: 'flex', alignItems: 'center', gap: '1rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: i === 0 ? 'rgba(42,255,222,0.06)' : 'rgba(42,255,222,0.02)',
                    border: `1px solid ${i === 0 ? 'rgba(42,255,222,0.2)' : 'var(--border-subtle)'}`,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                      background: i === 0 ? 'rgba(42,255,222,0.12)' : 'rgba(42,255,222,0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <Pill size={16} color={i === 0 ? 'var(--neon)' : 'var(--text-secondary)'} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{u.med}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.time}</div>
                    </div>
                    {i === 0 && <Badge variant="neon">Next</Badge>}
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Today's Medicines */}
      <GlassCard glow style={{ marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Pill size={16} color="var(--neon)" />
              <span className="card-title">Today's Medicines</span>
            </div>
            <NeonButton size="sm" variant="primary" solid onClick={() => setShowForm(!showForm)}>
              <Plus size={14} />
              {showForm ? 'Cancel' : 'Add Medicine'}
            </NeonButton>
          </div>

          {/* Add Medicine Form */}
          {showForm && (
            <div style={{
              marginBottom: '1.5rem', padding: '1.25rem',
              background: 'rgba(42,255,222,0.04)', border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius)',
            }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem', color: 'var(--neon)' }}>Add New Medicine</h3>
              <form onSubmit={handleCreate}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.875rem', marginBottom: '1rem' }}>
                  {[
                    { label: 'Medicine Name', field: 'name', type: 'text', req: true },
                    { label: 'Dosage Amount', field: 'dosageAmount', type: 'number', req: true },
                    { label: 'Condition', field: 'condition', type: 'text' },
                    { label: 'Prescribed By', field: 'prescribedBy', type: 'text' },
                    { label: 'Start Date', field: 'startDate', type: 'date' },
                    { label: 'Schedule (comma sep.)', field: 'times', type: 'text' },
                  ].map(f => (
                    <label key={f.field}>
                      {f.label}
                      <input type={f.type} value={form[f.field]} required={f.req}
                        onChange={e => setForm(p => ({ ...p, [f.field]: e.target.value }))} />
                    </label>
                  ))}
                  <label>
                    Unit
                    <select value={form.dosageUnit} onChange={e => setForm(p => ({ ...p, dosageUnit: e.target.value }))}>
                      <option value="mg">mg</option>
                      <option value="ml">ml</option>
                      <option value="tablet">tablet</option>
                    </select>
                  </label>
                  <label>
                    Times per Day
                    <input type="number" min="1" value={form.timesPerDay} onChange={e => setForm(p => ({ ...p, timesPerDay: e.target.value }))} />
                  </label>
                </div>
                <NeonButton type="submit" solid size="sm">Save Medicine</NeonButton>
              </form>
            </div>
          )}

          {medicines.length === 0 ? (
            <div className="empty-state" style={{ padding: '2rem' }}>
              <div className="empty-state-icon"><Pill size={36} /></div>
              <p>No medicines added yet. Click "Add Medicine" to get started.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
              {medicines.map((med, i) => {
                const lastLog = med.adherenceLog?.[med.adherenceLog.length - 1]
                const status = lastLog?.status
                return (
                  <div key={med._id} className="glass-card medicine-card"
                    style={{ animationDelay: `${i * 80}ms`, border: status === 'taken' ? '1px solid rgba(0,230,118,0.2)' : status === 'missed' ? '1px solid rgba(255,61,90,0.2)' : '1px solid var(--border-subtle)' }}>
                    <div className="medicine-card-header">
                      <div>
                        <div className="medicine-name">{med.name}</div>
                        <div className="medicine-dose">{med.dosage?.amount} {med.dosage?.unit} · {med.frequency?.timesPerDay}x/day</div>
                      </div>
                      <Badge variant={med.isActive ? 'success' : 'neutral'}>{med.isActive ? 'Active' : 'Inactive'}</Badge>
                    </div>
                    <div className="medicine-meta">
                      <div className="medicine-meta-item"><dt>Condition</dt><dd>{med.condition || '—'}</dd></div>
                      <div className="medicine-meta-item"><dt>Schedule</dt><dd>{(med.frequency?.times ?? []).join(', ') || '—'}</dd></div>
                      <div className="medicine-meta-item"><dt>Doctor</dt><dd>{med.prescribedBy || '—'}</dd></div>
                    </div>
                    <div className="medicine-actions">
                      <NeonButton variant="success" solid size="sm" onClick={() => handleLog(med._id, 'taken')}>
                        <CheckCircle size={14} />
                        Mark Taken
                      </NeonButton>
                      <NeonButton variant="danger" size="sm" onClick={() => handleLog(med._id, 'missed')}>
                        <XCircle size={14} />
                        Mark Missed
                      </NeonButton>
                      <NeonButton variant="ghost" size="sm" onClick={() => { if (confirm('Remove this medicine?')) deleteMedicine(med._id).then(load) }}>
                        Remove
                      </NeonButton>
                    </div>
                    {status && (
                      <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 6, background: status === 'taken' ? 'rgba(0,230,118,0.08)' : 'rgba(255,61,90,0.08)', fontSize: '0.75rem', color: status === 'taken' ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        {status === 'taken' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                        Last logged as <strong>{status}</strong>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </GlassCard>

      {/* Open Alerts */}
      {alerts.length > 0 && (
        <GlassCard danger>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} color="var(--danger)" />
                <span className="card-title">Active Alerts</span>
              </div>
              <Badge variant="danger">{alerts.length}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {alerts.map(a => (
                <div key={a._id} className={`alert-item ${a.severity === 'critical' ? 'critical' : a.severity === 'warning' ? 'warning' : ''}`}>
                  <div className="alert-icon">
                    <AlertTriangle size={16} color={a.severity === 'critical' ? 'var(--danger)' : 'var(--warning)'} />
                  </div>
                  <div>
                    <div className="alert-msg">{a.message}</div>
                    <div className="alert-time">{new Date(a.createdAt).toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>
      )}

      {/* Emergency FAB */}
      <button className="fab-emergency" onClick={() => setShowEmergency(true)} aria-label="Emergency">
        <Phone size={24} />
      </button>

      {/* Emergency Modal */}
      {showEmergency && (
        <div style={{
          position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
          backdropFilter: 'blur(6px)', animation: 'fade-in 0.2s ease both',
        }}>
          <div className="glass-card" style={{
            width: '100%', maxWidth: 440, padding: '2rem',
            border: '1px solid rgba(255,61,90,0.4)',
            boxShadow: '0 0 40px rgba(255,61,90,0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,61,90,0.15)', border: '1px solid rgba(255,61,90,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Phone size={18} color="var(--danger)" />
                </div>
                <div>
                  <div style={{ fontWeight: 700, color: 'var(--danger)' }}>Emergency Alert</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Your care team will be notified immediately</div>
                </div>
              </div>
              <button onClick={() => setShowEmergency(false)} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>
            <label style={{ marginBottom: '1.25rem' }}>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Message (optional)</span>
              <textarea
                value={emergencyMsg}
                onChange={e => setEmergencyMsg(e.target.value)}
                rows={3}
                placeholder="Describe your emergency..."
                style={{ resize: 'vertical', marginTop: '0.375rem' }}
              />
            </label>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <NeonButton variant="danger" solid block onClick={handleEmergency}>
                <Phone size={16} />
                Send Emergency Alert
              </NeonButton>
              <NeonButton variant="ghost" onClick={() => setShowEmergency(false)}>
                Cancel
              </NeonButton>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
