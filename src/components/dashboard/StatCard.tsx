import { type ReactNode } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';

type Trend = 'up' | 'down' | 'stable';

type Props = {
  icon: typeof TrendingUp;
  label: string;
  value: string | number;
  unit?: string;
  trend?: Trend;
  trendLabel?: string;
  accent?: 'neon' | 'accent' | 'danger' | 'warning';
  children?: ReactNode;
};

const accentMap = {
  neon: 'text-neon border-neon/30 bg-neon/10',
  accent: 'text-accent-400 border-accent/30 bg-accent/10',
  danger: 'text-danger-400 border-danger/30 bg-danger/10',
  warning: 'text-warning-400 border-warning/30 bg-warning/10',
};

const trendIcon = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

const trendColor = {
  up: 'text-danger-400',
  down: 'text-neon',
  stable: 'text-slate-400',
};

export default function StatCard({
  icon: Icon,
  label,
  value,
  unit,
  trend,
  trendLabel,
  accent = 'neon',
  children,
}: Props) {
  const TrendIcon = trend ? trendIcon[trend] : null;

  return (
    <GlassCard hover glow="neon" className="p-5">
      <div className="flex items-start justify-between">
        <div className={['flex h-11 w-11 items-center justify-center rounded-xl border', accentMap[accent]].join(' ')}>
          <Icon size={20} />
        </div>
        {TrendIcon && trend && (
          <div className={`flex items-center gap-1 text-xs ${trendColor[trend]}`}>
            <TrendIcon size={14} />
            {trendLabel}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
        <p className="mt-1 font-display text-2xl font-semibold text-white">
          {value}
          {unit && <span className="ml-1 text-sm font-normal text-slate-500">{unit}</span>}
        </p>
      </div>
      {children}
    </GlassCard>
  );
}
