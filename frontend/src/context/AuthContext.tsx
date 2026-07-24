// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  login as loginApi,
  register as registerApi,
  logout as logoutApi,
  type AuthUser,
} from '../services/auth.service';

interface User extends AuthUser {
  isDemo?: boolean;
  connectedPatients?: string[];
  doctorDetails?: any;
  familyDetails?: any;
  diseaseInfo?: any;
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => Promise<void>;
  startDemoMode: (role: 'patient' | 'doctor' | 'family') => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Initialise from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('pulseguard_token');
    const storedUser = localStorage.getItem('pulseguard_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const { token, user } = await loginApi({ email, password });
    const fullUser = { ...user, isDemo: false };
    localStorage.setItem('pulseguard_token', token);
    localStorage.setItem('pulseguard_user', JSON.stringify(fullUser));
    setToken(token);
    setUser(fullUser);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    const { token, user } = await registerApi({ name, email, password, role });
    const fullUser = { ...user, isDemo: false };
    localStorage.setItem('pulseguard_token', token);
    localStorage.setItem('pulseguard_user', JSON.stringify(fullUser));
    setToken(token);
    setUser(fullUser);
  };

  const startDemoMode = (role: 'patient' | 'doctor' | 'family') => {
    let mockUser: User;
    if (role === 'doctor') {
      mockUser = {
        id: 'demo_doctor_999',
        name: 'Dr. Aanya Sharma (MD)',
        email: 'dr.aanya@pulseguard.ai',
        role: 'doctor',
        isDemo: true,
      };
    } else if (role === 'family') {
      mockUser = {
        id: 'demo_family_888',
        name: 'Priya Mehta (Family Observer)',
        email: 'priya.mehta@pulseguard.ai',
        role: 'family',
        isDemo: true,
      };
    } else {
      mockUser = {
        id: 'demo_patient_777',
        name: 'Aarav Mehta (Demo Patient)',
        email: 'aarav.mehta@pulseguard.ai',
        role: 'patient',
        isDemo: true,
      };
    }
    const demoToken = `demo_token_${role}_${Date.now()}`;
    localStorage.setItem('pulseguard_token', demoToken);
    localStorage.setItem('pulseguard_user', JSON.stringify(mockUser));
    setToken(demoToken);
    setUser(mockUser);
  };

  const logout = async () => {
    await logoutApi();
    localStorage.removeItem('pulseguard_token');
    localStorage.removeItem('pulseguard_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, startDemoMode }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
