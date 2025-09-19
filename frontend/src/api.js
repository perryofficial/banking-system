// src/api.js
import axios from 'axios';

const API_BASE = 'https://banking-system-5-varibles-changes.onrender.com';

const api = axios.create({
  baseURL: API_BASE + '/api',
  timeout: 8000
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) config.headers['Authorization'] = token;
  return config;
});

export default api;
