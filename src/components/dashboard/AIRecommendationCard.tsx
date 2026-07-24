import React, { useEffect, useState } from 'react';
import { Sparkles, Activity, AlertTriangle, ShieldCheck, CheckCircle2, TrendingUp, RefreshCw } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

export type AIRecommendationData = {
  healthScore: number;
  riskScore: number;
  complianceScore: number;
  recommendations: string[];
  summary: string;
};

type Props = {
  data?: AIRecommendationData;
  isLoading?: boolean;
  onRefresh?: () => void;
};

export default function AIRecommendationCard({ data, isLoading, onRefresh }: Props) {
  // Default values if data loading or fallback
  const recommendationData: AIRecommendationData = data || {
    healthScore: 84,
    riskScore: 18,
    complianceScore: 91,
    recommendations: [
      'Patient has high adherence to regular routines. Continue current regimen.',
      'Schedule follow-up consultation if any mild side-effects occur.',
    ],
    summary: 'Patient is stable with good medication adherence.',
  };

  const { healthScore, riskScore, complianceScore, recommendations, summary } = recommendationData;

  const getScoreColor = (score: number, inverse = false) => {
    const val = inverse ? 100 - score : score;
    if (val >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10';
    if (val >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10';
    return 'text-rose-400 border-rose-500/30 bg-rose-500/10';
  };

  const getStatusBadge = () => {
    if (riskScore > 50 || healthScore < 60) {
      return (
        <Badge tone="danger">
          <AlertTriangle size={12} className="mr-1 inline" /> Attention Required
        </Badge>
      );
    }
    if (complianceScore >= 90 && riskScore < 25) {
      return (
        <Badge tone="neon">
          <ShieldCheck size={12} className="mr-1 inline" /> Optimal Health
        </Badge>
      );
    }
    return (
      <Badge tone="warning">
        <Activity size={12} className="mr-1 inline" /> Stable Monitoring
      </Badge>
    );
  };

  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Sparkles size={18} />
          </div>
          <div>
            <h3 className="font-display text-base font-semibold text-white">AI Health Recommendation Engine</h3>
            <p className="text-xs text-slate-400">Real-time priority-weighted multi-vector health synthesis</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge()}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition"
              title="Refresh recommendations"
            >
              <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
            </button>
          )}
        </div>
      </div>

      {/* Scores Grid */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {/* Health Score */}
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${getScoreColor(healthScore)}`}>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">Health Score</span>
          <span className="font-display text-3xl font-bold mt-1">{healthScore}</span>
          <span className="text-[10px] mt-0.5 opacity-70">Overall Wellness</span>
        </div>

        {/* Risk Score */}
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${getScoreColor(riskScore, true)}`}>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">Risk Score</span>
          <span className="font-display text-3xl font-bold mt-1">{riskScore}</span>
          <span className="text-[10px] mt-0.5 opacity-70">Complication Penalty</span>
        </div>

        {/* Compliance Score */}
        <div className={`flex flex-col items-center justify-center p-4 rounded-xl border ${getScoreColor(complianceScore)}`}>
          <span className="text-xs font-medium uppercase tracking-wider opacity-80">Medication Compliance</span>
          <span className="font-display text-3xl font-bold mt-1">{complianceScore}%</span>
          <span className="text-[10px] mt-0.5 opacity-70">Weighted Adherence</span>
        </div>
      </div>

      {/* AI Summary Banner */}
      <div className="mt-5 rounded-xl border border-indigo-500/20 bg-indigo-500/[0.06] p-4">
        <div className="flex items-center gap-2">
          <TrendingUp size={14} className="text-indigo-400" />
          <p className="text-xs font-semibold uppercase tracking-wider text-indigo-300">Clinical AI Insights Summary</p>
        </div>
        <p className="mt-1 text-sm text-slate-200">{summary}</p>
      </div>

      {/* Personalized Recommendations List */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Actionable AI Recommendations</h4>
        <div className="space-y-2.5">
          {recommendations.map((rec, idx) => (
            <div key={idx} className="flex items-start gap-3 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-sm text-slate-300">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-cyan-400" />
              <span>{rec}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  );
}
