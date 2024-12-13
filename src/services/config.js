import axios from 'axios';
import { useAuth } from '../components/contexts/AuthContext';
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
    if (error.response && error.response.status === 401) { 
      const { logout } = useAuth(); 
      logout();
    }
    return Promise.reject(error); 
  }
);

export default api