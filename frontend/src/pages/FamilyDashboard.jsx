import { useState, useEffect, useRef } from 'react'
import GlassCard from '../components/ui/GlassCard'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import NeonButton from '../components/ui/NeonButton'
import {
  Users, Bell, AlertTriangle, Heart, Pill, CheckCircle, XCircle,
  Activity, Phone, Clock, ChevronRight, RefreshCw
} from 'lucide-react'

const PATIENT = {
  name: 'Alex Morgan', age: 45, condition: 'Type 2 Diabetes, Hypertension',
  doctor: 'Dr. Priya Patel', riskScore: 68, riskLevel: 'moderate', adherence: 78,
  lastSeen: 'Today, 9:05 AM', heartRate: 82, bloodPressure: '128/84',
}

const MISSED_MEDS = [
  { name: 'Metformin 500mg', time: '08:00', date: 'Today', severity: 'high' },
  { name: 'Lisinopril 10mg', time: '20:00', date: 'Yesterday', severity: 'medium' },
  { name: 'Metformin 500mg', time: '20:00', date: '2 days ago', severity: 'low' },
]

const EMERGENCY_ALERTS = [
  { id: 'e1', msg: 'Blood pressure reading high (155/98)', time: '2 hours ago', type: 'critical' },
  { id: 'e2', msg: 'Missed 2 consecutive morning doses', time: '1 day ago', type: 'warning' },
]

function generateNotifications() {
  return [
    { id: 'n1', msg: 'Alex took Lisinopril 10mg ✓', time: 'Just now', type: 'success', icon: CheckCircle },
    { id: 'n2', msg: 'Morning dose reminder sent to Alex', time: '2 min ago', type: 'info', icon: Bell },
    { id: 'n3', msg: 'Metformin 500mg missed – evening dose', time: '4 hours ago', type: 'warning', icon: XCircle },
    { id: 'n4', msg: 'Doctor Patel viewed health report', time: '6 hours ago', type: 'info', icon: Activity },
    { id: 'n5', msg: 'Risk score updated: 68 (Moderate)', time: '1 day ago', type: 'info', icon: Activity },
    { id: 'n6', msg: 'Weekly health summary emailed', time: '2 days ago', type: 'success', icon: CheckCircle },
  ]
}

export default function FamilyDashboard() {
  const [notifications, setNotifications] = useState(generateNotifications())
  const [live, setLive] = useState(true)
  const [pulse, setPulse] = useState(82)
  const timerRef = useRef(null)

  // Simulate live heartrate updates
  useEffect(() => {
    if (!live) return
    timerRef.current = setInterval(() => {
      setPulse(p => {
        const delta = Math.floor(Math.random() * 7) - 3
        return Math.max(60, Math.min(110, p + delta))
      })
    }, 2000)
    return () => clearInterval(timerRef.current)
  }, [live])

  function refreshFeed() {
    const newNote = {
      id: `n${Date.now()}`,
      msg: 'Patient status refreshed',
      time: 'Just now',
      type: 'info',
      icon: Activity,
    }
    setNotifications(prev => [newNote, ...prev.slice(0, 8)])
  }

  const notifColor = { success: 'var(--success)', warning: 'var(--warning)', info: 'var(--neon)', critical: 'var(--danger)' }
  const notifBg = { success: 'rgba(0,230,118,0.08)', warning: 'rgba(255,181,71,0.06)', info: 'rgba(42,255,222,0.06)', critical: 'rgba(255,61,90,0.08)' }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={28} color="var(--neon)" />
            Family Hub
          </h1>
          <p className="page-subtitle">Monitoring {PATIENT.name} — Stay informed, stay connected</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.875rem', borderRadius: 999, background: live ? 'rgba(0,230,118,0.1)' : 'rgba(77,122,148,0.1)', border: `1px solid ${live ? 'rgba(0,230,118,0.3)' : 'var(--border-subtle)'}`, fontSize: '0.75rem', fontWeight: 600, color: live ? 'var(--success)' : 'var(--text-muted)', cursor: 'pointer' }}
            onClick={() => setLive(l => !l)}>
            <span className={`live-dot ${!live ? '' : ''}`} style={{ background: live ? 'var(--success)' : 'var(--text-muted)' }} />
            {live ? 'Live' : 'Paused'}
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="stat-grid">
        <StatCard icon={<Heart size={20} />} value={`${pulse} bpm`} label="Live Heart Rate" color={pulse > 100 ? 'danger' : 'success'} trend={pulse > 85 ? 'Elevated' : 'Normal'} trendUp={pulse <= 85} delay={0} />
        <StatCard icon={<Activity size={20} />} value={PATIENT.riskScore} label="Risk Score" color={PATIENT.riskLevel === 'moderate' ? 'warning' : PATIENT.riskLevel === 'high' ? 'danger' : 'success'} delay={100} />
        <StatCard icon={<Pill size={20} />} value={MISSED_MEDS.length} label="Missed Doses (7d)" color="danger" delay={200} />
        <StatCard icon={<CheckCircle size={20} />} value={`${PATIENT.adherence}%`} label="Adherence Rate" color="neon" delay={300} />
      </div>

      <div className="two-col" style={{ marginBottom: '1.5rem' }}>
        {/* Patient Status Card */}
        <GlassCard glow>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={16} color="var(--danger)" />
                <span className="card-title">Patient Status</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <span className="live-dot" />
                <span style={{ fontSize: '0.72rem', color: 'var(--success)' }}>Live</span>
              </div>
            </div>

            {/* Patient info */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon), #00b4d8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.25rem', fontWeight: 800, color: '#020b12',
                flexShrink: 0, boxShadow: '0 0 20px rgba(42,255,222,0.3)',
                animation: 'heartbeat 2s ease-in-out infinite',
              }}>
                {PATIENT.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>{PATIENT.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Age {PATIENT.age} · {PATIENT.condition}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--neon)', marginTop: '0.25rem' }}>Dr. {PATIENT.doctor}</div>
              </div>
            </div>

            {/* Vitals */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1.25rem' }}>
              {[
                { label: 'Heart Rate', value: `${pulse} bpm`, color: pulse > 100 ? 'var(--danger)' : 'var(--success)', bg: pulse > 100 ? 'rgba(255,61,90,0.08)' : 'rgba(0,230,118,0.08)' },
                { label: 'Blood Pressure', value: PATIENT.bloodPressure, color: 'var(--warning)', bg: 'rgba(255,181,71,0.08)' },
                { label: 'Risk Level', value: PATIENT.riskLevel, color: 'var(--warning)', bg: 'rgba(255,181,71,0.08)' },
                { label: 'Last Seen', value: PATIENT.lastSeen, color: 'var(--text-secondary)', bg: 'rgba(42,255,222,0.04)' },
              ].map(v => (
                <div key={v.label} style={{ padding: '0.75rem', borderRadius: 8, background: v.bg, border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>{v.label}</div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: v.color, textTransform: 'capitalize' }}>{v.value}</div>
                </div>
              ))}
            </div>

            {/* Adherence */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                <span>Weekly Adherence</span>
                <span style={{ color: 'var(--neon)' }}>{PATIENT.adherence}%</span>
              </div>
              <div className="progress-track" style={{ height: 8 }}>
                <div className="progress-fill" style={{ width: `${PATIENT.adherence}%` }} />
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.25rem' }}>
              <NeonButton variant="danger" solid size="sm" block>
                <Phone size={14} />
                Emergency Call
              </NeonButton>
            </div>
          </div>
        </GlassCard>

        {/* Missed Medicines */}
        <GlassCard danger>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <XCircle size={16} color="var(--danger)" />
                <span className="card-title">Missed Medicines</span>
              </div>
              <Badge variant="danger">{MISSED_MEDS.length}</Badge>
            </div>

            {MISSED_MEDS.length === 0 ? (
              <div className="empty-state" style={{ padding: '1.5rem' }}>
                <CheckCircle size={32} color="var(--success)" />
                <p style={{ marginTop: '0.75rem' }}>All medicines taken today! 🎉</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {MISSED_MEDS.map((m, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '0.875rem',
                    borderRadius: 8,
                    background: 'rgba(255,61,90,0.06)',
                    border: '1px solid rgba(255,61,90,0.15)',
                  }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,61,90,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Pill size={16} color="var(--danger)" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)' }}>{m.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.375rem', marginTop: '0.25rem' }}>
                        <Clock size={11} />
                        Scheduled {m.time} · {m.date}
                      </div>
                    </div>
                    <Badge variant={m.severity === 'high' ? 'danger' : m.severity === 'medium' ? 'warning' : 'neutral'}>
                      {m.severity}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            {EMERGENCY_ALERTS.length > 0 && (
              <>
                <div className="divider" />
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>Emergency Alerts</div>
                {EMERGENCY_ALERTS.map(a => (
                  <div key={a.id} className={`alert-item ${a.type}`} style={{ marginBottom: '0.625rem' }}>
                    <AlertTriangle size={15} color={a.type === 'critical' ? 'var(--danger)' : 'var(--warning)'} />
                    <div>
                      <div className="alert-msg">{a.msg}</div>
                      <div className="alert-time">{a.time}</div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Live Notifications Feed */}
      <GlassCard glow>
        <div style={{ padding: '1.5rem' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Bell size={16} color="var(--neon)" />
              <span className="card-title">Live Notifications</span>
              <span className="live-dot" style={{ marginLeft: '0.25rem' }} />
            </div>
            <NeonButton size="sm" variant="ghost" onClick={refreshFeed}>
              <RefreshCw size={13} />
              Refresh
            </NeonButton>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
            {notifications.map((n, i) => (
              <div key={n.id} style={{
                display: 'flex', alignItems: 'flex-start', gap: '0.875rem',
                padding: '0.875rem',
                borderRadius: 8,
                background: notifBg[n.type],
                border: '1px solid var(--border-subtle)',
                animation: i === 0 ? 'slide-in-left 0.4s ease both' : 'none',
                transition: 'all 0.3s',
              }}>
                <div style={{ width: 32, height: 32, borderRadius: 8, background: `${notifColor[n.type]}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <n.icon size={15} color={notifColor[n.type]} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>{n.msg}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Clock size={10} />
                    {n.time}
                  </div>
                </div>
                <Badge variant={n.type === 'success' ? 'success' : n.type === 'warning' ? 'warning' : n.type === 'critical' ? 'danger' : 'neon'}>
                  {n.type}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
