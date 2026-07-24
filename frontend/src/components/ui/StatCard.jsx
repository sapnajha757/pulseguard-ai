import GlassCard from './GlassCard'

// StatCard — Animated stat display with icon, value, label, trend
export default function StatCard({ icon, value, label, trend, trendUp, color = 'neon', delay = 0 }) {
  const colorMap = {
    neon: { icon: 'rgba(42,255,222,0.12)', iconColor: 'var(--neon)', value: 'var(--neon)' },
    danger: { icon: 'rgba(255,61,90,0.12)', iconColor: 'var(--danger)', value: 'var(--danger)' },
    warning: { icon: 'rgba(255,181,71,0.12)', iconColor: 'var(--warning)', value: 'var(--warning)' },
    success: { icon: 'rgba(0,230,118,0.12)', iconColor: 'var(--success)', value: 'var(--success)' },
    purple: { icon: 'rgba(168,85,247,0.12)', iconColor: 'var(--purple)', value: 'var(--purple)' },
  }
  const c = colorMap[color] || colorMap.neon

  return (
    <GlassCard glow className="stat-card" style={{ animationDelay: `${delay}ms` }}>
      {icon && (
        <div className="stat-icon" style={{ background: c.icon }}>
          <span style={{ color: c.iconColor, display: 'flex', alignItems: 'center' }}>{icon}</span>
        </div>
      )}
      <div className="stat-value" style={{ color: c.value }}>{value}</div>
      <div className="stat-label">{label}</div>
      {trend && (
        <div className="stat-trend" style={{ color: trendUp ? 'var(--success)' : 'var(--danger)' }}>
          <span>{trendUp ? '↑' : '↓'}</span>
          {trend}
        </div>
      )}
    </GlassCard>
  )
}
