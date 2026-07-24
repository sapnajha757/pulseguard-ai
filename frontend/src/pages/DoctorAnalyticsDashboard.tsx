import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Users, AlertTriangle, Activity, Bell } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader, { NotificationBell } from '@/components/layout/PageHeader';
import Panel from '@/components/dashboard/Panel';
import StatCard from '@/components/dashboard/StatCard';
import PatientRiskCard from '@/components/dashboard/PatientRiskCard';
import PatientLeaderboard from '@/components/dashboard/PatientLeaderboard';
import TopMissedMedicines from '@/components/dashboard/TopMissedMedicines';
import api from '@/services/api';
import { useAuth } from '@/context/AuthContext';

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

export default function DoctorAnalyticsDashboard() {
  const navigate = useNavigate();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('ALL'); // ALL, HIGH, EMERGENCY, POOR_ADHERENCE
  const [notifications, setNotifications] = useState<string[]>([
    '🚨 High Risk Patient Added: Rajesh Kumar (Risk: 82)',
    '🔔 Emergency Alert Triggered: Priya Sharma (Dose Omission)',
    '⚠️ Insulin missed frequently by Amit Patel this week.',
  ]);

  useEffect(() => {
    // Dynamically generate mock patient cohort for dashboard views
    const cohort: Patient[] = [];
    const firstNames = ['Amit', 'Aanya', 'Rahul', 'Priya', 'Vikram', 'Neha', 'Sanjay', 'Aditi', 'Rajesh', 'Kiran'];
    const lastNames = ['Sharma', 'Nair', 'Joshi', 'Patel', 'Kumar', 'Mehta', 'Gupta', 'Sen', 'Rao', 'Singh'];
    const conditions = ['Hypertension', 'Type-2 Diabetes', 'Asthma', 'COPD', 'Cardiovascular Disease'];

    for (let i = 1; i <= 30; i++) {
      const fn = firstNames[i % firstNames.length];
      const ln = lastNames[i % lastNames.length];
      const riskScore = 20 + (i * 7) % 80;
      let riskLevel: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
      if (riskScore >= 60) riskLevel = 'HIGH';
      else if (riskScore >= 30) riskLevel = 'MEDIUM';

      cohort.push({
        _id: `mock_patient_${i}`,
        name: `${fn} ${ln}`,
        age: 30 + (i % 55),
        condition: conditions[i % conditions.length],
        riskScore,
        complianceScore: 100 - riskScore,
        riskLevel,
        status: riskLevel === 'HIGH' ? 'Critical' : 'Stable',
        lastVisit: '2026-07-20',
      });
    }

    setPatients(cohort);
    setFilteredPatients(cohort);
    setStats({
      totalPatients: 30,
      highRiskPatients: cohort.filter((p) => p.riskLevel === 'HIGH').length,
      mediumRiskPatients: cohort.filter((p) => p.riskLevel === 'MEDIUM').length,
      averageAdherence: 74,
      emergencyAlertsToday: 2,
    });
  }, []);

  // Filter and Search logic
  useEffect(() => {
    let result = patients;

    // Apply Search
    if (search.trim() !== '') {
      result = result.filter(
        (p) =>
          (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
          (p.condition || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply Quick Filters
    if (filter === 'HIGH') {
      result = result.filter((p) => p.riskLevel === 'HIGH');
    } else if (filter === 'EMERGENCY') {
      result = result.filter((p) => p.status === 'Critical');
    } else if (filter === 'POOR_ADHERENCE') {
      result = result.filter((p) => p.complianceScore < 70);
    }

    setFilteredPatients(result);
  }, [search, filter, patients]);

  const { user } = useAuth();

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        badge="Clinician Analytics Console"
        title={user?.name ? `Dr. ${user.name}` : 'Medical Clinician'}
        subtitle="AI clinical decision engine and priority compliance insights."
        action={<NotificationBell />}
      />

      {/* Aggregate Stats */}
      {stats && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard icon={Users} label="Total Assigned Patients" value={stats.totalPatients} trend="stable" accent="neon" />
          <StatCard icon={AlertTriangle} label="High Risk Patients" value={stats.highRiskPatients} trend="up" accent="danger" />
          <StatCard icon={Activity} label="System Compliance Avg" value={`${stats.averageAdherence}%`} trend="down" accent="accent" />
          <StatCard icon={Bell} label="Active Emergency Alerts" value={stats.emergencyAlertsToday} trend="stable" accent="warning" />
        </div>
      )}

      {/* Grid Layout */}
      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left pane: search + patient cards */}
        <div className="space-y-6 lg:col-span-2">
          {/* Controls Panel */}
          <Panel title="Patient Directory Console" icon={<Search size={18} />}>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="Search by name, condition..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-neon/30 focus:outline-none"
                />
              </div>
              <div className="flex gap-2">
                {['ALL', 'HIGH', 'EMERGENCY', 'POOR_ADHERENCE'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                      filter === f
                        ? 'border-neon/30 bg-neon/10 text-neon'
                        : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Patients List */}
            <div className="mt-5 space-y-3 max-h-[600px] overflow-y-auto">
              {filteredPatients.map((p) => (
                <PatientRiskCard
                  key={p._id}
                  patient={patientDataConverter(p)}
                  onClick={() => navigate(`/doctor/patient/${p._id}`)}
                />
              ))}
            </div>
          </Panel>

          {/* Charts Fallbacks / Mock Displays */}
          <TopMissedMedicines />
        </div>

        {/* Right pane: notifications, leaderboard */}
        <div className="space-y-6">
          {/* Real-time Notifications */}
          <Panel title="Real-time Alert Streams" icon={<Bell size={18} />}>
            <div className="space-y-3">
              {notifications.map((n, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-xs text-slate-200">
                  {n}
                </div>
              ))}
            </div>
          </Panel>

          {/* Patient Leaderboard */}
          <PatientLeaderboard
            patients={patients.sort((a, b) => b.riskScore - a.riskScore)}
            onSelect={(id) => navigate(`/doctor/patient/${id}`)}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

// Convert model helper
function patientDataConverter(p: any) {
  return {
    _id: p._id,
    name: p.name,
    age: p.age,
    condition: p.condition,
    riskScore: p.riskScore,
    complianceScore: p.complianceScore,
    riskLevel: p.riskLevel,
    status: p.status,
    lastVisit: p.lastVisit,
  };
}
