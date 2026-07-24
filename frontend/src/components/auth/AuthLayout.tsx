import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, BrainCircuit, Lock } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const highlights = [
  { icon: BrainCircuit, text: 'AI predicts risk before symptoms appear' },
  { icon: ShieldCheck, text: 'Records anchored on Polygon blockchain' },
  { icon: Lock, text: 'End-to-end encrypted, HIPAA-aligned' },
];

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="relative min-h-screen lg:grid lg:grid-cols-2">
      {/* Left — brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden border-r border-white/10 bg-base-800/50 p-12 lg:flex">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-neon/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-accent/10 blur-[120px]" />

        <div className="relative z-10">
          <Logo size="md" />
        </div>

        <div className="relative z-10">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-neon/30 bg-neon/10 shadow-neon-sm">
            <Activity size={28} className="text-neon" />
          </div>
          <h2 className="font-display text-3xl font-semibold leading-tight text-white">
            Intelligent healthcare,
            <br />
            <span className="gradient-text">always on.</span>
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
            Join thousands who trust PulseGuard AI to watch over their health with
            predictive intelligence and tamper-proof records.
          </p>

          <ul className="mt-8 space-y-4">
            {highlights.map((h) => (
              <li key={h.text} className="flex items-center gap-3 text-sm text-slate-300">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neon/20 bg-neon/5">
                  <h.icon size={15} className="text-neon" />
                </div>
                {h.text}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 text-xs text-slate-500">
          © {new Date().getFullYear()} PulseGuard AI · Secured on Polygon
        </div>
      </div>

      {/* Right — form */}
      <div className="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Logo size="md" />
          </div>
          <div className="mb-8">
            <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">
              {title}
            </h1>
            <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
          </div>
          {children}
          <div className="mt-6 text-center text-sm text-slate-400">{footer}</div>
        </div>
      </div>
    </div>
  );
}
