import { useEffect, useState } from 'react'
import { createMedicine, deleteMedicine, getMedicines, logAdherence } from '../api/medicines'
import GlassCard from '../components/ui/GlassCard'
import Badge from '../components/ui/Badge'
import NeonButton from '../components/ui/NeonButton'
import Spinner from '../components/ui/Spinner'
import { Pill, Plus, CheckCircle, XCircle, Trash2 } from 'lucide-react'

const emptyForm = {
  name: '', dosageAmount: '', dosageUnit: 'mg',
  timesPerDay: '1', times: '08:00', condition: '', prescribedBy: '',
  startDate: new Date().toISOString().slice(0, 10),
}

export default function Medicines() {
  const [medicines, setMedicines] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  async function load() {
    setLoading(true)
    try {
      const res = await getMedicines()
      setMedicines(res.data ?? [])
    } catch (err) { setError(err.message) }
    finally { setLoading(false) }
  }

  useEffect(() => { load() }, [])

  async function handleCreate(e) {
    e.preventDefault(); setError('')
    try {
      await createMedicine({
        name: form.name,
        dosage: { amount: Number(form.dosageAmount), unit: form.dosageUnit },
        frequency: { timesPerDay: Number(form.timesPerDay), times: form.times.split(',').map(t => t.trim()) },
        startDate: form.startDate, condition: form.condition, prescribedBy: form.prescribedBy,
      })
      setForm(emptyForm); setShowForm(false); load()
    } catch (err) { setError(err.message) }
  }

  async function handleLog(id, status) { await logAdherence(id, status); load() }
  async function handleDelete(id) { if (confirm('Remove this medicine?')) { await deleteMedicine(id); load() } }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <h1 className="page-title" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Pill size={28} color="var(--neon)" />
            Medicines
          </h1>
          <p className="page-subtitle">Track your prescriptions and daily adherence</p>
        </div>
        <NeonButton solid onClick={() => setShowForm(!showForm)}>
          <Plus size={15} />
          {showForm ? 'Cancel' : 'Add Medicine'}
        </NeonButton>
      </header>

      {error && (
        <div style={{ padding: '0.75rem 1rem', marginBottom: '1rem', background: 'rgba(255,61,90,0.08)', border: '1px solid rgba(255,61,90,0.25)', borderRadius: 8, color: 'var(--danger)', fontSize: '0.875rem' }}>
          {error}
        </div>
      )}

      {showForm && (
        <GlassCard glow style={{ marginBottom: '1.5rem' }}>
          <div style={{ padding: '1.5rem' }}>
            <h3 style={{ color: 'var(--neon)', marginBottom: '1.25rem', fontSize: '0.95rem', fontWeight: 600 }}>New Medicine</h3>
            <form onSubmit={handleCreate}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '0.875rem', marginBottom: '1rem' }}>
                {[
                  { l: 'Medicine Name', f: 'name', t: 'text', r: true },
                  { l: 'Dosage Amount', f: 'dosageAmount', t: 'number', r: true },
                  { l: 'Condition', f: 'condition', t: 'text' },
                  { l: 'Prescribed By', f: 'prescribedBy', t: 'text' },
                  { l: 'Start Date', f: 'startDate', t: 'date' },
                  { l: 'Schedule (HH:MM, ...)', f: 'times', t: 'text' },
                ].map(f => (
                  <label key={f.f}>
                    {f.l}
                    <input type={f.t} value={form[f.f]} required={f.r}
                      onChange={e => setForm(p => ({ ...p, [f.f]: e.target.value }))} />
                  </label>
                ))}
                <label>Unit
                  <select value={form.dosageUnit} onChange={e => setForm(p => ({ ...p, dosageUnit: e.target.value }))}>
                    <option>mg</option><option>ml</option><option>tablet</option>
                  </select>
                </label>
                <label>Times per Day
                  <input type="number" min="1" value={form.timesPerDay} onChange={e => setForm(p => ({ ...p, timesPerDay: e.target.value }))} />
                </label>
              </div>
              <NeonButton type="submit" solid size="sm">Save Medicine</NeonButton>
            </form>
          </div>
        </GlassCard>
      )}

      {loading ? (
        <div className="loading-inline"><Spinner /><span>Loading medicines...</span></div>
      ) : medicines.length === 0 ? (
        <GlassCard>
          <div className="empty-state">
            <div className="empty-state-icon"><Pill size={40} /></div>
            <p>No medicines yet. Add your first prescription above.</p>
          </div>
        </GlassCard>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
          {medicines.map((med, i) => {
            const lastLog = med.adherenceLog?.[med.adherenceLog.length - 1]
            const status = lastLog?.status
            return (
              <GlassCard key={med._id} glow className="medicine-card" style={{ animationDelay: `${i * 70}ms`, borderColor: status === 'taken' ? 'rgba(0,230,118,0.2)' : status === 'missed' ? 'rgba(255,61,90,0.2)' : 'var(--border-subtle)' }}>
                <div style={{ padding: '1.25rem' }}>
                  <div className="medicine-card-header">
                    <div>
                      <div className="medicine-name">{med.name}</div>
                      <div className="medicine-dose">{med.dosage?.amount} {med.dosage?.unit} · {med.frequency?.timesPerDay}x/day</div>
                    </div>
                    <Badge variant={med.isActive ? 'success' : 'neutral'}>{med.isActive ? 'Active' : 'Inactive'}</Badge>
                  </div>
                  <div className="medicine-meta">
                    <div className="medicine-meta-item"><dt>Condition</dt><dd>{med.condition || '—'}</dd></div>
                    <div className="medicine-meta-item"><dt>Schedule</dt><dd>{(med.frequency?.times ?? []).join(', ') || '—'}</dd></div>
                    <div className="medicine-meta-item"><dt>Doctor</dt><dd>{med.prescribedBy || '—'}</dd></div>
                  </div>
                  <div className="medicine-actions">
                    <NeonButton variant="success" solid size="sm" onClick={() => handleLog(med._id, 'taken')}>
                      <CheckCircle size={13} />Mark Taken
                    </NeonButton>
                    <NeonButton variant="danger" size="sm" onClick={() => handleLog(med._id, 'missed')}>
                      <XCircle size={13} />Mark Missed
                    </NeonButton>
                    <NeonButton variant="ghost" size="sm" iconOnly onClick={() => handleDelete(med._id)}>
                      <Trash2 size={13} />
                    </NeonButton>
                  </div>
                  {status && (
                    <div style={{ marginTop: '0.75rem', padding: '0.5rem 0.75rem', borderRadius: 6, background: status === 'taken' ? 'rgba(0,230,118,0.08)' : 'rgba(255,61,90,0.08)', fontSize: '0.75rem', color: status === 'taken' ? 'var(--success)' : 'var(--danger)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                      {status === 'taken' ? <CheckCircle size={12} /> : <XCircle size={12} />}
                      Last: <strong>{status}</strong>
                    </div>
                  )}
                </div>
              </GlassCard>
            )
          })}
        </div>
      )}
    </div>
  )
}
