import { type ReactNode } from 'react';

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'center' | 'left';
}) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {eyebrow && (
        <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neon">
          <span className="h-px w-8 bg-neon/50" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base text-slate-400 leading-relaxed sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
