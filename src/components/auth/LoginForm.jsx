import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { Button, Form, Input, InputForm } from '../../styles/AuthFormStyles';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);  
      setSuccess('Inicio de sesión exitoso');  
      setError(null); 
    } catch (err) {
      setError('Correo o contraseña incorrectos'); 
      setSuccess(null);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      <InputForm>
        <Input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </InputForm>
      <InputForm>
        <Input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </InputForm>
      <Button type="submit">Iniciar Sesion</Button>
    </Form>
  );
};

export default LoginForm;
