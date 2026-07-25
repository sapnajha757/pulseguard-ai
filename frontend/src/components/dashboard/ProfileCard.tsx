import React from 'react';

interface Props {
  name?: string;
  email?: string;
  role?: string;
  abhaId?: string;
}

export default function ProfileCard({ name, email, role, abhaId }: Props) {
  // Use provided abhaId or a fallback mock one for showoff purposes
  const displayAbhaId = abhaId || '91-XXXX-XXXX-XXXX';

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-6 shadow-neon-sm">
      <h3 className="text-xl font-semibold text-white mb-2">{name || 'User'}</h3>
      <p className="text-sm text-slate-400">{email}</p>
      {role === 'patient' && (
        <p className="mt-1 text-sm font-medium text-emerald-400">
          ABHA ID: <span className="font-mono">{displayAbhaId}</span>
        </p>
      )}
      <p className="mt-1 text-sm text-neon">{role?.toUpperCase()}</p>
    </div>
  );
}
