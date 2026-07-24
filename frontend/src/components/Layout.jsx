import { useState } from 'react'
import { NavLink, Outlet, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  Activity, LayoutDashboard, Pill, BarChart3, Bell, User,
  LogOut, Menu, X, Shield, Stethoscope, Users, Heart
} from 'lucide-react'

function getNavItems(role) {
  const common = [
    { to: '/abha', label: 'ABHA Link', icon: Shield },
    { to: '/profile', label: 'Profile', icon: User },
  ]
  if (role === 'doctor') {
    return [
      { to: '/dashboard/doctor', label: 'Dashboard', icon: LayoutDashboard },
      { to: '/medicines', label: 'Medicines', icon: Pill },
      { to: '/risk', label: 'Risk Analysis', icon: BarChart3 },
      { to: '/alerts', label: 'Alerts', icon: Bell },
      ...common,
    ]
  }
  if (role === 'family') {
    return [
      { to: '/dashboard/family', label: 'Family Hub', icon: Users },
      { to: '/alerts', label: 'Alerts', icon: Bell },
      ...common,
    ]
  }
  // default patient
  return [
    { to: '/dashboard/patient', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/medicines', label: 'Medicines', icon: Pill },
    { to: '/risk', label: 'Risk Score', icon: BarChart3 },
    { to: '/alerts', label: 'Alerts', icon: Bell },
    ...common,
  ]
}

function getRoleLabel(role) {
  return { patient: 'Patient', doctor: 'Doctor', family: 'Family Member' }[role] || 'Patient'
}
function getRoleIcon(role) {
  if (role === 'doctor') return <Stethoscope size={14} />
  if (role === 'family') return <Heart size={14} />
  return <Shield size={14} />
}

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const navItems = getNavItems(user?.role)

  async function handleLogout() {
    await logout()
    navigate('/login')
  }

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <div className="app-shell">
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Mobile menu button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle menu"
      >
        {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Brand */}
        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">
            <Activity size={20} strokeWidth={2.5} />
          </div>
          <div>
            <div className="sidebar-brand-name">PulseGuard</div>
            <div className="sidebar-brand-sub">AI Health Monitor</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section-label">Navigation</div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">
                <item.icon size={16} />
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="user-avatar">{initials}</div>
            <div style={{ minWidth: 0 }}>
              <div className="user-chip-name" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.name || 'User'}
              </div>
              <div className="user-chip-role" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                {getRoleIcon(user?.role)}
                {getRoleLabel(user?.role)}
              </div>
            </div>
          </div>
          <button type="button" className="btn-neon ghost sm block" onClick={handleLogout}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <LogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
