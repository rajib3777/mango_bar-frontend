// src/api/client.js
import axios from 'axios';

const baseURL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

const client = axios.create({
  baseURL,
  withCredentials: true, // থাকলে সমস্যা নেই, cookie থাকলে যাবে
});

// প্রতিটা request এর আগে token বসাবে
client.interceptors.request.use((config) => {
  const token =
    localStorage.getItem('accessToken') ||
    localStorage.getItem('access_token') ||
    localStorage.getItem('access') ||
    null;

  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 401 হলে token clear করবে
client.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('accessToken');
    }
    return Promise.reject(err);
  }
);

export default client;
