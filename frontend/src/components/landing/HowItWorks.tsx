import { UserPlus, Activity, BrainCircuit, ShieldCheck } from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create your health profile',
    desc: 'Sign up, connect your wearables, and import existing records. PulseGuard builds a secure baseline in minutes.',
  },
  {
    icon: Activity,
    step: '02',
    title: 'Stream vitals continuously',
    desc: 'Heart rate, SpO₂, glucose, and medication adherence flow in around the clock — no manual entry required.',
  },
  {
    icon: BrainCircuit,
    step: '03',
    title: 'AI predicts & alerts',
    desc: 'Our models evaluate risk in real time and surface actionable alerts to you, your doctor, and your family.',
  },
  {
    icon: ShieldCheck,
    step: '04',
    title: 'Records anchored on-chain',
    desc: 'Every critical event is committed to Polygon — a permanent, tamper-proof health timeline you control.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="How It Works"
          title="From signup to safeguarded in four steps"
          subtitle="A guided onboarding that meets you where you are — whether you're a patient, a clinician, or a family member."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent lg:block" />

          <div className="grid gap-8 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.step} delay={i * 120}>
                <div className="relative">
                  <div className="relative z-10 mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-neon/30 bg-base-800 shadow-neon-sm">
                    <s.icon size={30} className="text-neon" />
                    <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-neon text-xs font-bold text-base-900">
                      {i + 1}
                    </span>
                  </div>
                  <GlassCard className="mt-6 p-6 text-center" hover glow="neon">
                    <p className="font-mono text-xs text-neon/70">{s.step}</p>
                    <h3 className="mt-2 font-display text-base font-semibold text-white">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.desc}</p>
                  </GlassCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
