import {
  BrainCircuit,
  ShieldCheck,
  Bell,
  Users,
  HeartPulse,
  Lock,
} from 'lucide-react';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import Reveal from '@/components/ui/Reveal';

const features = [
  {
    icon: BrainCircuit,
    title: 'Predictive AI Risk Engine',
    desc: 'Continuous analysis of vitals and history to forecast cardiac events, glucose spikes, and medication risks before they happen.',
  },
  {
    icon: ShieldCheck,
    title: 'Blockchain-secured Records',
    desc: 'Every health event is cryptographically anchored on Polygon — immutable, auditable, and fully owned by you.',
  },
  {
    icon: Bell,
    title: 'Real-time Smart Alerts',
    desc: 'Context-aware notifications route critical events to the right person — patient, clinician, or family — in seconds.',
  },
  {
    icon: Users,
    title: 'Connected Care Circle',
    desc: 'Grant granular access to doctors and loved ones so the people who matter can act when it matters most.',
  },
  {
    icon: HeartPulse,
    title: 'Live Vitals Monitoring',
    desc: 'Stream heart rate, SpO₂, glucose, and activity from wearables into a single, beautifully simple dashboard.',
  },
  {
    icon: Lock,
    title: 'Privacy-first Architecture',
    desc: 'Zero-knowledge data handling. Your records are encrypted at rest and in transit, never sold, never shared.',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <SectionHeading
          eyebrow="Capabilities"
          title={
            <>
              Everything a modern care team needs,
              <br className="hidden sm:block" /> in one intelligent platform.
            </>
          }
          subtitle="PulseGuard AI unifies prediction, protection, and people — so health decisions happen faster and with more confidence."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <GlassCard hover glow="neon" className="h-full p-7">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neon/10 border border-neon/30 shadow-neon-sm">
                  <f.icon size={22} className="text-neon" />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-white">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-400">{f.desc}</p>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
