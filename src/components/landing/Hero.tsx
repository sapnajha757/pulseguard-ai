import { Link } from 'react-router-dom';
import {
  Activity,
  ShieldCheck,
  BrainCircuit,
  ArrowRight,
  Play,
  HeartPulse,
  Sparkles,
} from 'lucide-react';
import NeonButton from '@/components/ui/NeonButton';
import Badge from '@/components/ui/Badge';
import GlassCard from '@/components/ui/GlassCard';

const stats = [
  { value: '99.2%', label: 'Prediction accuracy' },
  { value: '24/7', label: 'AI monitoring' },
  { value: '<3s', label: 'SOS response' },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left */}
          <div className="animate-fade-up">
            <Badge tone="neon" className="mb-6">
              <Sparkles size={12} />
              AI-powered health intelligence
            </Badge>
            <h1 className="font-display text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Your health,{' '}
              <span className="gradient-text">guarded by intelligence</span> that never sleeps.
            </h1>
            <p className="mt-6 max-w-xl text-base text-slate-400 leading-relaxed sm:text-lg">
              PulseGuard AI fuses real-time vitals, predictive risk models, and
              blockchain-secured records on Polygon — so patients, clinicians, and
              families stay one step ahead of the unexpected.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to="/register">
                <NeonButton size="lg" className="group">
                  Start monitoring
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </NeonButton>
              </Link>
              <Link to="/dashboard/patient">
                <NeonButton variant="outline" size="lg">
                  <Play size={16} />
                  See it in action
                </NeonButton>
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-semibold neon-text sm:text-3xl">
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs text-slate-500 sm:text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative animate-fade-up" style={{ animationDelay: '150ms' }}>
            <GlassCard glow="neon" scan className="p-6">
              {/* mock monitor */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HeartPulse size={18} className="text-neon" />
                  <span className="text-sm font-medium text-white">Live Vitals</span>
                </div>
                <Badge tone="neon">
                  <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
                  Streaming
                </Badge>
              </div>

              {/* ECG line */}
              <div className="relative mt-5 h-32 overflow-hidden rounded-xl border border-white/10 bg-base-900/60">
                <svg viewBox="0 0 400 120" className="h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="ecg" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#2affde" stopOpacity="0" />
                      <stop offset="20%" stopColor="#2affde" stopOpacity="1" />
                      <stop offset="100%" stopColor="#2affde" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 L60,60 L70,60 L78,30 L86,90 L94,60 L150,60 L160,60 L168,40 L176,80 L184,60 L240,60 L250,60 L258,20 L266,100 L274,60 L330,60 L340,60 L348,45 L356,75 L364,60 L400,60"
                    fill="none"
                    stroke="url(#ecg)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="drop-shadow-[0_0_6px_rgba(42,255,222,0.8)]"
                  />
                </svg>
                <div className="scanline" />
              </div>

              {/* vitals grid */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {[
                  { label: 'Heart', value: '72', unit: 'bpm', icon: HeartPulse },
                  { label: 'SpO₂', value: '98', unit: '%', icon: Activity },
                  { label: 'Risk', value: 'Low', unit: '', icon: ShieldCheck },
                ].map((v) => (
                  <div
                    key={v.label}
                    className="rounded-xl border border-white/10 bg-white/[0.03] p-3"
                  >
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <v.icon size={12} className="text-neon/70" />
                      {v.label}
                    </div>
                    <p className="mt-1 font-display text-lg font-semibold text-white">
                      {v.value}
                      <span className="ml-1 text-xs font-normal text-slate-500">{v.unit}</span>
                    </p>
                  </div>
                ))}
              </div>

              {/* AI insight */}
              <div className="mt-5 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
                <BrainCircuit size={20} className="mt-0.5 shrink-0 text-accent-400" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-400">
                    AI Insight
                  </p>
                  <p className="mt-1 text-sm text-slate-300">
                    Vitals stable. No anomalies predicted in the next 6 hours.
                  </p>
                </div>
              </div>
            </GlassCard>

            {/* floating badge */}
            <div className="absolute -bottom-5 -left-5 hidden animate-float sm:block">
              <GlassCard glow="neon" className="px-5 py-3">
                <div className="flex items-center gap-3">
                  <ShieldCheck size={20} className="text-neon" />
                  <div>
                    <p className="text-xs text-slate-400">Records secured on</p>
                    <p className="text-sm font-semibold text-white">Polygon Blockchain</p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
