import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import NeonButton from '@/components/ui/NeonButton';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/dashboard/patient');
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to access your intelligent health guardian."
      footer={
        <>
          New to PulseGuard?{' '}
          <Link to="/register" className="font-medium text-neon hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email address"
          type="email"
          placeholder="you@example.com"
          icon="mail"
          value={email}
          onChange={setEmail}
        />
        <AuthInput
          label="Password"
          type="password"
          placeholder="••••••••"
          icon="lock"
          value={password}
          onChange={setPassword}
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-400">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-white/20 bg-white/5 accent-neon"
            />
            Remember me
          </label>
          <a href="#" className="text-neon hover:underline">
            Forgot password?
          </a>
        </div>

        <NeonButton type="submit" size="lg" className="w-full group">
          Sign in
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </NeonButton>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-base px-3 text-xs text-slate-500">or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-slate-300 transition hover:border-neon/30 hover:text-neon"
          >
            <ShieldCheck size={16} />
            SSO
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 py-3 text-sm text-slate-300 transition hover:border-neon/30 hover:text-neon"
          >
            <span className="font-mono text-xs">⬡</span>
            Wallet
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
