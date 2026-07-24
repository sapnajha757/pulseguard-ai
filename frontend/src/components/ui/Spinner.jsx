// Spinner — Neon loading spinner
export default function Spinner({ size = 'md', label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
      <div className={`spinner ${size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : ''}`} />
      {label && <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>{label}</span>}
    </div>
  )
}
