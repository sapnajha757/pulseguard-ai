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
interface AuthResponse {
  token: string;
  user: Record<string, any>;
}

export const register = async (data: RegisterPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/register', data);
  return response.data;
};

export const login = async (data: LoginPayload): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('pulseguard_token');
  localStorage.removeItem('pulseguard_user');
};
