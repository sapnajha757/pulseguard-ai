// RiskMeter — Animated SVG arc risk score display
export default function RiskMeter({ score = 0, level = 'low', size = 160 }) {
  const colorMap = {
    low: '#00e676',
    moderate: '#ffb547',
    high: '#ff3d5a',
    critical: '#ff3d5a',
  }
  const color = colorMap[level] || '#2affde'
  const r = 60
  const cx = size / 2
  const cy = size / 2
  const strokeWidth = 10
  const circumference = Math.PI * r // half circle
  const progress = (score / 100) * circumference

  return (
    <div className="risk-meter-wrap">
      <svg width={size} height={size / 2 + 20} viewBox={`0 0 ${size} ${size / 2 + 20}`}>
        {/* Track */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke="rgba(42,255,222,0.1)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Fill */}
        <path
          d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${progress} ${circumference}`}
          style={{
            filter: `drop-shadow(0 0 6px ${color})`,
            transition: 'stroke-dasharray 1s ease',
          }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          fill={color}
          fontSize={size * 0.22}
          fontWeight="800"
          fontFamily="'Space Grotesk', sans-serif"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 16}
          textAnchor="middle"
          fill="rgba(139,175,196,0.8)"
          fontSize={size * 0.1}
          fontFamily="'Inter', sans-serif"
          textTransform="uppercase"
          letterSpacing="2"
        >
          {level.toUpperCase()}
        </text>
      </svg>
    </div>
  )
}
