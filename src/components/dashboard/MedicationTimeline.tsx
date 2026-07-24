import React from 'react';
import { CalendarCheck, CheckCircle2, XCircle, Clock, AlertTriangle } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

type TimelineDay = {
  day: string;
  date: string;
  medicines: { name: string; status: 'taken' | 'missed' | 'delayed' | 'emergency'; type: string }[];
  riskLevel: 'Low' | 'Medium' | 'High';
  hasEmergency?: boolean;
};

type Props = {
  timeline?: TimelineDay[];
};

const defaultTimeline: TimelineDay[] = [
  {
    day: 'Monday',
    date: 'Jul 20',
    medicines: [
      { name: 'Insulin', status: 'taken', type: 'CRITICAL' },
      { name: 'BP Tablet', status: 'missed', type: 'HIGH' },
    ],
    riskLevel: 'Medium',
  },
  {
    day: 'Tuesday',
    date: 'Jul 21',
    medicines: [
      { name: 'Insulin', status: 'taken', type: 'CRITICAL' },
      { name: 'BP Tablet', status: 'taken', type: 'HIGH' },
    ],
    riskLevel: 'Low',
  },
  {
    day: 'Wednesday',
    date: 'Jul 22',
    medicines: [
      { name: 'Insulin', status: 'delayed', type: 'CRITICAL' },
      { name: 'BP Tablet', status: 'taken', type: 'HIGH' },
    ],
    riskLevel: 'Low',
  },
  {
    day: 'Thursday',
    date: 'Jul 23',
    medicines: [
      { name: 'Insulin', status: 'emergency', type: 'CRITICAL' },
      { name: 'BP Tablet', status: 'missed', type: 'HIGH' },
    ],
    riskLevel: 'High',
    hasEmergency: true,
  },
  {
    day: 'Friday',
    date: 'Jul 24',
    medicines: [
      { name: 'Insulin', status: 'taken', type: 'CRITICAL' },
      { name: 'BP Tablet', status: 'taken', type: 'HIGH' },
    ],
    riskLevel: 'Low',
  },
];

export default function MedicationTimeline({ timeline = defaultTimeline }: Props) {
  const getBadgeStyle = (status: string) => {
    switch (status) {
      case 'taken':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'missed':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/30';
      case 'delayed':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'emergency':
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const renderIcon = (status: string) => {
    switch (status) {
      case 'taken':
        return <CheckCircle2 size={13} />;
      case 'missed':
        return <XCircle size={13} />;
      case 'delayed':
        return <Clock size={13} />;
      case 'emergency':
        return <AlertTriangle size={13} />;
      default:
        return null;
    }
  };

  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <CalendarCheck size={18} className="text-cyan-400" />
        <h3 className="font-display text-base font-semibold text-white">Daily Medication & Risk Timeline</h3>
      </div>
      <div className="space-y-3">
        {timeline.map((item, idx) => (
          <div
            key={idx}
            className={`flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border p-4 transition ${
              item.riskLevel === 'High'
                ? 'border-rose-500/30 bg-rose-500/[0.04]'
                : item.riskLevel === 'Medium'
                ? 'border-amber-500/30 bg-amber-500/[0.04]'
                : 'border-white/10 bg-white/[0.03]'
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="flex flex-col">
                <span className="font-display text-sm font-semibold text-white">{item.day}</span>
                <span className="text-xs text-slate-500">{item.date}</span>
              </div>
              <div className="h-6 w-px bg-white/10 hidden sm:block" />
              <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                {item.medicines.map((m, mIdx) => (
                  <span
                    key={mIdx}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium ${getBadgeStyle(m.status)}`}
                  >
                    {renderIcon(m.status)}
                    {m.name} ({m.status})
                  </span>
                ))}
              </div>
            </div>
            <div className="mt-3 sm:mt-0 flex items-center justify-between sm:justify-end gap-3">
              <span className="text-xs text-slate-400">Risk: <strong className="text-white">{item.riskLevel}</strong></span>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
