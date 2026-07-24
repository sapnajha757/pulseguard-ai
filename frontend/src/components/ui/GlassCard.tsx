import { type ReactNode } from 'react';

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  glow?: 'none' | 'neon' | 'accent' | 'danger';
  hover?: boolean;
  scan?: boolean;
  as?: 'div' | 'section' | 'article';
};

const glowMap: Record<string, string> = {
  none: '',
  neon: 'shadow-neon-sm hover:shadow-neon-md',
  accent: 'shadow-neon-accent',
  danger: 'shadow-neon-danger',
};

export default function GlassCard({
  children,
  className = '',
  glow = 'none',
  hover = false,
  scan = false,
  as: Tag = 'div',
}: GlassCardProps) {
  return (
    <Tag
      className={[
        'glass relative rounded-2xl overflow-hidden transition-all duration-500',
        hover ? 'hover:bg-white/[0.06] hover:-translate-y-1 hover:border-neon/30' : '',
        glowMap[glow],
        className,
      ].join(' ')}
    >
      {scan && <span className="scanline" />}
      {children}
    </Tag>
  );
}
