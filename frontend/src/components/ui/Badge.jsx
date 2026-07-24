// Badge — Status badge with neon-tinted variants
export default function Badge({ children, variant = 'neon', dot = false }) {
  const variantMap = {
    neon: 'badge-neon',
    success: 'badge-success',
    warning: 'badge-warning',
    danger: 'badge-danger',
    purple: 'badge-purple',
    neutral: 'badge-neutral',
  }

  return (
    <span className={`badge ${variantMap[variant] || 'badge-neutral'}`}>
      {dot && <span className={`live-dot ${variant === 'danger' ? 'danger' : ''}`} style={{ width: 6, height: 6 }} />}
      {children}
    </span>
  )
}
