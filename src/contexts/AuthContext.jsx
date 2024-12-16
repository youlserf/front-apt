import { jwtDecode } from 'jwt-decode';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as reduxLogin, logout as reduxLogout } from '../features/authSlice';
import { API_URL } from '../services/config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isLogged);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        const { sub: id, email, role } = decodedToken;
        dispatch(reduxLogin({ user: { id, email, role } }));
      } catch (error) {
        console.error('Token inválido o corrupto:', error);
        dispatch(reduxLogout());
      }
    }
  }, [dispatch]);

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
        dispatch(reduxLogin({ user: { id, email, role } }));

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
        dispatch(reduxLogin({ user: { id, email, role } }));

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
    dispatch(reduxLogout());
    navigate('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
