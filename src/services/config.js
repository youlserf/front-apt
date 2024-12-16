import axios from 'axios';
import { logout } from '../../src/features/authSlice';
import store from '../../src/store';

export const API_URL = 'http://localhost:4000';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      store.dispatch(logout());
      alert("Tu token a expirado a es invalido")
    }
    return Promise.reject(error);
  }
);

export default api;
