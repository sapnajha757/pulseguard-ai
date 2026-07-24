import React from 'react';
import Badge from '@/components/ui/Badge';
import { Pill } from 'lucide-react';

interface Medicine {
  _id: string;
  name: string;
  dose: string;
  frequency: string;
  time: string;
  status: 'taken' | 'pending' | 'missed';
}

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  const statusTone = {
    taken: 'neon',
    pending: 'warning',
    missed: 'danger',
  }[medicine.status];

  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10 border border-neon/20">
          <Pill size={18} className="text-neon" />
        </div>
        <div>
          <p className="text-sm font-medium text-white">{medicine.name}</p>
          <p className="text-xs text-slate-500">{medicine.dose}</p>
          <p className="text-xs text-slate-500">{medicine.frequency}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
          <span>{medicine.time}</span>
        </span>
        <Badge tone={statusTone as any}>{medicine.status.toUpperCase()}</Badge>
      </div>
    </div>
  );
}
