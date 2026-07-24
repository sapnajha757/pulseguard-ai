import React from 'react';
import { Bell, AlertTriangle, CheckCircle } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import GlassCard from '@/components/ui/GlassCard';
import { formatDistanceToNow } from 'date-fns';

interface Alert {
  _id: string;
  type?: string;
  severity?: string;
  message?: string;
  createdAt?: string;
  status?: string;
}

export default function AlertCard({ alert }: { alert: Alert }) {
  if (!alert) return null;
  const severityStr = alert.severity ? alert.severity.toString().toUpperCase() : 'LOW';
  const typeStr = alert.type ? alert.type.toString().toLowerCase() : 'alert';
  const statusStr = alert.status ? alert.status.toString().toUpperCase() : 'ACTIVE';

  const severityTone = {
    HIGH: 'danger',
    MEDIUM: 'warning',
    LOW: 'neutral',
  }[severityStr] || 'neutral';

  const Icon = () => {
    switch (typeStr) {
      case 'emergency':
        return <AlertTriangle size={16} className="text-danger" />;
      case 'reminder':
        return <Bell size={16} className="text-neon" />;
      default:
        return <CheckCircle size={16} className="text-accent" />;
    }
  };

  const formattedTime = () => {
    try {
      return alert.createdAt ? formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true }) : 'Recently';
    } catch {
      return 'Recently';
    }
  };

  return (
    <GlassCard glow={severityTone as any} scan className="p-4">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/5">
          <Icon />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-medium text-white">{alert.type || 'System'} alert</p>
            <Badge tone={severityTone as any}>{severityStr}</Badge>
          </div>
          <p className="mt-1 text-sm text-slate-300">{alert.message || 'No details provided.'}</p>
          <p className="mt-1 text-xs text-slate-500">{formattedTime()}</p>
        </div>
        <span className="text-xs uppercase text-slate-400 self-center">{statusStr}</span>
      </div>
    </GlassCard>
  );
}
