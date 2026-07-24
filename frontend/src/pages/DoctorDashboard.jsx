import { useState, useEffect } from 'react'
import GlassCard from '../components/ui/GlassCard'
import StatCard from '../components/ui/StatCard'
import Badge from '../components/ui/Badge'
import NeonButton from '../components/ui/NeonButton'
import RiskMeter from '../components/ui/RiskMeter'
import {
  Users, AlertTriangle, Activity, TrendingUp, Stethoscope,
  ChevronRight, Bell, Pill, BarChart3, Eye
} from 'lucide-react'
import { demoStore } from '../api/demoStore'

// Doctor's demo patient data
const DEMO_PATIENTS = [
  { id: 'p1', name: 'Alex Morgan', age: 45, condition: 'Type 2 Diabetes, Hypertension', riskScore: 72, riskLevel: 'high', adherence: 64, lastSeen: '2026-07-24', meds: ['Metformin 500mg', 'Lisinopril 10mg'], alerts: 3 },
  { id: 'p2', name: 'Sarah Chen', age: 62, condition: 'Heart Failure', riskScore: 88, riskLevel: 'critical', adherence: 45, lastSeen: '2026-07-23', meds: ['Carvedilol 25mg', 'Furosemide 40mg', 'Spironolactone'], alerts: 5 },
  { id: 'p3', name: 'James Patel', age: 38, condition: 'Asthma', riskScore: 31, riskLevel: 'low', adherence: 91, lastSeen: '2026-07-22', meds: ['Albuterol inhaler', 'Budesonide'], alerts: 0 },
  { id: 'p4', name: 'Maria Santos', age: 55, condition: 'Rheumatoid Arthritis', riskScore: 55, riskLevel: 'moderate', adherence: 78, lastSeen: '2026-07-24', meds: ['Methotrexate 15mg', 'Prednisone 5mg'], alerts: 1 },
  { id: 'p5', name: 'David Kim', age: 71, condition: 'COPD, Diabetes', riskScore: 81, riskLevel: 'critical', adherence: 52, lastSeen: '2026-07-21', meds: ['Tiotropium', 'Metformin 1000mg', 'Aspirin'], alerts: 4 },
]

const RECENT_ALERTS = [
  { id: 'a1', patient: 'Sarah Chen', type: 'critical', msg: 'Missed 3 consecutive doses of Carvedilol', time: '2 hours ago' },
  { id: 'a2', patient: 'David Kim', type: 'critical', msg: 'Blood pressure reading critically high (180/110)', time: '4 hours ago' },
  { id: 'a3', patient: 'Alex Morgan', type: 'warning', msg: 'Adherence dropped below 70% this week', time: '6 hours ago' },
  { id: 'a4', patient: 'Maria Santos', type: 'warning', msg: 'Missed morning dose of Methotrexate', time: '1 day ago' },
]

const MED_HISTORY = [
  { patient: 'Sarah Chen', med: 'Carvedilol 25mg', status: 'missed', date: '2026-07-24 08:00' },
  { patient: 'Alex Morgan', med: 'Metformin 500mg', status: 'taken', date: '2026-07-24 08:05' },
  { patient: 'David Kim', med: 'Tiotropium', status: 'missed', date: '2026-07-24 07:30' },
  { patient: 'Maria Santos', med: 'Prednisone 5mg', status: 'taken', date: '2026-07-24 09:00' },
  { patient: 'James Patel', med: 'Budesonide', status: 'taken', date: '2026-07-23 21:00' },
  { patient: 'Sarah Chen', med: 'Furosemide 40mg', status: 'missed', date: '2026-07-23 12:00' },
]

// SVG Risk Bar Chart
function RiskChart({ patients }) {
  const maxScore = 100
  const barW = 36
  const chartH = 140
  const gap = 16
  const totalW = patients.length * (barW + gap) - gap + 40

  return (
    <svg width="100%" viewBox={`0 0 ${totalW} ${chartH + 40}`} style={{ overflow: 'visible' }}>
      {/* Gridlines */}
      {[25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={0} y1={chartH - (v / maxScore) * chartH} x2={totalW} y2={chartH - (v / maxScore) * chartH}
            stroke="rgba(42,255,222,0.06)" strokeWidth={1} strokeDasharray="4 4" />
          <text x={-4} y={chartH - (v / maxScore) * chartH + 4} textAnchor="end"
            fontSize="9" fill="rgba(139,175,196,0.6)">{v}</text>
        </g>
      ))}
      {patients.map((p, i) => {
        const x = i * (barW + gap) + 20
        const barH = (p.riskScore / maxScore) * chartH
        const y = chartH - barH
        const color = p.riskLevel === 'critical' ? '#ff3d5a' : p.riskLevel === 'high' ? '#ff3d5a' : p.riskLevel === 'moderate' ? '#ffb547' : '#00e676'
        return (
          <g key={p.id}>
            {/* Bar background */}
            <rect x={x} y={0} width={barW} height={chartH} rx={4} fill="rgba(42,255,222,0.04)" />
            {/* Bar fill */}
            <rect x={x} y={y} width={barW} height={barH} rx={4}
              fill={color} fillOpacity={0.8}
              style={{ filter: `drop-shadow(0 0 4px ${color})` }}
            />
            {/* Score label */}
            <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{p.riskScore}</text>
            {/* Patient name */}
            <text x={x + barW / 2} y={chartH + 16} textAnchor="middle" fontSize="8.5" fill="rgba(139,175,196,0.8)"
              style={{ fontSize: '8.5px' }}>
              {p.name.split(' ')[0]}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function DoctorDashboard() {
  const [selected, setSelected] = useState(DEMO_PATIENTS[1]) // Default: high risk patient
  const highRisk = DEMO_PATIENTS.filter(p => p.riskLevel === 'high' || p.riskLevel === 'critical')

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Stethoscope size={28} color="var(--neon)" />
            Doctor Dashboard
          </h1>
          <p className="page-subtitle">Patient monitoring & clinical insights — {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
        <Badge variant="neon" dot>
          <span className="live-dot" style={{ width: 6, height: 6 }} />
          Live Monitoring
        </Badge>
      </header>

      {/* Stats */}
      <div className="stat-grid">
        <StatCard icon={<Users size={20} />} value={DEMO_PATIENTS.length} label="Total Patients" color="neon" delay={0} />
        <StatCard icon={<AlertTriangle size={20} />} value={highRisk.length} label="High Risk Patients" color="danger" delay={100} />
        <StatCard icon={<Bell size={20} />} value={RECENT_ALERTS.length} label="Active Alerts" color="warning" delay={200} />
        <StatCard icon={<TrendingUp size={20} />} value="68%" label="Avg. Adherence" color="purple" delay={300} />
      </div>

      <div className="two-col" style={{ marginBottom: '1.5rem' }}>
        {/* High Risk Patients */}
        <GlassCard danger>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={16} color="var(--danger)" />
                <span className="card-title">High Risk Patients</span>
              </div>
              <Badge variant="danger">{highRisk.length}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {DEMO_PATIENTS.map(p => (
                <div key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.875rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                    border: selected?.id === p.id ? '1px solid rgba(42,255,222,0.3)' : '1px solid var(--border-subtle)',
                    background: selected?.id === p.id ? 'rgba(42,255,222,0.06)' : 'rgba(42,255,222,0.02)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'linear-gradient(135deg, var(--neon), #00b4d8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: 700, fontSize: '0.8rem', color: '#020b12', flexShrink: 0,
                  }}>
                    {p.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Age {p.age} · Adherence {p.adherence}%</div>
                  </div>
                  <Badge variant={p.riskLevel === 'critical' ? 'danger' : p.riskLevel === 'high' ? 'danger' : p.riskLevel === 'moderate' ? 'warning' : 'success'}>
                    {p.riskScore}
                  </Badge>
                  <ChevronRight size={14} color="var(--text-muted)" />
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Patient Details */}
        <GlassCard glow>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Eye size={16} color="var(--neon)" />
                <span className="card-title">Patient Details</span>
              </div>
            </div>
            {selected && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', padding: '1rem', background: 'rgba(42,255,222,0.04)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--neon), #00b4d8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem', color: '#020b12', flexShrink: 0 }}>
                    {selected.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '1rem' }}>{selected.name}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Age {selected.age} · Last seen {selected.lastSeen}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>{selected.condition}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '1.25rem' }}>
                  <RiskMeter score={selected.riskScore} level={selected.riskLevel} size={120} />
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '0.875rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.375rem' }}>
                        <span>Adherence</span>
                        <span style={{ color: selected.adherence > 70 ? 'var(--success)' : 'var(--danger)' }}>{selected.adherence}%</span>
                      </div>
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${selected.adherence}%`, background: selected.adherence > 70 ? 'linear-gradient(90deg, var(--success), #00b4d8)' : 'linear-gradient(90deg, var(--danger), var(--warning))' }} />
                      </div>
                    </div>
                    {selected.alerts > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'rgba(255,61,90,0.08)', borderRadius: 6, border: '1px solid rgba(255,61,90,0.2)', fontSize: '0.8rem', color: 'var(--danger)' }}>
                        <Bell size={12} />
                        {selected.alerts} active alert{selected.alerts > 1 ? 's' : ''}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>Current Medications</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {selected.meds.map(m => (
                      <span key={m} style={{ padding: '0.25rem 0.625rem', borderRadius: 999, background: 'rgba(42,255,222,0.06)', border: '1px solid rgba(42,255,222,0.15)', fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                        <Pill size={10} color="var(--neon)" />
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </GlassCard>
      </div>

      {/* Risk Chart */}
      <GlassCard glow style={{ marginBottom: '1.5rem' }}>
        <div style={{ padding: '1.5rem' }}>
          <div className="card-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <BarChart3 size={16} color="var(--neon)" />
              <span className="card-title">Patient Risk Overview</span>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Risk score 0–100</span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <RiskChart patients={DEMO_PATIENTS} />
          </div>
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {[['critical', '#ff3d5a', 'Critical (75+)'], ['high', '#ff7043', 'High (55-74)'], ['moderate', '#ffb547', 'Moderate (35-54)'], ['low', '#00e676', 'Low (<35)']].map(([k, c, l]) => (
              <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: c }} />
                {l}
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="two-col">
        {/* Recent Alerts */}
        <GlassCard>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bell size={16} color="var(--warning)" />
                <span className="card-title">Recent Alerts</span>
              </div>
              <Badge variant="warning">{RECENT_ALERTS.length}</Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {RECENT_ALERTS.map(a => (
                <div key={a.id} className={`alert-item ${a.type}`}>
                  <div className="alert-icon">
                    <AlertTriangle size={15} color={a.type === 'critical' ? 'var(--danger)' : 'var(--warning)'} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{a.patient}</div>
                    <div className="alert-msg" style={{ fontSize: '0.8rem' }}>{a.msg}</div>
                    <div className="alert-time">{a.time}</div>
                  </div>
                  <Badge variant={a.type === 'critical' ? 'danger' : 'warning'}>{a.type}</Badge>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Medication History */}
        <GlassCard>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Activity size={16} color="var(--purple)" />
                <span className="card-title">Medication History</span>
              </div>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Medication</th>
                    <th>Status</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  {MED_HISTORY.map((h, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 500, fontSize: '0.8rem' }}>{h.patient}</td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{h.med}</td>
                      <td>
                        <Badge variant={h.status === 'taken' ? 'success' : 'danger'}>{h.status}</Badge>
                      </td>
                      <td style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{h.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
