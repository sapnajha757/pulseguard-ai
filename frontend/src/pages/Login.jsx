import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { Activity, Eye, EyeOff, Shield, Stethoscope, Users, ArrowRight, Lock } from 'lucide-react'

const roles = [
  { value: 'patient', label: 'Patient', icon: Shield, desc: 'Monitor your health & medications' },
  { value: 'doctor', label: 'Doctor', icon: Stethoscope, desc: 'Manage patients & view insights' },
  { value: 'family', label: 'Family', icon: Users, desc: 'Stay updated on your loved ones' },
]

export default function Login() {
  const { login, isAuthenticated, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('alex@example.com')
  const [password, setPassword] = useState('password123')
  const [role, setRole] = useState('patient')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    const dest = user?.role === 'doctor' ? '/dashboard/doctor'
      : user?.role === 'family' ? '/dashboard/family'
      : '/dashboard/patient'
    return <Navigate to={dest} replace />
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login({ email, password, role })
      const dest = role === 'doctor' ? '/dashboard/doctor'
        : role === 'family' ? '/dashboard/family'
        : '/dashboard/patient'
      navigate(dest, { replace: true })
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-grid-bg" />

      <div className="auth-card glass-card" style={{ maxWidth: 460 }}>
        {/* Header */}
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
            Welcome back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Sign in to <span style={{ color: 'var(--neon)' }}>PulseGuard AI</span>
          </p>
        </div>

        {/* Role selector */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: '0.625rem' }}>
            Sign in as
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
            {roles.map(r => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                style={{
                  padding: '0.75rem 0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  border: role === r.value ? '1px solid var(--neon)' : '1px solid var(--border-subtle)',
                  background: role === r.value ? 'rgba(42,255,222,0.08)' : 'rgba(42,255,222,0.02)',
                  color: role === r.value ? 'var(--neon)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.375rem',
                  transition: 'all 0.2s',
                  boxShadow: role === r.value ? '0 0 12px rgba(42,255,222,0.15)' : 'none',
                }}
              >
                <r.icon size={18} />
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{r.label}</span>
              </button>
            ))}
          </div>
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
            Email Address
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{ fontSize: '0.9rem', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}
              placeholder="you@example.com"
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)' }}>
            Password
            <div style={{ position: 'relative' }}>
              <input
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                style={{ width: '100%', paddingRight: '2.75rem', fontSize: '0.9rem', fontWeight: 400, textTransform: 'none', letterSpacing: 'normal' }}
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </label>

          <button
            type="submit"
            className="btn-neon solid block"
            disabled={loading}
            style={{ marginTop: '0.25rem', padding: '0.75rem', fontSize: '0.95rem', position: 'relative', overflow: 'hidden' }}
          >
            {loading ? (
              <>
                <div className="spinner sm" style={{ borderTopColor: '#020b12', borderColor: 'rgba(2,11,18,0.3)' }} />
                Signing in...
              </>
            ) : (
              <>
                <Lock size={16} />
                Sign In Securely
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          No account?{' '}
          <Link to="/register" style={{ color: 'var(--neon)', fontWeight: 600 }}>Create one free</Link>
        </div>

        {/* Demo note */}
        <div style={{
          marginTop: '1.25rem', padding: '0.875rem',
          background: 'rgba(42,255,222,0.05)', border: '1px solid rgba(42,255,222,0.15)',
          borderRadius: 'var(--radius-sm)',
        }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--neon)', marginBottom: '0.375rem' }}>
            Demo Mode
          </div>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
            Any credentials work. Select your role above — patient, doctor, or family member — and sign in to explore the full demo.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.25rem' }}>
          <Link to="/" style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
