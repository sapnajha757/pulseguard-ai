import React from 'react';
import { Calendar, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

type CalendarDay = {
  dateNumber: number;
  dayName: string;
  status: 'taken' | 'delayed' | 'missed' | 'emergency' | 'none';
};

type Props = {
  days?: CalendarDay[];
};

const defaultDays: CalendarDay[] = [
  { dateNumber: 18, dayName: 'Sat', status: 'taken' },
  { dateNumber: 19, dayName: 'Sun', status: 'taken' },
  { dateNumber: 20, dayName: 'Mon', status: 'delayed' },
  { dateNumber: 21, dayName: 'Tue', status: 'taken' },
  { dateNumber: 22, dayName: 'Wed', status: 'missed' },
  { dateNumber: 23, dayName: 'Thu', status: 'emergency' },
  { dateNumber: 24, dayName: 'Fri', status: 'taken' },
];

export default function AdherenceCalendar({ days = defaultDays }: Props) {
  const getDayStyle = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300';
      case 'delayed':
        return 'bg-amber-500/20 border-amber-500/40 text-amber-300';
      case 'missed':
        return 'bg-rose-500/20 border-rose-500/40 text-rose-300';
      case 'emergency':
        return 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300';
      default:
        return 'bg-white/5 border-white/10 text-slate-400';
    }
  };

  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-cyan-400" />
          <h3 className="font-display text-base font-semibold text-white">Monthly Adherence Tracker</h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-400" /> Taken</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Delayed</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-rose-400" /> Missed</span>
          <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-400" /> Emergency</span>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2.5">
        {days.map((d, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center rounded-xl border p-3 transition ${getDayStyle(d.status)}`}
          >
            <span className="text-[10px] uppercase opacity-70">{d.dayName}</span>
            <span className="font-display text-lg font-bold my-0.5">{d.dateNumber}</span>
            <span className="text-[9px] uppercase tracking-wider font-semibold opacity-90">{d.status}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
