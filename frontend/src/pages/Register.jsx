import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Activity, Shield, Stethoscope, Users, ArrowRight, Lock } from 'lucide-react'

const roles = [
  { value: 'patient', label: 'Patient' },
  { value: 'doctor', label: 'Doctor' },
  { value: 'family', label: 'Family' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('patient')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await register({ name, email, password, role })
      const dest = role === 'doctor' ? '/dashboard/doctor'
        : role === 'family' ? '/dashboard/family'
        : '/dashboard/patient'
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-grid-bg" />

      <div className="auth-card glass-card" style={{ maxWidth: 460 }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--neon), #00b4d8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.25rem',
            boxShadow: '0 0 30px rgba(42,255,222,0.35)',
          }}>
            <Activity size={28} color="#020b12" strokeWidth={2.5} />
          </div>
          <h1 style={{ fontSize: '1.625rem', marginBottom: '0.375rem', color: 'var(--text-primary)' }}>
            Create Account
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Join <span style={{ color: 'var(--neon)' }}>PulseGuard AI</span> today
          </p>
        </div>

        {error && (
          <div style={{
            padding: '0.75rem 1rem', marginBottom: '1rem',
            background: 'rgba(255,61,90,0.08)', border: '1px solid rgba(255,61,90,0.25)',
            borderRadius: 'var(--radius-sm)', color: 'var(--danger)', fontSize: '0.875rem',
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Full Name
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              placeholder="Alex Morgan"
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Email Address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Password
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Account Role
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor / Physician</option>
              <option value="family">Family Caregiver</option>
            </select>
          </label>

          <button
            type="submit"
            className="btn-neon solid block"
            disabled={loading}
            style={{ marginTop: '0.5rem', padding: '0.75rem', fontSize: '0.95rem' }}
          >
            {loading ? 'Creating Account...' : 'Get Started Free'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--neon)', fontWeight: 600 }}>Sign in</Link>
        </div>
      </div>
    </div>
  )
}
