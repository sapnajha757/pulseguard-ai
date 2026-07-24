// src/services/api.ts
import axios from 'axios';

// Base URL for all API calls
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1',
});

// Request interceptor – attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pulseguard_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor – handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // clear auth and redirect to login
      localStorage.removeItem('pulseguard_token');
      localStorage.removeItem('pulseguard_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);


// Request interceptor – attach JWT if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pulseguard_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
