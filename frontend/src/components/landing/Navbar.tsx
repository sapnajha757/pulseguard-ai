import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Play, ChevronDown, User, Stethoscope, Users } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import NeonButton from '@/components/ui/NeonButton';
import { useAuth } from '@/context/AuthContext';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'AI + Polygon', href: '#ai-polygon' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [demoOpen, setDemoOpen] = useState(false);
  const { startDemoMode } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleDemo = (role: 'patient' | 'doctor' | 'family') => {
    startDemoMode(role);
    setDemoOpen(false);
    setOpen(false);
    if (role === 'patient') navigate('/dashboard/patient');
    else if (role === 'doctor') navigate('/dashboard/doctor');
    else navigate('/dashboard/family');
  };

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        scrolled
          ? 'border-b border-white/10 bg-base-900/80 backdrop-blur-2xl'
          : 'border-b border-transparent bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-slate-400 transition hover:text-neon"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {/* Demo Mode Dropdown */}
          <div className="relative">
            <NeonButton
              variant="outline"
              size="sm"
              onClick={() => setDemoOpen((v) => !v)}
              className="flex items-center gap-1.5 border-neon/40 text-neon hover:bg-neon/10"
            >
              <Play size={14} className="fill-neon/30 text-neon" />
              Try Demo Mode
              <ChevronDown size={14} className={`transition-transform ${demoOpen ? 'rotate-180' : ''}`} />
            </NeonButton>

            {demoOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-xl border border-white/15 bg-base-900/95 p-2 shadow-2xl backdrop-blur-xl animate-fade-in z-50">
                <div className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Interactive Previews
                </div>
                <button
                  onClick={() => handleDemo('patient')}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-neon/10 hover:text-neon transition"
                >
                  <User size={15} className="text-neon" />
                  Patient Dashboard Mock
                </button>
                <button
                  onClick={() => handleDemo('doctor')}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-neon/10 hover:text-neon transition"
                >
                  <Stethoscope size={15} className="text-accent-400" />
                  Doctor Dashboard Mock
                </button>
                <button
                  onClick={() => handleDemo('family')}
                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-slate-200 hover:bg-neon/10 hover:text-neon transition"
                >
                  <Users size={15} className="text-warning-400" />
                  Family Members Mock
                </button>
              </div>
            )}
          </div>

          <Link to="/login">
            <NeonButton variant="ghost" size="sm">Sign in</NeonButton>
          </Link>
          <Link to="/register">
            <NeonButton size="sm">Get Started</NeonButton>
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg p-2 text-slate-200 hover:bg-white/5 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-white/10 bg-base-900/95 px-4 py-6 backdrop-blur-2xl md:hidden">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-slate-300 hover:text-neon"
              >
                {l.label}
              </a>
            ))}
            <div className="mt-2 flex flex-col gap-3">
              <div className="rounded-xl border border-neon/30 bg-neon/5 p-3">
                <p className="text-xs font-semibold text-neon mb-2">⚡ Try Demo Dashboards (Mock Data):</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleDemo('patient')}
                    className="text-left text-xs text-slate-200 hover:text-neon py-1"
                  >
                    👤 Patient Dashboard Preview
                  </button>
                  <button
                    onClick={() => handleDemo('doctor')}
                    className="text-left text-xs text-slate-200 hover:text-neon py-1"
                  >
                    🩺 Doctor Dashboard Preview
                  </button>
                  <button
                    onClick={() => handleDemo('family')}
                    className="text-left text-xs text-slate-200 hover:text-neon py-1"
                  >
                    👨‍👩‍👧 Family Dashboard Preview
                  </button>
                </div>
              </div>
              <Link to="/login" onClick={() => setOpen(false)}>
                <NeonButton variant="outline" size="sm" className="w-full">Sign in</NeonButton>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <NeonButton size="sm" className="w-full">Get Started</NeonButton>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
