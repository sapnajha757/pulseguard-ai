import { type ReactNode } from 'react';
import GlassCard from '@/components/ui/GlassCard';

type Props = {
  title: string;
  icon?: ReactNode;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
};

export default function Panel({ title, icon, action, children, className = '' }: Props) {
  return (
    <GlassCard className={['p-6', className].join(' ')}>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-neon">{icon}</span>}
          <h3 className="font-display text-base font-semibold text-white">{title}</h3>
        </div>
        {action}
      </div>
      {children}
    </GlassCard>
  );
}
