import React from 'react';
import { Pill, CheckCircle2, XCircle, Clock, AlertTriangle, FastForward } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type MedicineItem = {
  id: string;
  name: string;
  time: string;
  priority: string;
  status: 'upcoming' | 'taken' | 'missed' | 'delayed' | 'skipped';
};

type Props = {
  medicines?: MedicineItem[];
  onLogAction?: (medicineId: string, status: 'TAKEN' | 'DELAYED' | 'SKIPPED') => void;
};

export default function TodaysMedicines({ medicines, onLogAction }: Props) {
  if (!medicines || medicines.length === 0) {
    return null; // Hide medication dashboard schedule if none are set
  }
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'missed':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'delayed':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'skipped':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30';
    }
  };

  const renderIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle2 size={14} />;
      case 'missed':
        return <XCircle size={14} />;
      case 'delayed':
        return <Clock size={14} />;
      case 'skipped':
        return <FastForward size={14} />;
      default:
        return <Pill size={14} />;
    }
  };

  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Pill size={18} className="text-neon" />
          <h3 className="font-display text-base font-semibold text-white">Today's Medication Schedule</h3>
        </div>
        <Badge tone="neon">{medicines.filter(m => m.status === 'taken').length} / {medicines.length} Completed</Badge>
      </div>

      <div className="space-y-3">
        {medicines.map((m) => (
          <div
            key={m.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:bg-white/[0.05]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                <Pill size={18} className="text-slate-300" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">{m.name}</p>
                <p className="text-xs text-slate-400">Scheduled for {m.time} · Priority: <strong className="text-slate-200">{m.priority}</strong></p>
              </div>
            </div>

            <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-3">
              <span className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium uppercase ${getBadgeStyle(m.status)}`}>
                {renderIcon(m.status)}
                {m.status}
              </span>
              {m.status === 'upcoming' && onLogAction && (
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onLogAction(m.id, 'TAKEN')}
                    className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 text-xs font-semibold text-emerald-400 hover:bg-emerald-500/30"
                  >
                    Take
                  </button>
                  <button
                    onClick={() => onLogAction(m.id, 'DELAYED')}
                    className="rounded-lg bg-amber-500/20 border border-amber-500/30 px-2.5 py-1 text-xs font-semibold text-amber-400 hover:bg-amber-500/30"
                  >
                    Delay
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
