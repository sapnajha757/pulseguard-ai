import React from 'react';
import { AlertTriangle, Heart, ShieldCheck, ChevronRight } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

type Patient = {
  _id: string;
  name: string;
  age: number;
  condition: string;
  riskScore: number;
  complianceScore: number;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  status: string;
  lastVisit: string;
};

type Props = {
  patient: Patient;
  onClick?: () => void;
};

export default function PatientRiskCard({ patient, onClick }: Props) {
  const getBadgeTone = (level: string) => {
    if (level === 'HIGH') return 'danger' as const;
    if (level === 'MEDIUM') return 'warning' as const;
    return 'neon' as const;
  };

  return (
    <GlassCard
      glow={patient.riskLevel === 'HIGH' ? 'danger' : 'neon'}
      scan
      className="p-4 flex items-center justify-between transition hover:bg-white/[0.04] cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-neon/20 to-accent/20 border border-white/10 font-display text-sm font-semibold text-white">
          {patient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <h4 className="text-sm font-medium text-white">{patient.name}</h4>
          <p className="text-xs text-slate-400">
            {patient.age} yrs · {patient.condition || patient.medicalConditions?.join(', ')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Risk Score</p>
          <p className="font-display text-lg font-bold text-white">{patient.riskScore}</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Adherence</p>
          <p className="font-display text-lg font-bold text-white">{patient.complianceScore}%</p>
        </div>
        <Badge tone={getBadgeTone(patient.riskLevel)}>{patient.riskLevel}</Badge>
        <ChevronRight size={16} className="text-slate-400" />
      </div>
    </GlassCard>
  );
}
