// GlassCard — Glassmorphism card component
export default function GlassCard({ children, className = '', glow = false, danger = false, onClick, style }) {
  const classes = [
    'glass-card',
    glow ? 'glow' : '',
    danger ? 'danger-glow' : '',
    onClick ? 'cursor-pointer' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div className={classes} onClick={onClick} style={style}>
      {children}
    </div>
  )
}
