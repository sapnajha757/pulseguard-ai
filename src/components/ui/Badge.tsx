import { type ReactNode } from 'react';

type Tone = 'neon' | 'accent' | 'danger' | 'warning' | 'neutral';

const tones: Record<Tone, string> = {
  neon: 'bg-neon/10 text-neon border-neon/30',
  accent: 'bg-accent/10 text-accent-400 border-accent/30',
  danger: 'bg-danger/10 text-danger-400 border-danger/30',
  warning: 'bg-warning/10 text-warning-400 border-warning/30',
  neutral: 'bg-white/5 text-slate-300 border-white/15',
};

export default function Badge({
  children,
  tone = 'neutral',
  className = '',
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide',
        tones[tone],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
