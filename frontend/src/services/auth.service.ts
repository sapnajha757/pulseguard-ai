// src/services/auth.service.ts
import api from './api';

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role?: string;
}
interface LoginPayload {
  email: string;
  password: string;
}
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role?: string;
}
interface AuthResponse {
  token: string;
  user: AuthUser;
}

export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
  } catch {
    // Local credentials are cleared even if the session is already unavailable.
  }
  localStorage.removeItem('pulseguard_token');
  localStorage.removeItem('pulseguard_user');
};
