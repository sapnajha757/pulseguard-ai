import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AuroraBackground from '@/components/ui/AuroraBackground';
import ProtectedRoute from '@/routes/ProtectedRoute';
import LandingPage from '@/pages/LandingPage';

import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import PatientDashboard from '@/pages/PatientDashboard';
import DoctorDashboard from '@/pages/DoctorDashboard';
import FamilyDashboard from '@/pages/FamilyDashboard';

function App() {
  return (
    <BrowserRouter>
      <AuroraBackground />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}> 
          <Route path="/dashboard/patient/*" element={<PatientDashboard />} />
          <Route path="/dashboard/doctor/*" element={<DoctorDashboard />} />
          <Route path="/dashboard/family/*" element={<FamilyDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
