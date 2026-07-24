import { Activity, Github, Twitter, Linkedin } from 'lucide-react';
import Logo from '@/components/ui/Logo';

const columns = [
  {
    title: 'Platform',
    links: ['Features', 'How It Works', 'AI + Polygon', 'Pricing', 'Changelog'],
  },
  {
    title: 'For',
    links: ['Patients', 'Clinicians', 'Families', 'Hospitals', 'Developers'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Contact', 'Partners'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'HIPAA', 'Security', 'Status'],
  },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-base-900/60">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* brand */}
          <div>
            <Logo size="md" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              PulseGuard AI is the intelligent health guardian that predicts, protects,
              and connects — powered by neural models and Polygon-secured records.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-400 transition hover:border-neon/30 hover:text-neon"
                  aria-label="Social link"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 transition hover:text-neon"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PulseGuard AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-pulse" />
            All systems operational
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Activity size={14} className="text-neon" />
            Secured on Polygon
          </div>
        </div>
      </div>
    </footer>
  );
}
