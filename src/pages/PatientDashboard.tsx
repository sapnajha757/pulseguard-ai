import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader, { NotificationBell } from '@/components/layout/PageHeader';
import ProfileCard from '@/components/dashboard/ProfileCard';
import MedicineCard from '@/components/dashboard/MedicineCard';
import AlertCard from '@/components/dashboard/AlertCard';
import RiskCard from '@/components/dashboard/RiskCard';
import AIHealthScoreCard from '@/components/dashboard/AIHealthScoreCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import MedicationTimeline from '@/components/dashboard/MedicationTimeline';
import FutureRiskCard from '@/components/dashboard/FutureRiskCard';
import MedicationReminderCard from '@/components/dashboard/MedicationReminderCard';
import TodaysMedicines from '@/components/dashboard/TodaysMedicines';
import AdherenceCalendar from '@/components/dashboard/AdherenceCalendar';

interface Medicine {
  _id: string;
  name: string;
  dose: string;
  frequency: string;
  time: string;
  status: 'taken' | 'pending' | 'missed';
}

interface Alert {
  _id: string;
  type: string;
  severity: string;
  message: string;
  createdAt: string;
  status: string;
}

interface Risk {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  adherence: number;
  recommendation: string;
}

export default function PatientDashboard() {
  const { user, logout } = useAuth();
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [risk, setRisk] = useState<Risk | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      const [medRes, riskRes, alertsRes] = await Promise.all([
        api.get<Medicine[]>('/medicines'),
        api.get<Risk>('/risk/latest'),
        api.get<Alert[]>('/alerts'),
      ]);
      setMedicines(medRes.data || []);
      setRisk(riskRes.data || null);
      setAlerts(alertsRes.data || []);
      setError(null);
    } catch (err: any) {
      console.error(err);
      // Fail silently or set defaults so page still loads instead of showing generic error block
      setMedicines([]);
      setRisk(null);
      setAlerts([]);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <DashboardLayout role="patient">
        <div className="flex h-screen items-center justify-center text-neon animate-pulse">
          Loading dashboard...
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout role="patient">
        <div className="p-8 text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="rounded bg-neon px-4 py-2 text-sm font-medium hover:bg-neon/80"
          >
            Retry
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="patient">
      <Routes>
        {/* Main patient dashboard overview */}
        <Route
          path="/"
          element={
            <>
              <PageHeader
                badge="Live monitoring active"
                title={`Good morning, ${user?.name || 'Patient'}`}
                subtitle="Here’s your health snapshot for today."
                action={<NotificationBell />}
              />

              {/* Profile */}
              <ProfileCard name={user?.name} email={user?.email} role={user?.role} />

              {/* Smart Medication Reminders & Adherence */}
              <div className="mt-6 space-y-6">
                <MedicationReminderCard />
                <TodaysMedicines />
                <AIHealthScoreCard />
                <div className="grid gap-6 md:grid-cols-2">
                  <AIInsightsCard />
                  <FutureRiskCard />
                </div>
                <AdherenceCalendar />
                <MedicationTimeline />
              </div>

              {/* Risk */}
              {risk && <RiskCard risk={risk} />}
            </>
          }
        />

        {/* Medications view */}
        <Route
          path="/medications"
          element={
            <section className="mt-6">
              <PageHeader title="Medications" subtitle="Manage your daily medicine prescriptions." />
              <div className="grid gap-4 md:grid-cols-2">
                {medicines.map((m) => (
                  <MedicineCard key={m._id} medicine={m} />
                ))}
                {medicines.length === 0 && (
                  <p className="text-slate-400">No active medications registered. Contact your clinician to add prescriptions.</p>
                )}
              </div>
            </section>
          }
        />

        {/* Activity logs view */}
        <Route
          path="/activity"
          element={
            <section className="mt-6">
              <PageHeader title="Activity Logs" subtitle="View your daily adherence logs." />
              <MedicationTimeline />
            </section>
          }
        />

        {/* Alerts view */}
        <Route
          path="/alerts"
          element={
            <section className="mt-6">
              <PageHeader title="Active Alerts" subtitle="Important health safety alerts and updates." />
              <div className="space-y-3">
                {alerts.map((a) => (
                  <AlertCard key={a._id} alert={a} />
                ))}
                {alerts.length === 0 && (
                  <p className="text-slate-400">No safety alerts generated. Vitals remain stable.</p>
                )}
              </div>
            </section>
          }
        />

        {/* Family Access view */}
        <Route
          path="/family"
          element={
            <section className="mt-6">
              <PageHeader title="Family Circle Access" subtitle="Manage sharing parameters for family members." />
              <p className="text-slate-400">No caregivers connected yet. Add care partners to share alerts.</p>
            </section>
          }
        />

        {/* Settings view */}
        <Route
          path="/settings"
          element={
            <section className="mt-6">
              <PageHeader title="Profile Settings" subtitle="Edit contact numbers and reminder alarms." />
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6">
                <p className="text-sm text-slate-300">Name: <strong className="text-white">{user?.name}</strong></p>
                <p className="text-sm text-slate-300 mt-2">Email: <strong className="text-white">{user?.email}</strong></p>
              </div>
            </section>
          }
        />
      </Routes>
    </DashboardLayout>
  );
}
