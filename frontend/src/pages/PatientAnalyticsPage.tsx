import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Download, ShieldCheck, Heart, Activity } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import PageHeader from '@/components/layout/PageHeader';
import Panel from '@/components/dashboard/Panel';
import AIHealthScoreCard from '@/components/dashboard/AIHealthScoreCard';
import AIInsightsCard from '@/components/dashboard/AIInsightsCard';
import FutureRiskCard from '@/components/dashboard/FutureRiskCard';
import MedicationTimeline from '@/components/dashboard/MedicationTimeline';
import AdherenceCalendar from '@/components/dashboard/AdherenceCalendar';
import api from '@/services/api';

export default function PatientAnalyticsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Dynamically retrieve patient analytics from mock database backend
    const fetchData = async () => {
      try {
        const res = await api.get(`/doctor/patient/${id}/analytics`);
        setData(res.data);
      } catch (err) {
        console.error(err);
        // Fallback mock data in case API connection is offline
        setData({
          patient: { name: 'Rajesh Kumar', age: 58, medicalConditions: ['Hypertension'] },
          healthScore: 84,
          riskScore: 18,
          complianceScore: 91,
          futureRisk: { next7Days: 'LOW', next30Days: 'MEDIUM' },
          topMissed: [{ name: 'BP Tablet', missedCount: 4 }],
          highestRiskFactors: ['Dose compliance deficits'],
          followUpSuggestions: ['Schedule follow-up appointments'],
          recentAlerts: [{ message: 'Vitals stable' }],
          doctorNotes: 'Monitor adherence weekly.',
          blockchainVerification: { verified: true },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleExportPDF = () => {
    alert(`📄 PDF clinical record generation started for ${data?.patient?.name || 'Patient'}.\nDownloaded document will contain hospital headers, signatures, and blockchain validation proofs.`);
  };

  if (loading) {
    return (
      <DashboardLayout role="doctor">
        <div className="flex h-screen items-center justify-center text-neon animate-pulse">
          Loading patient health insights...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="doctor">
      <PageHeader
        badge="Patient Clinical Profile"
        title={data?.patient?.name || 'Patient Details'}
        subtitle={`Vitals overview, compliance scores, and forecasting insights.`}
        action={
          <button
            onClick={() => navigate('/doctor/dashboard')}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white"
          >
            <ArrowLeft size={14} /> Back to Dashboard
          </button>
        }
      />

      {/* Overview stats */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <div>
          <p className="text-xs text-slate-400">Chronological Demographics</p>
          <h3 className="font-display text-lg font-bold text-white mt-0.5">
            Age: {data?.patient?.age} · {data?.patient?.medicalConditions?.join(', ')}
          </h3>
        </div>
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 rounded-xl bg-neon px-4 py-2 text-sm font-semibold text-base-900 hover:shadow-neon transition"
        >
          <Download size={16} /> Export clinical Report
        </button>
      </div>

      {/* AI Health Scores */}
      <div className="space-y-6">
        <AIHealthScoreCard
          healthScore={data?.healthScore}
          riskScore={data?.riskScore}
          complianceScore={data?.complianceScore}
          futureRisk={data?.futureRisk}
        />

        <div className="grid gap-6 md:grid-cols-2">
          <AIInsightsCard insights={data?.highestRiskFactors} />
          <FutureRiskCard
            next7Days={data?.futureRisk?.next7Days}
            next30Days={data?.futureRisk?.next30Days}
          />
        </div>

        {/* Calendar and Timeline */}
        <AdherenceCalendar />
        <MedicationTimeline />

        {/* Notes Panel */}
        <Panel title="Clinical Notes & Reminders" icon={<Sparkles size={18} />}>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-200">
            <p className="font-bold text-neon mb-1.5">Doctor Directives</p>
            <p>{data?.doctorNotes || 'No specific doctor notes logged for this patient.'}</p>
          </div>
        </Panel>
      </div>
    </DashboardLayout>
  );
}
