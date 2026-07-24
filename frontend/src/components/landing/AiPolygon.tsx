import { BrainCircuit, Boxes, Lock, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';
import NeonButton from '@/components/ui/NeonButton';
import Badge from '@/components/ui/Badge';

const pillars = [
  {
    icon: BrainCircuit,
    title: 'Neural risk prediction',
    desc: 'A transformer-based model trained on millions of hours of vitals forecasts deterioration up to 6 hours ahead.',
  },
  {
    icon: Boxes,
    title: 'Polygon on-chain anchoring',
    desc: 'Health events are hashed and committed to Polygon — verifiable by anyone, editable by no one.',
  },
  {
    icon: Lock,
    title: 'Zero-knowledge access',
    desc: 'Share proof of a result without revealing the result itself. Your data, your terms.',
  },
  {
    icon: Zap,
    title: 'Sub-second alerting',
    desc: 'Edge-processed detection routes critical alerts in under 3 seconds to the right responder.',
  },
];

export default function AiPolygon() {
  return (
    <section id="ai-polygon" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — visual */}
          <Reveal>
            <GlassCard glow="neon" scan className="relative overflow-hidden p-8">
              <div className="flex items-center justify-between">
                <Badge tone="accent">
                  <BrainCircuit size={12} />
                  Neural Engine
                </Badge>
                <span className="font-mono text-xs text-slate-500">v4.2</span>
              </div>

              {/* animated neural viz */}
              <div className="relative mt-6 h-56 overflow-hidden rounded-xl border border-white/10 bg-base-900/60">
                <svg viewBox="0 0 400 220" className="h-full w-full">
                  {/* nodes */}
                  {[
                    [60, 50], [60, 110], [60, 170],
                    [200, 40], [200, 110], [200, 180],
                    [340, 70], [340, 150],
                  ].map(([x, y], i) => (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#2affde"
                      className="animate-glow-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                  {/* connections */}
                  {[
                    [60, 50, 200, 40], [60, 50, 200, 110],
                    [60, 110, 200, 40], [60, 110, 200, 110], [60, 110, 200, 180],
                    [60, 170, 200, 110], [60, 170, 200, 180],
                    [200, 40, 340, 70], [200, 110, 340, 70], [200, 110, 340, 150],
                    [200, 180, 340, 150],
                  ].map(([x1, y1, x2, y2], i) => (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke="#2affde"
                      strokeOpacity="0.25"
                      strokeWidth="1"
                    />
                  ))}
                </svg>
                <div className="scanline" />
              </div>

              {/* prediction bar */}
              <div className="mt-6 space-y-3">
                {[
                  { label: 'Cardiac event', value: 12, tone: 'bg-neon' },
                  { label: 'Glucose spike', value: 28, tone: 'bg-warning' },
                  { label: 'Med miss risk', value: 8, tone: 'bg-neon' },
                ].map((p) => (
                  <div key={p.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-400">{p.label}</span>
                      <span className="font-mono text-slate-300">{p.value}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/5">
                      <div
                        className={`h-full rounded-full ${p.tone}`}
                        style={{ width: `${p.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          {/* Right — copy */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="AI + Polygon"
              title="Two technologies, one unbreakable promise"
              subtitle="Predictive intelligence tells you what's coming. Polygon's blockchain guarantees what happened can never be rewritten."
            />

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {pillars.map((p, i) => (
                <Reveal key={p.title} delay={i * 80}>
                  <div className="group">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 transition group-hover:border-neon/30 group-hover:shadow-neon-sm">
                      <p.icon size={20} className="text-neon" />
                    </div>
                    <h3 className="mt-4 font-display text-base font-semibold text-white">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{p.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8">
              <Link to="/register">
                <NeonButton size="lg" className="group">
                  Build your secure profile
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
