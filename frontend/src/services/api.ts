// src/services/api.ts
import axios from 'axios';

// Base URL for all API calls
// Uses VITE_API_URL env var if set, otherwise falls back to production Render backend
const PRODUCTION_API = 'https://pulseguard-ai-v86p.onrender.com/api/v1';

const getBaseURL = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  // If VITE_API_URL is invalid or accidentally set to dashboard.render.com, use correct backend API
  if (!envUrl || envUrl.includes('dashboard.render.com')) {
    return import.meta.env.DEV ? 'http://localhost:5000/api/v1' : PRODUCTION_API;
  }
  let url = envUrl.trim();
  if (!url.endsWith('/api/v1')) {
    url = url.replace(/\/+$/, '') + '/api/v1';
  }
  return url;
};

const api = axios.create({
  baseURL: getBaseURL(),
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

export default api;
