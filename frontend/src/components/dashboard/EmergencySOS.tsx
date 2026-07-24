import { useState } from 'react';
import { Phone, X } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

export default function EmergencySOS() {
  const [active, setActive] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);

  const startHold = () => {
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setHoldProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setActive(true);
      }
    }, 100);
    // store to clear on mouse up
    (window as any).__sosHold = interval;
  };

  const cancelHold = () => {
    clearInterval((window as any).__sosHold);
    setHoldProgress(0);
  };

  return (
    <>
      <GlassCard glow="danger" className="relative overflow-hidden p-6">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-danger/20 blur-[80px]" />
        <div className="relative">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-white">Emergency SOS</h3>
              <p className="mt-1 text-sm text-slate-400">Hold to alert your care circle</p>
            </div>
            <Badge tone="danger">
              <span className="h-1.5 w-1.5 rounded-full bg-danger animate-pulse" />
              Ready
            </Badge>
          </div>

          <div className="mt-6 flex flex-col items-center">
            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              className="group relative flex h-28 w-28 items-center justify-center rounded-full"
              aria-label="Hold for emergency"
            >
              <span className="absolute inset-0 rounded-full border border-danger/40 animate-pulse-ring" />
              <span className="absolute inset-0 rounded-full border border-danger/30 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
              <span
                className="absolute inset-0 rounded-full bg-danger/10 transition-all"
                style={{ transform: `scale(${1 + holdProgress / 200})` }}
              />
              <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-danger/15 border-2 border-danger/50 transition group-hover:bg-danger/25 group-active:bg-danger/30">
                <Phone size={28} className="text-danger-400" />
              </span>
            </button>
            <p className="mt-4 text-xs text-slate-500">
              {holdProgress > 0 && holdProgress < 100 ? `Hold… ${holdProgress}%` : 'Press and hold'}
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <GlassCard glow="danger" className="relative w-full max-w-md p-8 text-center">
            <button
              onClick={() => setActive(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-danger/15 border-2 border-danger/50">
              <Phone size={28} className="text-danger-400" />
            </div>
            <h3 className="mt-5 font-display text-xl font-semibold text-white">
              SOS Activated
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              Your care circle and emergency services have been notified. Stay calm —
              help is on the way. Your live location and vitals are being shared.
            </p>
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-neon">
              <span className="h-2 w-2 rounded-full bg-neon animate-pulse" />
              Notifying 3 contacts…
            </div>
          </GlassCard>
        </div>
      )}
    </>
  );
}
