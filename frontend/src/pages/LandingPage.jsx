import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  Activity, Shield, Brain, Zap, Heart, Lock, Bell, Users,
  ArrowRight, CheckCircle, Cpu, Globe, Database
} from 'lucide-react'

const features = [
  {
    icon: Brain,
    title: 'AI Risk Prediction',
    desc: 'Our machine learning models analyze vitals and adherence patterns to predict health risks before they become critical.',
    color: 'var(--neon)',
    bg: 'rgba(42,255,222,0.08)',
  },
  {
    icon: Zap,
    title: 'Real-time Monitoring',
    desc: 'Live health data streams with instant alerts to patients, doctors, and family members simultaneously.',
    color: 'var(--warning)',
    bg: 'rgba(255,181,71,0.08)',
  },
  {
    icon: Shield,
    title: 'Blockchain Security',
    desc: 'All health records are cryptographically secured on-chain, ensuring tamper-proof audit trails and privacy.',
    color: 'var(--purple)',
    bg: 'rgba(168,85,247,0.08)',
  },
  {
    icon: Pill,
    title: 'Smart Medication Tracking',
    desc: 'Never miss a dose. Intelligent reminders adapt to your schedule and log adherence automatically.',
    color: 'var(--success)',
    bg: 'rgba(0,230,118,0.08)',
  },
  {
    icon: Bell,
    title: 'Emergency Alerts',
    desc: 'One-touch emergency notifications alert your care team and family instantly with your location and health status.',
    color: 'var(--danger)',
    bg: 'rgba(255,61,90,0.08)',
  },
  {
    icon: Users,
    title: 'Family Connect',
    desc: 'Keep your loved ones informed with a dedicated family portal showing real-time patient health summaries.',
    color: 'var(--neon)',
    bg: 'rgba(42,255,222,0.08)',
  },
]

// Missing import for Pill
import { Pill } from 'lucide-react'

const stats = [
  { value: '98.7%', label: 'Uptime reliability' },
  { value: '< 2s', label: 'Alert response time' },
  { value: '50k+', label: 'Patients monitored' },
  { value: '256-bit', label: 'Encryption standard' },
]

const steps = [
  { num: '01', title: 'Create Account', desc: 'Sign up as a patient, doctor, or family member in under 2 minutes.' },
  { num: '02', title: 'Add Your Medications', desc: 'Input your prescription details and set personalized reminders.' },
  { num: '03', title: 'Get AI Insights', desc: 'Our AI continuously analyzes your data and surfaces actionable insights.' },
  { num: '04', title: 'Stay Protected', desc: 'Your care team and family receive instant alerts if anything needs attention.' },
]

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '8rem 2rem 4rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Animated grid bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          backgroundImage: 'linear-gradient(rgba(42,255,222,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(42,255,222,0.04) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
        }} />
        {/* Glow orbs */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(42,255,222,0.08) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '15%',
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(168,85,247,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 800, margin: '0 auto' }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.375rem 1rem',
            borderRadius: 999,
            background: 'rgba(42,255,222,0.08)',
            border: '1px solid rgba(42,255,222,0.25)',
            color: 'var(--neon)',
            fontSize: '0.8rem',
            fontWeight: 600,
            marginBottom: '1.5rem',
            animation: 'fade-in 0.6s ease both',
            letterSpacing: '0.05em',
          }}>
            <Cpu size={13} />
            AI + BLOCKCHAIN POWERED HEALTHCARE
          </div>

          <h1 style={{
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            marginBottom: '1.5rem',
            animation: 'slide-in-up 0.7s ease both',
            animationDelay: '0.1s',
          }}>
            Your Health,{' '}
            <span style={{
              color: 'var(--neon)',
              textShadow: '0 0 30px rgba(42,255,222,0.5), 0 0 60px rgba(42,255,222,0.2)',
            }}>
              Intelligently
            </span>{' '}
            Guarded
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '0 auto 2.5rem',
            lineHeight: 1.7,
            animation: 'slide-in-up 0.7s ease both',
            animationDelay: '0.2s',
          }}>
            PulseGuard AI combines cutting-edge artificial intelligence with blockchain security
            to deliver real-time health monitoring, medication tracking, and predictive risk assessment.
          </p>

          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            animation: 'slide-in-up 0.7s ease both', animationDelay: '0.3s',
          }}>
            <Link to="/login" className="btn-neon solid lg" style={{ textDecoration: 'none' }}>
              <Activity size={18} />
              Start Monitoring Free
              <ArrowRight size={16} />
            </Link>
            <Link to="/login" className="btn-neon lg" style={{ textDecoration: 'none' }}>
              <Shield size={16} />
              Sign In
            </Link>
          </div>

          {/* Stats row */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem', marginTop: '4rem',
            animation: 'fade-in 1s ease both', animationDelay: '0.5s',
          }} className="hero-stats">
            {stats.map(s => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', fontWeight: 800, color: 'var(--neon)', fontFamily: "'Space Grotesk', sans-serif" }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          color: 'var(--text-muted)', fontSize: '0.75rem',
          animation: 'float 2s ease-in-out infinite',
        }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(transparent, var(--neon))' }} />
          <span>Scroll to explore</span>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-block', padding: '0.3rem 0.875rem',
              background: 'rgba(42,255,222,0.06)', border: '1px solid rgba(42,255,222,0.2)',
              borderRadius: 999, color: 'var(--neon)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase',
            }}>Features</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Everything your health needs
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              A comprehensive suite of AI-powered tools designed for patients, physicians, and families.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {features.map((f, i) => (
              <div key={f.title} className="glass-card glow" style={{
                padding: '1.75rem',
                animationDelay: `${i * 0.1}s`,
                transition: 'transform 0.3s',
              }}
                onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: f.bg,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '1.25rem',
                  border: `1px solid ${f.color}22`,
                }}>
                  <f.icon size={22} color={f.color} />
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.625rem', color: 'var(--text-primary)' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '6rem 2rem', background: 'rgba(42,255,222,0.02)', borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
            <div style={{
              display: 'inline-block', padding: '0.3rem 0.875rem',
              background: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.2)',
              borderRadius: 999, color: 'var(--purple)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.08em', marginBottom: '1rem', textTransform: 'uppercase',
            }}>How It Works</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
              Up and running in minutes
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {steps.map((step, i) => (
              <div key={step.num} style={{ textAlign: 'center', position: 'relative' }}>
                {i < steps.length - 1 && (
                  <div style={{
                    position: 'absolute', top: 28, left: '60%', width: '80%', height: 1,
                    background: 'linear-gradient(90deg, var(--border-subtle), transparent)',
                    display: window.innerWidth < 640 ? 'none' : 'block',
                  }} />
                )}
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: 'rgba(42,255,222,0.08)',
                  border: '2px solid rgba(42,255,222,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 1.25rem',
                  color: 'var(--neon)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800, fontSize: '1rem',
                  boxShadow: '0 0 16px rgba(42,255,222,0.15)',
                }}>
                  {step.num}
                </div>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{step.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" style={{ padding: '6rem 2rem' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '3rem', alignItems: 'center' }}>
          <div>
            <div style={{
              display: 'inline-block', padding: '0.3rem 0.875rem',
              background: 'rgba(42,255,222,0.06)', border: '1px solid rgba(42,255,222,0.2)',
              borderRadius: 999, color: 'var(--neon)', fontSize: '0.75rem', fontWeight: 600,
              letterSpacing: '0.08em', marginBottom: '1.5rem', textTransform: 'uppercase',
            }}>About</div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.25rem)', marginBottom: '1.25rem' }}>
              Built for the future of healthcare
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '1rem', fontSize: '0.95rem' }}>
              PulseGuard AI was founded by a team of physicians, AI researchers, and blockchain engineers
              on a mission to make proactive healthcare accessible to everyone.
            </p>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.75, fontSize: '0.95rem' }}>
              By combining the predictive power of AI with the security of blockchain, we ensure that
              your health data is always private, always accurate, and always actionable.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
              {['HIPAA Compliant', 'GDPR Ready', 'SOC 2 Type II Certified', 'Open Source Core'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={16} color="var(--neon)" />
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { icon: Cpu, title: 'AI Engine', desc: 'Trained on 10M+ anonymized health records', color: 'var(--neon)' },
              { icon: Database, title: 'Blockchain Layer', desc: 'Immutable records secured on decentralized ledger', color: 'var(--purple)' },
              { icon: Globe, title: 'Global Network', desc: 'Available in 45+ countries with 24/7 support', color: 'var(--warning)' },
            ].map(item => (
              <div key={item.title} className="glass-card glow" style={{ padding: '1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 10, flexShrink: 0,
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <item.icon size={18} color={item.color} />
                </div>
                <div>
                  <div style={{ fontWeight: 600, marginBottom: '0.25rem', fontSize: '0.9rem' }}>{item.title}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '6rem 2rem',
        textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(42,255,222,0.04) 0%, rgba(168,85,247,0.04) 100%)',
        borderTop: '1px solid var(--border-subtle)',
      }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--neon), #00b4d8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 0 30px rgba(42,255,222,0.4)',
          }}>
            <Heart size={28} color="#020b12" fill="#020b12" />
          </div>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1rem' }}>
            Ready to take control of your health?
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: 1.7, fontSize: '1rem' }}>
            Join thousands of patients and doctors already using PulseGuard AI to monitor, predict, and prevent health issues.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/login" className="btn-neon solid lg" style={{ textDecoration: 'none' }}>
              <Activity size={18} />
              Get Started Free
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '2rem',
        borderTop: '1px solid var(--border-subtle)',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Activity size={14} color="var(--neon)" />
          <span style={{ color: 'var(--text-secondary)', fontWeight: 600 }}>PulseGuard AI</span>
        </div>
        <p>© 2026 PulseGuard AI. All rights reserved. Your health data is protected and private.</p>
      </footer>

      <style>{`
        @media (max-width: 640px) {
          .hero-stats { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  )
}
