import React from 'react';
import { TrendingUp, Calendar, ShieldAlert } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type Props = {
  next7Days?: string;
  next30Days?: string;
};

export default function FutureRiskCard({ next7Days, next30Days }: Props) {
  const getBadgeTone = (risk: string) => {
    if (!risk) return 'neutral' as const;
    if (risk === 'HIGH') return 'danger' as const;
    if (risk === 'MEDIUM') return 'warning' as const;
    return 'neon' as const;
  };

  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={18} className="text-indigo-400" />
        <h3 className="font-display text-base font-semibold text-white">AI Predictive Risk Forecast</h3>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Calendar size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">7-Day Predictive Risk</p>
              <p className="text-sm font-semibold text-white">Short-term Outlook</p>
            </div>
          </div>
          <Badge tone={getBadgeTone(next7Days || '')}>{next7Days || 'N/A'}</Badge>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <ShieldAlert size={18} />
            </div>
            <div>
              <p className="text-xs text-slate-400">30-Day Predictive Risk</p>
              <p className="text-sm font-semibold text-white">Long-term Trajectory</p>
            </div>
          </div>
          <Badge tone={getBadgeTone(next30Days || '')}>{next30Days || 'N/A'}</Badge>
        </div>
      </div>
    </GlassCard>
  );
}
