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
import { useAuth } from '@/context/AuthContext';
import AIHealthScoreCard from '@/components/dashboard/AIHealthScoreCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import FutureRiskCard from '@/components/dashboard/FutureRiskCard';
import { highRiskPatients, doctorAlerts, recentReports } from '@/data/mockData';
import { Routes, Route } from 'react-router-dom';
import api from '@/services/api';
import React, { useState, useEffect } from 'react';

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
  const { user } = useAuth();
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch connected patients
  const fetchPatients = async () => {
    if (user?.isDemo) {
      setPatients([
        { id: 'demo_patient_777', medicines: [ { name: 'Lipitor', dosage: '10mg', frequency: 'Daily', reminderTime: '08:00' } ] }
      ]);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await api.get('/auth/me');
      if (Array.isArray(res.data?.user?.connectedPatients)) {
        // Query details for connected patients
        const details = await Promise.all(
          res.data.user.connectedPatients.map(async (pId: string) => {
            try {
              const meds = await api.get(`/medicines?patientId=${pId}`);
              return { id: pId, medicines: meds.data || [] };
            } catch {
              return { id: pId, medicines: [] };
            }
          })
        );
        setPatients(details);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <DashboardLayout role="doctor">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageHeader
                badge="Clinician console"
                title={user?.name ? `Dr. ${user.name}` : 'Medical Clinician'}
                subtitle="Manage and prescribe medications for your connected patients."
                action={<NotificationBell />}
              />

              {/* Stats */}
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard icon={Users} label="Active Patients" value={patients.length} trend="stable" trendLabel="Real-time" accent="neon" />
                <StatCard icon={AlertTriangle} label="Critical Alerts" value={0} trend="stable" trendLabel="Stable" accent="danger" />
                <StatCard icon={HeartPulse} label="Avg Risk Score" value={18} unit="/100" trend="stable" trendLabel="Calculated" accent="accent" />
                <StatCard icon={FileText} label="Pending Reports" value={0} trend="stable" trendLabel="None" accent="warning" />
              </div>

              {/* Action Panels */}
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {/* Connect Patient Card */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Connect Patient</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const target = e.target as HTMLFormElement;
                      const email = (target.elements.namedItem('patientEmail') as HTMLInputElement).value;

                      try {
                        const res = await api.post('/auth/connect-patient', { email });
                        alert(res.data?.message || 'Patient connected successfully!');
                        fetchPatients();
                      } catch (err: any) {
                        alert(err.response?.data?.message || 'Failed to connect patient. Check email.');
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Patient Email</label>
                      <input name="patientEmail" type="email" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none" placeholder="patient@email.com" />
                    </div>
                    <button type="submit" className="w-full rounded-xl bg-neon py-3 text-xs font-bold text-black hover:bg-neon/90 transition-all">
                      Add and Connect Patient
                    </button>
                  </form>
                </div>

                {/* Prescribe Medicine Card */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Prescribe Medication</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const target = e.target as HTMLFormElement;
                      const patientId = (target.elements.namedItem('patientId') as HTMLSelectElement).value;
                      const name = (target.elements.namedItem('medName') as HTMLInputElement).value;
                      const dosage = (target.elements.namedItem('medDose') as HTMLInputElement).value;
                      const frequency = (target.elements.namedItem('medFreq') as HTMLInputElement).value;
                      const reminderTime = (target.elements.namedItem('medTime') as HTMLInputElement).value;
                      const priority = (target.elements.namedItem('priority') as HTMLSelectElement).value;

                      try {
                        await api.post('/medicines', {
                          patientId,
                          name,
                          dosage,
                          frequency,
                          reminderTime,
                          priority,
                          startDate: new Date(),
                        });
                        alert('Prescription successfully sent to patient dashboard!');
                        fetchPatients();
                      } catch (err: any) {
                        alert(err.response?.data?.message || 'Error prescribing medicine.');
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Target Connected Patient</label>
                      <select name="patientId" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none bg-base-800">
                        {(Array.isArray(user?.connectedPatients) ? user.connectedPatients : []).map((pId: string) => (
                          <option key={pId} value={pId}>{pId}</option>
                        ))}
                        {(!Array.isArray(user?.connectedPatients) || user.connectedPatients.length === 0) && (
                          <option value="">No connected patients found</option>
                        )}
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Med Name</label>
                        <input name="medName" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none" placeholder="e.g. Lipitor" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Dosage</label>
                        <input name="medDose" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none" placeholder="e.g. 10mg" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Frequency</label>
                        <input name="medFreq" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none" placeholder="Once daily" />
                      </div>
                      <div>
                        <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Time</label>
                        <input name="medTime" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none" placeholder="08:00" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Priority</label>
                      <select name="priority" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none bg-base-800">
                        <option value="CRITICAL">Critical</option>
                        <option value="HIGH">High</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="LOW">Low</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full rounded-xl bg-neon py-3 text-xs font-bold text-black hover:bg-neon/90 transition-all">
                      Prescribe
                    </button>
                  </form>
                </div>
              </div>
            </>
          }
        />
        <Route
          path="/patients"
          element={
            <section className="mt-6">
              <PageHeader title="Patient Directory" subtitle="List of all connected patients." />
              <div className="grid gap-4 mt-6">
                {patients.map((p: any) => (
                  <div key={p.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                    <h3 className="text-lg font-semibold text-white">{p.id}</h3>
                    <p className="text-sm text-slate-400 mt-2">Active Medications: {p.medicines?.length || 0}</p>
                  </div>
                ))}
                {patients.length === 0 && (
                  <p className="text-slate-400">No patients connected yet.</p>
                )}
              </div>
            </section>
          }
        />
        <Route
          path="/alerts"
          element={
            <section className="mt-6">
              <PageHeader title="Critical Alerts" subtitle="Recent alerts from your connected patients." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center mt-6">
                <p className="text-slate-400 mb-4">No critical alerts at this time. All patients are stable.</p>
              </div>
            </section>
          }
        />
        <Route
          path="/reports"
          element={
            <section className="mt-6">
              <PageHeader title="Medical Reports" subtitle="View latest health reports and risk analysis." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center mt-6">
                <p className="text-slate-400 mb-4">No new reports generated today.</p>
              </div>
            </section>
          }
        />
        <Route
          path="/settings"
          element={
            <section className="mt-6">
              <PageHeader title="Clinician Settings" subtitle="Manage your profile and preferences." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mt-6">
                <p className="text-sm text-slate-300">Name: <strong className="text-white">{user?.name}</strong></p>
                <p className="text-sm text-slate-300 mt-2">Email: <strong className="text-white">{user?.email}</strong></p>
                <p className="text-sm text-slate-300 mt-2">Role: <strong className="text-white">Clinician</strong></p>
              </div>
            </section>
          }
        />
      </Routes>
    </DashboardLayout>
  );
}
