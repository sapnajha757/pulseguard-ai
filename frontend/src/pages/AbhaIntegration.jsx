import React, { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import NeonButton from '../components/ui/NeonButton';
import Spinner from '../components/ui/Spinner';
import { Shield, CheckCircle, Search, User, Droplet, Activity, List, Info } from 'lucide-react';

export default function AbhaIntegration() {
  const [abhaNumber, setAbhaNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');

  const handleVerify = (e) => {
    e.preventDefault();
    if (!abhaNumber || abhaNumber.replace(/-/g, '').length !== 14) {
      setError('Please enter a valid 14-digit ABHA Number.');
      return;
    }

    setError('');
    setLoading(true);

    // Mock API Verification
    setTimeout(() => {
      setLoading(false);
      setProfile({
        name: 'John Doe',
        age: 34,
        gender: 'Male',
        bloodGroup: 'O+',
        existingDiseases: ['Hypertension', 'Type 2 Diabetes'],
        allergies: ['Penicillin', 'Peanuts'],
        currentMedications: ['Metformin 500mg', 'Lisinopril 10mg']
      });
    }, 1500);
  };

  const handleFormatAbha = (e) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 14) val = val.substring(0, 14);
    
    // Format as XX-XXXX-XXXX-XXXX
    let formatted = val;
    if (val.length > 2) formatted = val.substring(0, 2) + '-' + val.substring(2);
    if (val.length > 6) formatted = formatted.substring(0, 7) + '-' + val.substring(6);
    if (val.length > 10) formatted = formatted.substring(0, 12) + '-' + val.substring(10);
    
    setAbhaNumber(formatted);
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Shield size={28} color="var(--neon)" />
            ABHA Integration
          </h1>
          <p className="page-subtitle">Connect your Ayushman Bharat Health Account to securely import your medical history.</p>
        </div>
      </header>

      <div className="two-col">
        {/* Verification Form */}
        <GlassCard glow>
          <div style={{ padding: '2rem' }}>
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Search size={18} color="var(--neon)" />
                <span className="card-title text-lg">Verify ABHA</span>
              </div>
            </div>

            <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', color: 'var(--text-secondary)', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
                  ABHA Number (14 Digits)
                </label>
                <input 
                  type="text" 
                  value={abhaNumber}
                  onChange={handleFormatAbha}
                  placeholder="XX-XXXX-XXXX-XXXX"
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '1.1rem',
                    letterSpacing: '0.05em'
                  }}
                />
                {error && <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginTop: '0.5rem' }}>{error}</div>}
              </div>

              <NeonButton type="submit" solid block disabled={loading || profile !== null}>
                {loading ? (
                  <><div className="spinner sm" style={{ borderTopColor: '#020b12', borderColor: 'rgba(2,11,18,0.3)' }} /> Verifying...</>
                ) : (
                  <>Connect ABHA</>
                )}
              </NeonButton>
            </form>

            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(42,255,222,0.05)', borderRadius: 'var(--radius-sm)', display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <Info size={16} color="var(--neon)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
                By connecting your ABHA, you authorize PulseGuard AI to securely access your centralized health records for better risk predictions.
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Profile Card */}
        <GlassCard glow={profile !== null} style={{ opacity: profile ? 1 : 0.5, pointerEvents: profile ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
          <div style={{ padding: '2rem' }}>
            <div className="card-header" style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} color={profile ? "var(--success)" : "var(--text-muted)"} />
                <span className="card-title text-lg">ABHA Profile</span>
              </div>
            </div>

            {profile ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '1.5rem' }}>
                  <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(42,255,222,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid var(--neon)' }}>
                    <User size={30} color="var(--neon)" />
                  </div>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--text-primary)' }}>{profile.name}</h2>
                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
                      <span>{profile.age} Yrs</span>
                      <span>•</span>
                      <span>{profile.gender}</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Droplet size={14} color="var(--danger)" /> {profile.bloodGroup}</span>
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      <Activity size={16} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Existing Conditions</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--warning)', fontSize: '0.95rem' }}>
                      {profile.existingDiseases.map(d => <li key={d}>{d}</li>)}
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      <Shield size={16} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Allergies</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--danger)', fontSize: '0.95rem' }}>
                      {profile.allergies.map(a => <li key={a}>{a}</li>)}
                    </ul>
                  </div>

                  <div style={{ background: 'rgba(0,0,0,0.2)', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>
                      <List size={16} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase' }}>Current Medications</span>
                    </div>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--success)', fontSize: '0.95rem' }}>
                      {profile.currentMedications.map(m => <li key={m}>{m}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
                <User size={48} strokeWidth={1} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ textAlign: 'center' }}>Connect your ABHA number to view your unified health profile.</p>
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
