import { type ReactNode, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Pill,
  Activity,
  Bell,
  Users,
  LogOut,
  Menu,
  X,
  Settings,
  HeartPulse,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { useAuth } from '@/context/AuthContext';

type NavItem = {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
};

const navByRole: Record<string, NavItem[]> = {
  patient: [
    { to: '/dashboard/patient', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/patient/medications', label: 'Medications', icon: Pill },
    { to: '/dashboard/patient/clinical-setup', label: 'Doctor & Disease Setup', icon: HeartPulse },
    { to: '/dashboard/patient/activity', label: 'Activity', icon: Activity },
    { to: '/dashboard/patient/alerts', label: 'Alerts', icon: Bell },
    { to: '/dashboard/patient/family', label: 'Family Access', icon: Users },
    { to: '/dashboard/patient/settings', label: 'Settings', icon: Settings },
  ],
  doctor: [
    { to: '/dashboard/doctor', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/doctor/patients', label: 'Patients', icon: Users },
    { to: '/dashboard/doctor/alerts', label: 'Alerts', icon: Bell },
    { to: '/dashboard/doctor/reports', label: 'Reports', icon: Activity },
    { to: '/dashboard/doctor/settings', label: 'Settings', icon: Settings },
  ],
  family: [
    { to: '/dashboard/family', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/family/alerts', label: 'Alerts', icon: Bell },
    { to: '/dashboard/family/medications', label: 'Medications', icon: Pill },
    { to: '/dashboard/family/contacts', label: 'Emergency', icon: HeartPulse },
    { to: '/dashboard/family/settings', label: 'Settings', icon: Settings },
  ],
};

const roleLabels: Record<string, string> = {
  patient: 'Patient',
  doctor: 'Clinician',
  family: 'Family',
};

export default function DashboardLayout({
  role,
  children,
}: {
  role: 'patient' | 'doctor' | 'family';
  children: ReactNode;
}) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const items = navByRole[role];

  // Derive dynamic user profile name
  const profileName = user?.name || (role === 'doctor' ? 'Medical Clinician' : role === 'family' ? 'Family Member' : 'Patient');

  return (
    <div className="relative min-h-screen">
      {/* Sidebar */}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/10 bg-base-800/80 backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-6 py-6">
            <Logo size="sm" />
            <button
              onClick={() => setOpen(false)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white lg:hidden"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="px-4">
            <div className="glass rounded-xl px-4 py-3">
              <p className="text-xs uppercase tracking-wider text-slate-500">{roleLabels[role]}</p>
              <p className="mt-0.5 text-sm font-medium text-white">{profileName}</p>
            </div>
          </div>

          <nav className="mt-6 flex-1 space-y-1 px-4">
            {items.map((item) => {
              const active =
                location.pathname === item.to ||
                (item.to !== `/dashboard/${role}` && location.pathname.startsWith(item.to));
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className={[
                    'group flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-all duration-300',
                    active
                      ? 'bg-neon/10 text-neon border border-neon/30 shadow-neon-sm'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white border border-transparent',
                  ].join(' ')}
                >
                  <item.icon
                    size={18}
                    className={active ? 'text-neon' : 'text-slate-500 group-hover:text-neon/70'}
                  />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          <div className="px-4 pb-6">
            <button
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 transition-all hover:bg-danger/10 hover:text-danger-400"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-base-800/80 px-4 py-4 backdrop-blur-xl lg:hidden">
        <Logo size="sm" />
        <button
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-slate-300 hover:bg-white/5"
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Main */}
      <main className="lg:pl-72">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">{children}</div>
      </main>
    </div>
  );
}
