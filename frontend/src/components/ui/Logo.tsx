import { Activity } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const dims = {
    sm: { box: 'h-8 w-8', icon: 18, text: 'text-base' },
    md: { box: 'h-10 w-10', icon: 22, text: 'text-lg' },
    lg: { box: 'h-12 w-12', icon: 26, text: 'text-xl' },
  }[size];

  return (
    <Link to="/" className="group flex items-center gap-3">
      <div className="relative flex items-center justify-center">
        <div className={`${dims.box} rounded-xl bg-neon/10 border border-neon/40 flex items-center justify-center shadow-neon-sm transition-all group-hover:shadow-neon-md`}>
          <Activity size={dims.icon} className="text-neon" />
        </div>
        <span className="absolute inset-0 rounded-xl border border-neon/30 animate-pulse-ring" />
      </div>
      <div className="leading-none">
        <span className={`font-display font-semibold tracking-tight text-white ${dims.text}`}>
          PulseGuard
        </span>
        <span className="ml-1 font-display font-semibold neon-text">AI</span>
      </div>
    </Link>
  );
}
