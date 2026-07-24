import React from 'react';
import { ShieldCheck, Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type Props = {
  healthScore?: number;
  riskScore?: number;
  complianceScore?: number;
  futureRisk?: { next7Days: string; next30Days: string };
  isBlockchainVerified?: boolean;
};

export default function AIHealthScoreCard({
  healthScore,
  riskScore,
  complianceScore,
  futureRisk,
  isBlockchainVerified = false,
}: Props) {
  const getScoreColor = (score: number, inverse = false) => {
    const val = inverse ? 100 - score : score;
    if (val >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  return (
    <GlassCard glow="neon" scan className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Activity size={20} className="text-neon animate-pulse" />
          <h3 className="font-display text-base font-semibold text-white">AI Health Score & Intelligence</h3>
        </div>
        <div className="flex items-center gap-2">
          {isBlockchainVerified && (
            <Badge tone="neon">
              <CheckCircle2 size={12} className="mr-1 inline" /> Polygon Verified
            </Badge>
          )}
          <Badge tone={futureRisk?.next7Days === 'HIGH' ? 'danger' : futureRisk?.next7Days === 'MEDIUM' ? 'warning' : 'neon'}>
            7-Day Risk: {futureRisk?.next7Days || 'N/A'}
          </Badge>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${healthScore !== undefined ? getScoreColor(healthScore) : 'text-slate-400 border-white/10 bg-white/5'}`}>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">Health Score</span>
          <span className="font-display text-4xl font-bold mt-1">{healthScore !== undefined ? healthScore : '--'}</span>
          <span className="text-[10px] mt-0.5 opacity-70">Normalized Index</span>
        </div>

        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${riskScore !== undefined ? getScoreColor(riskScore, true) : 'text-slate-400 border-white/10 bg-white/5'}`}>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">Risk Score</span>
          <span className="font-display text-4xl font-bold mt-1">{riskScore !== undefined ? riskScore : '--'}</span>
          <span className="text-[10px] mt-0.5 opacity-70">Penalty Index</span>
        </div>

        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${complianceScore !== undefined ? getScoreColor(complianceScore) : 'text-slate-400 border-white/10 bg-white/5'}`}>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">Compliance Score</span>
          <span className="font-display text-4xl font-bold mt-1">{complianceScore !== undefined ? `${complianceScore}%` : '--'}</span>
          <span className="text-[10px] mt-0.5 opacity-70">Weighted Adherence</span>
        </div>
      </div>
    </GlassCard>
  );
}
