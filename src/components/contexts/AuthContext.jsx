import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../services/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      const decodedToken = jwtDecode(token); 
      const { sub: id, email, role } = decodedToken;
      setUser({ id, email, role });
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        const { sub: id, role, email } = decodedToken;

        setUser({ id, email, role });
        if (role === 'ADMIN') {
          navigate('/admin');
        } else if (role === 'USER') {
          navigate('/dashboard');
        } else {
          console.error('Rol no reconocido');
        }
      } else {
        console.error('Error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const register = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.access_token;
        localStorage.setItem('access_token', token);
        const decodedToken = jwtDecode(token);
        const { sub: id, role, email } = decodedToken;

        setUser({ id, email, role });
        if (role === 'ADMIN') {
          navigate('/admin');
        } else if (role === 'USER') {
          navigate('/dashboard');
        } else {
          console.error('Rol no reconocido');
        }
      } else {
        console.error('Error al registrar el usuario');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    setUser(null);
    navigate('/');
  };

  const isAuthenticated = Boolean(localStorage.getItem('access_token'));

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
