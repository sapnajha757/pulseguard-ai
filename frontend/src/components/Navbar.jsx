import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Activity, Shield, Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'rgba(2, 11, 18, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(42,255,222,0.08)',
    }}>
      {/* Brand */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #2affde, #00b4d8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 16px rgba(42,255,222,0.4)',
        }}>
          <Activity size={18} color="#020b12" strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
          PulseGuard <span style={{ color: 'var(--neon)' }}>AI</span>
        </span>
      </Link>

      {/* Desktop nav */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
        <Link to="/#features" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = 'var(--neon)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
          Features
        </Link>
        <Link to="/#about" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = 'var(--neon)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
          About
        </Link>
        <Link to="/#how-it-works" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textDecoration: 'none', transition: 'color 0.2s' }}
          onMouseEnter={e => e.target.style.color = 'var(--neon)'}
          onMouseLeave={e => e.target.style.color = 'var(--text-secondary)'}>
          How it Works
        </Link>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <Link to="/login" className="btn-neon ghost sm" style={{ textDecoration: 'none' }}>
          Sign In
        </Link>
        <Link to="/login" className="btn-neon solid sm" style={{ textDecoration: 'none' }}>
          <Shield size={14} />
          Get Started
        </Link>
      </div>
    </nav>
  )
}
