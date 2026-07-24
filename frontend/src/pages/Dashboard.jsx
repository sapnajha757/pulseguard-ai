import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Role-based redirect to the appropriate dashboard
export default function Dashboard() {
  const { user } = useAuth()
  const role = user?.role || 'patient'
  if (role === 'doctor') return <Navigate to="/dashboard/doctor" replace />
  if (role === 'family') return <Navigate to="/dashboard/family" replace />
  return <Navigate to="/dashboard/patient" replace />
}
