import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import NeonButton from '../components/ui/NeonButton'
import {
  User, Mail, Phone, Shield, Stethoscope, Users, Heart,
  Activity, CheckCircle, Pill, Bell, Edit3, Save, X, LogOut
} from 'lucide-react'

function getRoleIcon(role) {
  if (role === 'doctor') return <Stethoscope size={16} />
  if (role === 'family') return <Users size={16} />
  return <Shield size={16} />
}
function getRoleVariant(role) {
  return { doctor: 'purple', family: 'neon', patient: 'success' }[role] || 'neutral'
}

const PROFILE_STATS = {
  patient: [
    { label: 'Active Medicines', value: '2', icon: Pill, color: 'neon' },
    { label: 'Adherence Rate', value: '78%', icon: CheckCircle, color: 'success' },
    { label: 'Risk Score', value: '68', icon: Activity, color: 'warning' },
    { label: 'Open Alerts', value: '1', icon: Bell, color: 'danger' },
  ],
  doctor: [
    { label: 'Patients', value: '5', icon: Users, color: 'neon' },
    { label: 'Active Alerts', value: '9', icon: Bell, color: 'danger' },
    { label: 'Avg Adherence', value: '68%', icon: CheckCircle, color: 'success' },
    { label: 'Critical Cases', value: '2', icon: Activity, color: 'danger' },
  ],
  family: [
    { label: 'Monitoring', value: '1', icon: Heart, color: 'neon' },
    { label: 'Missed Doses', value: '3', icon: Pill, color: 'danger' },
    { label: 'Alerts Today', value: '2', icon: Bell, color: 'warning' },
    { label: 'Adherence', value: '78%', icon: CheckCircle, color: 'success' },
  ],
}

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name: user?.name || 'Alex Morgan',
    email: user?.email || 'alex@example.com',
    phone: user?.phone || '+1 555-0100',
  })

  const role = user?.role || 'patient'
  const stats = PROFILE_STATS[role] || PROFILE_STATS.patient
  const initials = form.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title">Profile</h1>
          <p className="page-subtitle">Manage your account and preferences</p>
        </div>
        <NeonButton variant="danger" onClick={handleLogout}>
          <LogOut size={15} />
          Sign Out
        </NeonButton>
      </header>

      {/* Profile Card */}
      <GlassCard glow style={{ marginBottom: '1.5rem' }}>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 90, height: 90, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--neon), #00b4d8)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2rem', fontWeight: 800, color: '#020b12',
                boxShadow: '0 0 30px rgba(42,255,222,0.35)',
                border: '3px solid rgba(42,255,222,0.3)',
              }}>
                {initials}
              </div>
              <div style={{
                position: 'absolute', bottom: 2, right: 2,
                width: 22, height: 22, borderRadius: '50%',
                background: 'var(--success)',
                border: '2px solid var(--bg-primary)',
                boxShadow: '0 0 8px var(--success-glow)',
              }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {editing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {[
                    { key: 'name', label: 'Full Name', icon: User },
                    { key: 'email', label: 'Email', icon: Mail },
                    { key: 'phone', label: 'Phone', icon: Phone },
                  ].map(f => (
                    <label key={f.key}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', marginBottom: '0.25rem' }}>
                        <f.icon size={12} />
                        {f.label}
                      </span>
                      <input value={form[f.key]} onChange={e => setForm(p => ({ ...p, [f.key]: e.target.value }))} style={{ fontSize: '0.9rem' }} />
                    </label>
                  ))}
                  <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.25rem' }}>
                    <NeonButton solid size="sm" onClick={() => setEditing(false)}>
                      <Save size={14} />
                      Save Changes
                    </NeonButton>
                    <NeonButton variant="ghost" size="sm" onClick={() => setEditing(false)}>
                      <X size={14} />
                      Cancel
                    </NeonButton>
                  </div>
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700 }}>{form.name}</h2>
                    <Badge variant={getRoleVariant(role)}>
                      {getRoleIcon(role)}
                      {role.charAt(0).toUpperCase() + role.slice(1)}
                    </Badge>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    {[
                      { icon: Mail, value: form.email, color: 'var(--text-secondary)' },
                      { icon: Phone, value: form.phone, color: 'var(--text-secondary)' },
                    ].map(item => (
                      <div key={item.value} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: item.color, fontSize: '0.875rem' }}>
                        <item.icon size={14} color="var(--neon)" />
                        {item.value}
                      </div>
                    ))}
                  </div>
                  <NeonButton size="sm" onClick={() => setEditing(true)}>
                    <Edit3 size={13} />
                    Edit Profile
                  </NeonButton>
                </>
              )}
            </div>

            {/* Security info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: 200 }}>
              <div style={{ padding: '0.875rem 1rem', background: 'rgba(42,255,222,0.04)', borderRadius: 10, border: '1px solid var(--border-subtle)' }}>
                <div style={{ fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>Account Security</div>
                {[
                  { label: 'Two-Factor Auth', status: 'Enabled', color: 'var(--success)' },
                  { label: 'Data Encryption', status: '256-bit', color: 'var(--neon)' },
                  { label: 'Blockchain ID', status: 'Verified', color: 'var(--purple)' },
                ].map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.label}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: s.color }}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Health Stats */}
      <div style={{ marginBottom: '1rem' }}>
        <div className="section-title">Health Overview</div>
        <div className="stat-grid">
          {stats.map((s, i) => (
            <GlassCard key={s.label} glow style={{ padding: '1.25rem', animationDelay: `${i * 80}ms` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.875rem' }}>
                <div style={{ width: 36, height: 36, borderRadius: 8, background: `${s.color === 'neon' ? 'rgba(42,255,222,0.12)' : s.color === 'success' ? 'rgba(0,230,118,0.12)' : s.color === 'danger' ? 'rgba(255,61,90,0.12)' : 'rgba(255,181,71,0.12)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <s.icon size={17} color={`var(--${s.color})`} />
                </div>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: `var(--${s.color})`, lineHeight: 1, marginBottom: '0.25rem' }}>{s.value}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{s.label}</div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Settings / Info */}
      <div className="two-col">
        <GlassCard>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <span className="card-title">Notification Preferences</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
              {[
                { label: 'Missed dose alerts', enabled: true },
                { label: 'Emergency notifications', enabled: true },
                { label: 'Weekly health reports', enabled: true },
                { label: 'Risk score updates', enabled: false },
                { label: 'Doctor messages', enabled: true },
              ].map(pref => (
                <div key={pref.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.625rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{pref.label}</span>
                  <div style={{
                    width: 40, height: 22, borderRadius: 999,
                    background: pref.enabled ? 'var(--neon)' : 'var(--border-subtle)',
                    position: 'relative', cursor: 'pointer',
                    boxShadow: pref.enabled ? '0 0 8px rgba(42,255,222,0.4)' : 'none',
                    transition: 'all 0.2s',
                  }}>
                    <div style={{
                      position: 'absolute', top: 3, left: pref.enabled ? 20 : 3,
                      width: 16, height: 16, borderRadius: '50%',
                      background: pref.enabled ? '#020b12' : 'var(--text-muted)',
                      transition: 'left 0.2s',
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ padding: '1.5rem' }}>
            <div className="card-header">
              <span className="card-title">Account Info</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Member since', value: 'January 2026' },
                { label: 'Plan', value: 'Pro Healthcare' },
                { label: 'Data storage', value: '2.4 GB / 10 GB' },
                { label: 'Last login', value: 'Today at 2:04 PM' },
                { label: 'Account ID', value: '#PG-20260001' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{item.label}</span>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <NeonButton size="sm" block>Export Health Data</NeonButton>
              <NeonButton size="sm" variant="danger" block>Delete Account</NeonButton>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
