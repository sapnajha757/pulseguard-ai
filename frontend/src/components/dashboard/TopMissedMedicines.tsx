import React from 'react';
import { Pill, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

type MissedMedicine = {
  name: string;
  missedCount: number;
};

type Props = {
  medicines?: MissedMedicine[];
};

export default function TopMissedMedicines({
  medicines = [
    { name: 'Insulin Injection', missedCount: 12 },
    { name: 'BP Tablet', missedCount: 7 },
    { name: 'Statin', missedCount: 4 },
  ],
}: Props) {
  const list = Array.isArray(medicines) ? medicines : [];
  return (
    <GlassCard glow="danger" scan className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={18} className="text-rose-400" />
        <h3 className="font-display text-base font-semibold text-white">Top Missed Medications</h3>
      </div>
      <div className="space-y-3.5">
        {list.map((m, idx) => (
          <div key={idx} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
                <Pill size={16} />
              </div>
              <span className="text-sm font-medium text-white">{m.name}</span>
            </div>
            <span className="font-mono text-xs font-bold text-rose-400 border border-rose-500/30 bg-rose-500/10 rounded-lg px-2.5 py-1">
              Missed {m.missedCount} times
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
