import axios from 'axios';

// Create Axios instance
const api = axios.create({
  baseURL: `${import.meta.env.VITE_NODE_BACKEND_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: add auth token if exists
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: Response interceptor for handling unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expired / unauthorized — maybe redirect to login
      console.warn('Unauthorized! Redirecting to login.');
      // Example: window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
