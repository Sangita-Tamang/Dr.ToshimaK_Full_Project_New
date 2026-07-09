import axios from 'axios';

// Normalize API base URL: prefer VITE_API_URL (frontend env), and ensure it points to the API root ending with '/api'
const raw = import.meta.env.VITE_API_URL || '';
const API_BASE_URL = raw
  ? (raw.replace(/\/$/, '') + '/api')
  : '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

const normalizeApiError = (payload) => {
  if (!payload) return 'Unknown error occurred';
  if (typeof payload === 'string') return payload;
  if (typeof payload.error === 'string') return payload.error;
  if (typeof payload.message === 'string') return payload.message;
  if (payload.data) return normalizeApiError(payload.data);
  if (payload.status && payload.statusText) return `${payload.status} ${payload.statusText}`;
  return JSON.stringify(payload);
};

// Attach JWT token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally and normalize errors for React
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }

    const errorPayload = error.response?.data ?? error;
    const normalizedError = normalizeApiError(errorPayload);

    return Promise.reject({ error: normalizedError });
  }
);

export default api;
