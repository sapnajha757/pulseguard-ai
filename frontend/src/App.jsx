import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { Web3Provider } from './context/Web3Context'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout'

// Public pages
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import Register from './pages/Register'

// Role dashboards
import Dashboard from './pages/Dashboard'
import PatientDashboard from './pages/PatientDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import FamilyDashboard from './pages/FamilyDashboard'

// Feature pages
import Medicines from './pages/Medicines'
import Risk from './pages/Risk'
import Alerts from './pages/Alerts'
import Profile from './pages/Profile'
import AbhaIntegration from './pages/AbhaIntegration'

export default function App() {
  return (
    <Web3Provider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<Layout />}>
                {/* Role redirect */}
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Role dashboards */}
                <Route path="/dashboard/patient" element={<PatientDashboard />} />
                <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
                <Route path="/dashboard/family" element={<FamilyDashboard />} />
                {/* Feature pages */}
                <Route path="/medicines" element={<Medicines />} />
                <Route path="/risk" element={<Risk />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/abha" element={<AbhaIntegration />} />
              </Route>
            </Route>

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </Web3Provider>
  )
}
