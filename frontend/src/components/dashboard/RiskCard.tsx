import React from 'react';
import { AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

interface Risk {
  score?: number;
  level?: 'Low' | 'Medium' | 'High' | string;
  adherence?: number;
  recommendation?: string;
}

export default function RiskCard({ risk }: { risk: Risk }) {
  if (!risk) return null;
  const levelKey = (risk.level || 'Low').toString();
  const toneMap: Record<string, string> = {
    Low: 'neon',
    Medium: 'warning',
    High: 'danger',
  };
  const colorMap: Record<string, string> = {
    Low: '#2affde',
    Medium: '#ffb547',
    High: '#ff4d6d',
  };
  const tone = toneMap[levelKey] || 'neon';
  const color = colorMap[levelKey] || '#2affde';
  const score = typeof risk.score === 'number' ? risk.score : 0;
  const circumference = 2 * Math.PI * 52;
  const offset = circumference - (score / 100) * circumference;

  return (
    <GlassCard glow={tone === 'neon' ? 'neon' : tone === 'warning' ? 'accent' : 'danger'} scan className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-neon" />
          <h3 className="font-display text-base font-semibold text-white">AI Risk Assessment</h3>
        </div>
        <Badge tone={tone as any}>{levelKey.toUpperCase()} RISK</Badge>
      </div>
      <div className="mt-6 flex items-center gap-6">
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
          <div className="text-sm text-white">Adherence: {risk.adherence ?? 100}%</div>
          <p className="text-sm text-slate-300">{risk.recommendation || 'Maintain your current medication schedule.'}</p>
        </div>
      </div>
    </GlassCard>
  );
}
