import React from 'react';
import { Clock, Check, AlertCircle, FastForward, Bell } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type Props = {
  medicineName?: string;
  scheduledTime?: string;
  priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  onAction?: (status: 'TAKEN' | 'DELAYED' | 'SKIPPED') => void;
};

export default function MedicationReminderCard({
  medicineName = 'Insulin Injection',
  scheduledTime = '21:00',
  priority = 'CRITICAL',
  onAction,
}: Props) {
  const getBadgeTone = (p: string) => {
    if (p === 'CRITICAL') return 'danger' as const;
    if (p === 'HIGH') return 'warning' as const;
    return 'neon' as const;
  };

  return (
    <GlassCard glow={priority === 'CRITICAL' ? 'danger' : 'neon'} scan className="p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon/10 border border-neon/30 text-neon">
            <Bell size={20} className="animate-bounce" />
          </div>
          <div>
            <h4 className="font-display text-base font-semibold text-white">{medicineName}</h4>
            <p className="text-xs text-slate-400">Scheduled for <strong className="text-slate-200">{scheduledTime}</strong></p>
          </div>
        </div>
        <Badge tone={getBadgeTone(priority)}>{priority}</Badge>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <button
          onClick={() => onAction && onAction('TAKEN')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/40 bg-emerald-500/20 px-3 py-2 text-xs font-semibold text-emerald-300 transition hover:bg-emerald-500/30"
        >
          <Check size={14} /> TAKEN
        </button>
        <button
          onClick={() => onAction && onAction('DELAYED')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-amber-500/40 bg-amber-500/20 px-3 py-2 text-xs font-semibold text-amber-300 transition hover:bg-amber-500/30"
        >
          <Clock size={14} /> DELAYED
        </button>
        <button
          onClick={() => onAction && onAction('SKIPPED')}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-rose-500/40 bg-rose-500/20 px-3 py-2 text-xs font-semibold text-rose-300 transition hover:bg-rose-500/30"
        >
          <FastForward size={14} /> SKIPPED
        </button>
      </div>
    </GlassCard>
  );
}
