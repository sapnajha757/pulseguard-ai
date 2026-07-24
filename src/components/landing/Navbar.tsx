import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import NeonButton from '@/components/ui/NeonButton';

const links = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how' },
  { label: 'AI + Polygon', href: '#ai-polygon' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
