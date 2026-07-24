import { useState } from 'react';
import {
  Pill,
  Clock,
  Check,
  CheckCircle2,
  Activity,
  HeartPulse,
  Droplet,
  Footprints,
  Bell,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader, { NotificationBell } from '@/components/layout/PageHeader';
import Panel from '@/components/dashboard/Panel';
import StatCard from '@/components/dashboard/StatCard';
import AiRiskCard from '@/components/dashboard/AiRiskCard';
import EmergencySOS from '@/components/dashboard/EmergencySOS';
import AddMedicineModal from '@/components/dashboard/AddMedicineModal';
import Badge from '@/components/ui/Badge';
import { todayMedicines, upcomingMedicines, recentActivity, type Medicine } from '@/data/mockData';

const statusStyle = {
  taken: 'text-neon border-neon/30 bg-neon/10',
  pending: 'text-warning-400 border-warning/30 bg-warning/10',
  missed: 'text-danger-400 border-danger/30 bg-danger/10',
};

const activityTone = {
  neon: 'text-neon bg-neon/10',
  accent: 'text-accent-400 bg-accent/10',
  danger: 'text-danger-400 bg-danger/10',
  warning: 'text-warning-400 bg-warning/10',
  neutral: 'text-slate-400 bg-white/5',
};

export default function PatientDashboard() {
  const [medicines, setMedicines] = useState<Medicine[]>(todayMedicines);

  const toggleTaken = (id: string) => {
    setMedicines((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status: 'taken' as const } : m))
    );
  };

  const addMedicine = (med: Omit<Medicine, 'id' | 'status'>) => {
    setMedicines((prev) => [
      ...prev,
      { ...med, id: `m${Date.now()}`, status: 'pending', icon: 'pill' },
    ]);
  };

  const takenCount = medicines.filter((m) => m.status === 'taken').length;

  return (
    <DashboardLayout role="patient">
      <PageHeader
        badge="Live monitoring active"
        title="Good morning, Priya"
        subtitle="Here's your health snapshot for today. Your vitals look stable."
        action={<NotificationBell />}
      />

      {/* Stat cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={HeartPulse} label="Heart Rate" value={72} unit="bpm" trend="stable" trendLabel="Stable" accent="neon" />
        <StatCard icon={Droplet} label="Blood Oxygen" value={98} unit="%" trend="stable" trendLabel="Normal" accent="neon" />
        <StatCard icon={Footprints} label="Steps Today" value="2,340" trend="up" trendLabel="+12%" accent="accent" />
        <StatCard icon={Pill} label="Medications" value={`${takenCount}/${medicines.length}`} trend="up" trendLabel="On track" accent="neon" />
      </div>

      {/* Main grid */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left — medicines */}
        <div className="space-y-6 lg:col-span-2">
          <Panel
            title="Today's Medicines"
            icon={<Pill size={18} />}
            action={<AddMedicineModal onAdd={addMedicine} />}
          >
            <div className="space-y-3">
              {medicines.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-white/15"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neon/10 border border-neon/20">
                      <Pill size={18} className="text-neon" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.dose}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden items-center gap-1.5 text-xs text-slate-400 sm:flex">
                      <Clock size={13} />
                      {m.time}
                    </span>
                    {m.status === 'taken' ? (
                      <Badge tone="neon">
                        <CheckCircle2 size={12} />
                        Taken
                      </Badge>
                    ) : (
                      <button
                        onClick={() => toggleTaken(m.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-warning/30 bg-warning/10 px-3 py-1.5 text-xs font-medium text-warning-400 transition hover:bg-warning/20"
                      >
                        <Check size={13} />
                        Mark taken
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Upcoming Medicines" icon={<Clock size={18} />}>
            <div className="space-y-3">
              {upcomingMedicines.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                      <Pill size={18} className="text-accent-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.dose}</p>
                    </div>
                  </div>
                  <Badge tone="neutral">
                    <Clock size={12} />
                    {m.time}
                  </Badge>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Recent Activity" icon={<Activity size={18} />}>
            <div className="space-y-1">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex items-start gap-4 rounded-xl p-3 transition hover:bg-white/[0.03]">
                  <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activityTone[a.tone]}`}>
                    <Activity size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-white">{a.title}</p>
                      <span className="text-xs text-slate-500">{a.time}</span>
                    </div>
                    <p className="mt-0.5 text-xs text-slate-400">{a.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right — AI risk + SOS */}
        <div className="space-y-6">
          <AiRiskCard
            score={18}
            level="Low"
            factors={[
              { label: 'Cardiac stability', impact: 22 },
              { label: 'Medication adherence', impact: 15 },
              { label: 'Activity level', impact: 18 },
            ]}
          />
          <EmergencySOS />
        </div>
      </div>
    </DashboardLayout>
  );
}
