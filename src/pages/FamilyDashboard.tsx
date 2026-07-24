import {
  HeartPulse,
  Droplet,
  Activity,
  Footprints,
  Bell,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Phone,
  Pill,
  Users,
  ShieldCheck,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader, { NotificationBell } from '@/components/layout/PageHeader';
import Panel from '@/components/dashboard/Panel';
import StatCard from '@/components/dashboard/StatCard';
import Badge from '@/components/ui/Badge';
import GlassCard from '@/components/ui/GlassCard';
import { familyAlerts, medicationHistory, emergencyContacts } from '@/data/mockData';

const levelStyle = {
  critical: 'text-danger-400 border-danger/30 bg-danger/10',
  warning: 'text-warning-400 border-warning/30 bg-warning/10',
  info: 'text-neon border-neon/30 bg-neon/10',
};

export default function FamilyDashboard() {
  return (
    <DashboardLayout role="family">
      <PageHeader
        badge="Watching over Priya Nair"
        title="Family Care Overview"
        subtitle="Real-time status of your loved one. You'll be alerted the moment anything changes."
        action={<NotificationBell />}
      />

      {/* Patient health status banner */}
      <GlassCard glow="neon" scan className="mb-6 p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-neon/20 to-accent/20 border border-white/10 font-display text-lg font-semibold text-white">
                PN
              </div>
              <span className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-2 border-base-800 bg-neon" />
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold text-white">Priya Nair</h2>
              <p className="text-sm text-slate-400">58 yrs · Hypertension · Monitored since Jan 2025</p>
              <div className="mt-2 flex items-center gap-2">
                <Badge tone="neon">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                  Stable
                </Badge>
                <Badge tone="neutral">Risk: Low (18)</Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: HeartPulse, label: 'Heart', value: '72 bpm' },
              { icon: Droplet, label: 'SpO₂', value: '98%' },
              { icon: Activity, label: 'BP', value: '118/76' },
              { icon: Footprints, label: 'Steps', value: '2,340' },
            ].map((v) => (
              <div key={v.label} className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-center">
                <v.icon size={16} className="mx-auto text-neon" />
                <p className="mt-1.5 text-xs text-slate-500">{v.label}</p>
                <p className="text-sm font-semibold text-white">{v.value}</p>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left — alerts + med history */}
        <div className="space-y-6 lg:col-span-2">
          <Panel title="Alerts" icon={<Bell size={18} />}>
            <div className="space-y-3">
              {familyAlerts.map((a) => (
                <div
                  key={a.id}
                  className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${levelStyle[a.level]}`}>
                    {a.level === 'warning' ? <AlertTriangle size={16} /> : <Bell size={16} />}
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

          <Panel title="Medication History" icon={<Pill size={18} />}>
            <div className="space-y-2">
              {medicationHistory.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-3.5"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neon/10 border border-neon/20">
                      <Pill size={16} className="text-neon" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{m.name} <span className="text-slate-500">· {m.dose}</span></p>
                      <p className="text-xs text-slate-500">{m.date}</p>
                    </div>
                  </div>
                  {m.status === 'taken' ? (
                    <span className="flex items-center gap-1.5 text-xs text-neon">
                      <CheckCircle2 size={14} />
                      Taken
                    </span>
                  ) : (
                    <span className="flex items-center gap-1.5 text-xs text-danger-400">
                      <XCircle size={14} />
                      Missed
                    </span>
                  )}
                </div>
              ))}
            </div>
          </Panel>
        </div>

        {/* Right — emergency contacts */}
        <div className="space-y-6">
          <Panel title="Emergency Contacts" icon={<Phone size={18} />}>
            <div className="space-y-3">
              {emergencyContacts.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-neon/20 to-accent/20 border border-white/10 font-display text-xs font-semibold text-white">
                      {c.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{c.name}</p>
                      <p className="text-xs text-slate-500">{c.relation}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${c.available ? 'bg-neon animate-pulse' : 'bg-slate-600'}`} />
                    <a
                      href={`tel:${c.phone}`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon/30 bg-neon/10 text-neon transition hover:bg-neon/20 hover:shadow-neon-sm"
                      aria-label={`Call ${c.name}`}
                    >
                      <Phone size={15} />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Care Circle" icon={<Users size={18} />}>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20">
                <ShieldCheck size={18} className="text-accent-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-white">3 members connected</p>
                <p className="text-xs text-slate-500">View-only access to Priya's vitals</p>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
