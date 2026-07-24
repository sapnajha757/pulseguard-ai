import { type ReactNode } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

type Props = {
  label: string;
  type?: string;
  placeholder?: string;
  icon?: 'mail' | 'lock';
  value: string;
  onChange: (v: string) => void;
  rightSlot?: ReactNode;
};

export default function AuthInput({
  label,
  type = 'text',
  placeholder,
  icon,
  value,
  onChange,
  rightSlot,
}: Props) {
  const [show, setShow] = useState(false);
  const inputType = type === 'password' ? (show ? 'text' : 'password') : type;
  const Icon = icon === 'mail' ? Mail : icon === 'lock' ? Lock : null;

  return (
    <label className="block">
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {label}
      </span>
      <div className="group relative">
        {Icon && (
          <Icon
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 transition group-focus-within:text-neon"
          />
        )}
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={[
            'w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm text-white placeholder:text-slate-600',
            'transition focus:border-neon/40 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-neon/20',
            Icon ? 'pl-12' : 'pl-4',
            rightSlot || type === 'password' ? 'pr-12' : 'pr-4',
          ].join(' ')}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 transition hover:text-neon"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
        {rightSlot && type !== 'password' && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
    </label>
  );
}
