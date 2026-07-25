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
import AIHealthScoreCard from '@/components/dashboard/AIHealthScoreCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import FutureRiskCard from '@/components/dashboard/FutureRiskCard';
import { familyAlerts, medicationHistory, emergencyContacts } from '@/data/mockData';
import { useAuth } from '@/context/AuthContext';
import React, { useState, useEffect } from 'react';
import api from '@/services/api';

import { Routes, Route } from 'react-router-dom';

const levelStyle = {
  critical: 'text-danger-400 border-danger/30 bg-danger/10',
  warning: 'text-warning-400 border-warning/30 bg-warning/10',
  info: 'text-neon border-neon/30 bg-neon/10',
};

export default function FamilyDashboard() {
  const { user } = useAuth();
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPatientData = async () => {
    if (user?.isDemo) {
      setPatientData({
        medicines: [ { _id: 'med_1', name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', reminderTime: '09:00, 21:00' } ]
      });
      setLoading(false);
      return;
    }
    if (!user?.connectedPatients || user.connectedPatients.length === 0) return;
    try {
      setLoading(true);
      const patientId = user.connectedPatients[0];
      const [patientProfile, meds] = await Promise.all([
        api.get(`/auth/me`), // we can also pull using connected reference
        api.get(`/medicines?patientId=${patientId}`)
      ]);
      setPatientData({
        medicines: meds.data || []
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatientData();
  }, [user]);

  return (
    <DashboardLayout role="family">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <PageHeader
                badge="Caregiver overview"
                title="Family Care Overview"
                subtitle="Real-time monitoring panel for connected loved ones."
                action={<NotificationBell />}
              />

              <div className="grid gap-6 md:grid-cols-2 mb-6">
                {/* Connect to loved one */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Connect to Patient</h3>
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      const target = e.target as HTMLFormElement;
                      const email = (target.elements.namedItem('patientEmail') as HTMLInputElement).value;

                      try {
                        const res = await api.post('/auth/connect-patient', { email });
                        alert(res.data?.message || 'Successfully connected to patient!');
                        window.location.reload();
                      } catch (err: any) {
                        alert(err.response?.data?.message || 'Error connecting to patient.');
                      }
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-slate-400 mb-1">Loved One's Email</label>
                      <input name="patientEmail" type="email" required className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-sm text-white focus:border-neon focus:outline-none" placeholder="patient@email.com" />
                    </div>
                    <button type="submit" className="w-full rounded-xl bg-neon py-3 text-xs font-bold text-black hover:bg-neon/90 transition-all">
                      Link Loved One
                    </button>
                  </form>
                </div>

                {/* Linked Patient Profile */}
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Connected Patient Vitals</h3>
                  {user?.connectedPatients && user.connectedPatients.length > 0 ? (
                    <div className="space-y-3">
                      <p className="text-sm text-slate-300">Connected Patient Reference ID: <strong className="text-white">{user.connectedPatients[0]}</strong></p>
                      <p className="text-sm text-slate-300">Prescribed Medicines Count: <strong className="text-white">{patientData?.medicines?.length || 0}</strong></p>
                      <span className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1 text-xs font-medium bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
                        Connection Secured
                      </span>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">No loved ones linked. Enter their email to monitor health metrics.</p>
                  )}
                </div>
              </div>

              {user?.connectedPatients && user.connectedPatients.length > 0 && (
                <Panel title="Loved One's Active Medications" icon={<Pill size={18} />}>
                  <div className="grid gap-4 md:grid-cols-2 mt-4">
                    {patientData?.medicines?.map((m: any) => (
                      <div key={m._id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                        <p className="text-sm font-semibold text-white">{m.name}</p>
                        <p className="text-xs text-slate-400">Dosage: {m.dosage} · Freq: {m.frequency}</p>
                        <p className="text-xs text-slate-500">Scheduled: {m.reminderTime}</p>
                      </div>
                    ))}
                    {(!patientData?.medicines || patientData.medicines.length === 0) && (
                      <p className="text-slate-400">No medications logged for patient.</p>
                    )}
                  </div>
                </Panel>
              )}
            </>
          }
        />
        <Route
          path="/alerts"
          element={
            <section className="mt-6">
              <PageHeader title="Family Alerts" subtitle="Important health notifications regarding your loved one." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center mt-6">
                <p className="text-slate-400 mb-4">No recent alerts. Vitals are stable.</p>
              </div>
            </section>
          }
        />
        <Route
          path="/medications"
          element={
            <section className="mt-6">
              <PageHeader title="Medications" subtitle="View and track your loved one's medication schedule." />
              <div className="grid gap-4 mt-6 md:grid-cols-2">
                {patientData?.medicines?.map((m: any) => (
                  <div key={m._id} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <h3 className="text-sm font-semibold text-white">{m.name}</h3>
                    <p className="text-xs text-slate-400 mt-1">Dosage: {m.dosage} | Frequency: {m.frequency}</p>
                    <p className="text-xs text-slate-500 mt-1">Time: {m.reminderTime}</p>
                  </div>
                ))}
                {(!patientData?.medicines || patientData.medicines.length === 0) && (
                  <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center">
                    <p className="text-slate-400">No active medications registered.</p>
                  </div>
                )}
              </div>
            </section>
          }
        />
        <Route
          path="/contacts"
          element={
            <section className="mt-6">
              <PageHeader title="Emergency Contacts" subtitle="Important contacts and medical personnel." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center mt-6">
                <p className="text-slate-400 mb-4">No emergency contacts set up yet.</p>
              </div>
            </section>
          }
        />
        <Route
          path="/settings"
          element={
            <section className="mt-6">
              <PageHeader title="Family Settings" subtitle="Manage your profile and access preferences." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 mt-6">
                <p className="text-sm text-slate-300">Name: <strong className="text-white">{user?.name}</strong></p>
                <p className="text-sm text-slate-300 mt-2">Email: <strong className="text-white">{user?.email}</strong></p>
                <p className="text-sm text-slate-300 mt-2">Role: <strong className="text-white">Family Member</strong></p>
              </div>
            </section>
          }
        />
      </Routes>
    </DashboardLayout>
  );
}
