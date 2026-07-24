import { useState } from 'react';
import { X, Pill, Clock, Check } from 'lucide-react';
import GlassCard from '@/components/ui/GlassCard';
import NeonButton from '@/components/ui/NeonButton';
import AuthInput from '@/components/auth/AuthInput';
import { type Medicine } from '@/data/mockData';

type Props = {
  onAdd: (med: Omit<Medicine, 'id' | 'status'>) => void;
};

export default function AddMedicineModal({ onAdd }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [dose, setDose] = useState('');
  const [time, setTime] = useState('');
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({ name, dose, time, icon: 'pill' });
    setDone(true);
    setTimeout(() => {
      setOpen(false);
      setDone(false);
      setName('');
      setDose('');
      setTime('');
    }, 1200);
  };

  return (
    <>
      <NeonButton onClick={() => setOpen(true)} className="group">
        <Pill size={16} className="transition-transform group-hover:rotate-12" />
        Add Medicine
      </NeonButton>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <GlassCard glow="neon" className="relative w-full max-w-md p-7">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {done ? (
              <div className="flex flex-col items-center py-8 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neon/15 border-2 border-neon/50">
                  <Check size={26} className="text-neon" />
                </div>
                <h3 className="mt-4 font-display text-lg font-semibold text-white">Medicine added</h3>
                <p className="mt-1 text-sm text-slate-400">We'll remind you when it's time.</p>
              </div>
            ) : (
              <>
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neon/10 border border-neon/30">
                    <Pill size={18} className="text-neon" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-white">Add Medicine</h3>
                    <p className="text-xs text-slate-500">Track a new medication schedule</p>
                  </div>
                </div>

                <form onSubmit={submit} className="space-y-4">
                  <AuthInput label="Medicine name" placeholder="e.g. Metformin" value={name} onChange={setName} />
                  <AuthInput label="Dosage" placeholder="e.g. 500mg" value={dose} onChange={setDose} />
                  <AuthInput
                    label="Time"
                    placeholder="e.g. 08:00"
                    icon={undefined}
                    value={time}
                    onChange={setTime}
                  />
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-400">
                    <Clock size={15} className="text-neon" />
                    Reminders enabled by default
                  </div>
                  <NeonButton type="submit" size="lg" className="w-full">
                    Add to schedule
                  </NeonButton>
                </form>
              </>
            )}
          </GlassCard>
        </div>
      )}
    </>
  );
}
