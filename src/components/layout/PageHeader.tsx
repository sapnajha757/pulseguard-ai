import { type ReactNode } from 'react';
import { Bell } from 'lucide-react';
import Badge from '@/components/ui/Badge';

export default function PageHeader({
  title,
  subtitle,
  action,
  badge,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  badge?: string;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {badge && (
          <Badge tone="neon" className="mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            {badge}
          </Badge>
        )}
        <h1 className="font-display text-2xl font-semibold text-white sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-xl text-sm text-slate-400">{subtitle}</p>}
      </div>
      {action && <div className="flex items-center gap-3">{action}</div>}
    </div>
  );
}

export function NotificationBell() {
  return (
    <button className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:border-neon/30 hover:text-neon">
      <Bell size={18} />
      <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-danger animate-pulse" />
    </button>
  );
}
