import React from 'react';

interface Props {
  name?: string;
  email?: string;
  role?: string;
}

export default function ProfileCard({ name, email, role }: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-neon-sm">
      <h3 className="text-xl font-semibold text-white mb-2">{name || 'User'}</h3>
      <p className="text-sm text-slate-400">{email}</p>
      <p className="mt-1 text-sm text-neon">{role?.toUpperCase()}</p>
    </div>
  );
}
