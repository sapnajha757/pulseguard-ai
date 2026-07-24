import { useEffect, useState } from 'react'
import { acknowledgeAlert, createAlert, getAlerts, resolveAlert } from '../api/alerts'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import NeonButton from '../components/ui/NeonButton'
import Spinner from '../components/ui/Spinner'
import { Bell, AlertTriangle, CheckCircle, ShieldAlert } from 'lucide-react'

function severityBadge(severity) {
  return { info: 'neutral', warning: 'warning', critical: 'danger' }[severity] || 'neutral'
}

function statusBadge(status) {
  return { open: 'danger', acknowledged: 'warning', resolved: 'success' }[status] || 'neutral'
}

export default function Alerts() {
  const [alerts, setAlerts] = useState([])
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [triggering, setTriggering] = useState(false)

  async function load() {
    setLoading(true)
    const res = await getAlerts()
    setAlerts(res.data ?? [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function handleEmergency(e) {
    e.preventDefault()
    setTriggering(true)
    try {
      await createAlert({ message: message || 'Manual emergency alert triggered by user' })
      setMessage('')
      load()
    } finally { setTriggering(false) }
  }

  async function handleAck(id) {
    await acknowledgeAlert(id)
    load()
  }

  async function handleResolve(id) {
    await resolveAlert(id)
    load()
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell size={28} color="var(--neon)" />
            Alerts & Notifications
          </h1>
          <p className="page-subtitle">Emergency alerts, missed dose warnings, and care team notifications</p>
        </div>
      </header>

      {/* Emergency Trigger Card */}
      <GlassCard danger style={{ marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={20} color="var(--danger)" />
              <span className="card-title" style={{ color: 'var(--danger)' }}>Trigger Manual Emergency Alert</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '1rem' }}>
            Instantly broadcast a high-priority alert to your assigned doctors, caregivers, and family members.
          </p>
          <form onSubmit={handleEmergency} style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe the condition or location (optional)..."
              style={{ flex: 1, minWidth: 240 }}
            />
            <NeonButton type="submit" variant="danger" solid disabled={triggering}>
              <AlertTriangle size={15} />
              {triggering ? 'Triggering...' : 'Broadcast Emergency'}
            </NeonButton>
          </form>
        </div>
      </GlassCard>

      {/* Alerts Feed */}
      {loading ? (
        <div className="loading-inline"><Spinner label="Loading alerts..." /></div>
      ) : alerts.length === 0 ? (
        <GlassCard>
          <div className="empty-state">
            <CheckCircle size={40} color="var(--success)" style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>No active alerts. All systems operational.</p>
          </div>
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {alerts.map((alert, i) => (
            <GlassCard key={alert._id} danger={alert.severity === 'critical'} style={{ animationDelay: `${i * 60}ms` }}>
              <div style={{ padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {alert.message}
                    </h3>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'capitalize' }}>
                      Type: {alert.type.replace(/_/g, ' ')} · {new Date(alert.createdAt).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Badge variant={severityBadge(alert.severity)}>{alert.severity}</Badge>
                    <Badge variant={statusBadge(alert.status)}>{alert.status}</Badge>
                  </div>
                </div>

                {alert.status !== 'resolved' && (
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                    {alert.status === 'open' && (
                      <NeonButton size="sm" variant="warning" onClick={() => handleAck(alert._id)}>
                        Acknowledge
                      </NeonButton>
                    )}
                    <NeonButton size="sm" variant="success" solid onClick={() => handleResolve(alert._id)}>
                      <CheckCircle size={14} />
                      Resolve Alert
                    </NeonButton>
                  </div>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  )
}
