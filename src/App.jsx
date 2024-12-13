import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AppWrapper from './components/AppWrapper';
import Auth from './components/auth';
import { useAuth } from './components/contexts/AuthContext';
import AdminPanel from './pages/AdminPanel';
import Dashboard from './pages/Dashboard';

function App() {
  const { isAuthenticated } = useAuth();
  return (
   
      <AppWrapper>
        <Routes>
          <Route path="/" element={<Auth />} default />
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route
            path="/admin"
            element={isAuthenticated ? <AdminPanel /> : <Navigate to="/" />}
          />
        </Routes>
      </AppWrapper>
     
  );
}

export default App;
