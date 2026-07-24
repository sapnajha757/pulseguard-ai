import {
  Users,
  AlertTriangle,
  Activity,
  FileText,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Bell,
  Stethoscope,
  HeartPulse,
} from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader, { NotificationBell } from '@/components/layout/PageHeader';
import Panel from '@/components/dashboard/Panel';
import StatCard from '@/components/dashboard/StatCard';
import Badge from '@/components/ui/Badge';
import NeonButton from '@/components/ui/NeonButton';
import AIHealthScoreCard from '@/components/dashboard/AIHealthScoreCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import FutureRiskCard from '@/components/dashboard/FutureRiskCard';
import { highRiskPatients, doctorAlerts, recentReports } from '@/data/mockData';

const levelStyle = {
  critical: 'text-danger-400 border-danger/30 bg-danger/10',
  warning: 'text-warning-400 border-warning/30 bg-warning/10',
  info: 'text-neon border-neon/30 bg-neon/10',
};

const reportStatus = {
  reviewed: 'neon' as const,
  pending: 'warning' as const,
  flagged: 'danger' as const,
};

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Activity,
};

const trendColor = {
  up: 'text-danger-400',
  down: 'text-neon',
  stable: 'text-slate-400',
};

export default function DoctorDashboard() {
  return (
    <DashboardLayout role="doctor">
      <PageHeader
        badge="Clinician console"
        title="Dr. Aanya Sharma"
        subtitle="You have 2 critical alerts and 4 patients requiring attention today."
        action={<NotificationBell />}
      />

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Users} label="Active Patients" value={48} trend="up" trendLabel="+3 this week" accent="neon" />
        <StatCard icon={AlertTriangle} label="Critical Alerts" value={2} trend="up" trendLabel="2 new" accent="danger" />
        <StatCard icon={HeartPulse} label="Avg Risk Score" value={34} unit="/100" trend="down" trendLabel="-6%" accent="accent" />
        <StatCard icon={FileText} label="Pending Reports" value={7} trend="stable" trendLabel="Unchanged" accent="warning" />
      </div>

      {/* AI Intelligence Console */}
      <div className="mt-6 space-y-6">
        <AIHealthScoreCard />
        <div className="grid gap-6 md:grid-cols-2">
          <AIInsightsCard />
          <FutureRiskCard />
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left — high risk + reports */}
        <div className="space-y-6 lg:col-span-2">
          <Panel
            title="High Risk Patients"
            icon={<AlertTriangle size={18} />}
            action={<NeonButton variant="ghost" size="sm">View all</NeonButton>}
          >
            <div className="space-y-3">
              {highRiskPatients.map((p) => {
                const Trend = trendIcon[p.trend];
                return (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 transition hover:border-neon/20 hover:bg-white/[0.05]"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-neon/20 to-accent/20 border border-white/10 font-display text-sm font-semibold text-white">
                        {p.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{p.name}</p>
                        <p className="text-xs text-slate-500">
                          {p.age} yrs · {p.condition}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="hidden text-right sm:block">
                        <p className="text-xs text-slate-500">Risk</p>
                        <p className="font-display text-lg font-semibold text-white">{p.risk}</p>
                      </div>
                      <div className={`flex items-center gap-1 text-xs ${trendColor[p.trend]}`}>
                        <Trend size={14} />
                      </div>
                      <Badge tone={p.risk >= 70 ? 'danger' : 'warning'}>
                        {p.risk >= 70 ? 'Critical' : 'Elevated'}
                      </Badge>
                      <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-slate-400 transition hover:border-neon/30 hover:text-neon">
                        <ArrowUpRight size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel title="Recent Reports" icon={<FileText size={18} />}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500">
                    <th className="pb-3 font-medium">Patient</th>
                    <th className="pb-3 font-medium">Type</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 text-right font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {recentReports.map((r) => (
                    <tr key={r.id} className="transition hover:bg-white/[0.03]">
                      <td className="py-3.5 font-medium text-white">{r.patient}</td>
                      <td className="py-3.5 text-slate-400">{r.type}</td>
                      <td className="py-3.5 text-slate-500">{r.date}</td>
                      <td className="py-3.5 text-right">
                        <Badge tone={reportStatus[r.status]}>
                          {r.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Panel>
        </div>

        {/* Right — alerts */}
        <div className="space-y-6">
          <Panel title="Live Alerts" icon={<Bell size={18} />}>
            <div className="space-y-3">
              {doctorAlerts.map((a) => (
                <div
                  key={a.id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <div className="flex items-center justify-between">
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${levelStyle[a.level]}`}>
                      {a.level === 'critical' ? <AlertTriangle size={11} /> : <Bell size={11} />}
                      {a.level}
                    </span>
                    <span className="text-xs text-slate-500">{a.time}</span>
                  </div>
                  <p className="mt-3 text-sm font-medium text-white">{a.patient}</p>
                  <p className="mt-1 text-xs text-slate-400">{a.message}</p>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Quick Actions" icon={<Stethoscope size={18} />}>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'New Round', icon: Users },
                { label: 'Review Lab', icon: FileText },
                { label: 'Patient Notes', icon: Activity },
                { label: 'Schedule', icon: Bell },
              ].map((q) => (
                <button
                  key={q.label}
                  className="flex flex-col items-start gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition hover:border-neon/30 hover:bg-neon/5"
                >
                  <q.icon size={18} className="text-neon" />
                  <span className="text-xs font-medium text-slate-300">{q.label}</span>
                </button>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </DashboardLayout>
  );
}
