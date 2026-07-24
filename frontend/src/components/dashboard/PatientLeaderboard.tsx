import React from 'react';
import { Award, ShieldAlert, Heart } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type LeaderboardItem = {
  _id: string;
  name: string;
  riskScore: number;
  complianceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
};

type Props = {
  patients: LeaderboardItem[];
  onSelect?: (id: string) => void;
};

export default function PatientLeaderboard({ patients, onSelect }: Props) {
  const getRankStyle = (index: number) => {
    if (index === 0) return 'text-rose-400 font-bold';
    if (index === 1) return 'text-amber-400 font-semibold';
    return 'text-slate-400';
  };

  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <ShieldAlert size={18} className="text-rose-400" />
        <h3 className="font-display text-base font-semibold text-white">Patient Risk Leaderboard</h3>
      </div>

      <div className="space-y-3">
        {patients.slice(0, 10).map((p, idx) => (
          <div
            key={p._id}
            onClick={() => onSelect && onSelect(p._id)}
            className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5 transition hover:bg-white/[0.05] hover:border-rose-500/20 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <span className={`text-sm w-5 text-center ${getRankStyle(idx)}`}>#{idx + 1}</span>
              <div>
                <p className="text-sm font-medium text-white">{p.name}</p>
                <p className="text-xs text-slate-400">Compliance score: {p.complianceScore}%</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-display text-base font-bold text-white">{p.riskScore} pts</span>
              <Badge tone={p.riskLevel === 'HIGH' ? 'danger' : 'warning'}>{p.riskLevel}</Badge>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
