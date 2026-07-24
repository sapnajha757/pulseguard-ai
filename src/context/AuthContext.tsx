// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../services/auth.service';

interface User {
  id: string;
  name: string;
  email: string;
  // add other fields as needed
}

interface AuthContextProps {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
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
    localStorage.setItem('pulseguard_token', token);
    localStorage.setItem('pulseguard_user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const register = async (name: string, email: string, password: string, role: string) => {
    const { token, user } = await registerApi({ name, email, password, role });
    // Auto‑login after registration
    localStorage.setItem('pulseguard_token', token);
    localStorage.setItem('pulseguard_user', JSON.stringify(user));
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    logoutApi();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
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
