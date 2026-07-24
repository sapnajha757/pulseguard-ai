import { BrainCircuit, ShieldCheck, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type Props = {
  score: number;
  level: 'Low' | 'Moderate' | 'High';
  factors: { label: string; impact: number }[];
};

const levelTone = {
  Low: 'neon' as const,
  Moderate: 'warning' as const,
  High: 'danger' as const,
};

const levelColor = {
  Low: '#2affde',
  Moderate: '#ffb547',
  High: '#ff4d6d',
};

export default function AiRiskCard({ score, level, factors }: Props) {
  const tone = levelTone[level];
  const color = levelColor[level];
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <GlassCard glow={tone === 'neon' ? 'neon' : tone === 'warning' ? 'accent' : 'danger'} scan className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <BrainCircuit size={18} className="text-neon" />
          <h3 className="font-display text-base font-semibold text-white">AI Risk Assessment</h3>
        </div>
        <Badge tone={tone}>
          {level === 'High' ? <AlertTriangle size={12} /> : <ShieldCheck size={12} />}
          {level} risk
        </Badge>
      </div>

      <div className="mt-6 flex items-center gap-6">
        {/* circular gauge */}
        <div className="relative h-32 w-32 shrink-0">
          <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s ease', filter: `drop-shadow(0 0 6px ${color}80)` }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-3xl font-semibold text-white">{score}</span>
            <span className="text-xs text-slate-500">risk score</span>
          </div>
        </div>

        <div className="flex-1 space-y-3">
          {factors.map((f) => (
            <div key={f.label}>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">{f.label}</span>
                <span className="font-mono text-slate-300">{f.impact}%</span>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full bg-neon"
                  style={{ width: `${f.impact}%`, opacity: 0.7 + f.impact / 200 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-neon">AI Recommendation</p>
        <p className="mt-1.5 text-sm text-slate-300">
          {level === 'Low'
            ? 'Vitals are stable. Maintain your medication schedule and daily activity.'
            : level === 'Moderate'
            ? 'Slight elevation detected. Consider a follow-up with your clinician this week.'
            : 'Elevated risk. Immediate clinician review and reduced physical exertion advised.'}
        </p>
      </div>
    </GlassCard>
  );
}
