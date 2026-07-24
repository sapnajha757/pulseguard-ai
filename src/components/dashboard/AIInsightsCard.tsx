import React from 'react';
import { Lightbulb, ArrowRight, Zap } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

type Props = {
  insights?: string[];
};

export default function AIInsightsCard({
  insights,
}: Props) {
  if (!insights || insights.length === 0) {
    return null; // Hide card if there are no dynamic insights
  }
  return (
    <GlassCard glow="accent" scan className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb size={18} className="text-amber-400" />
        <h3 className="font-display text-base font-semibold text-white">Top AI Clinical Insights</h3>
      </div>
      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <div key={idx} className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.03] p-3.5 text-sm text-slate-200">
            <Zap size={15} className="mt-0.5 shrink-0 text-amber-400" />
            <span>{insight}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
}
