import React, { useState } from 'react';
import { Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Button, Form, Input, InputForm } from '../../styles/AuthFormStyles';

const RegisterForm = () => {
  const { register } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const [success, setSuccess] = useState(null); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);  
      setSuccess('Registro exitoso. Ahora puedes iniciar sesión.'); 
      setError(null); 
    } catch (err) {
      setError('Error al registrar usuario'); 
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
      <Button type="submit">Registrar</Button>
    </Form>
  );
};

export default RegisterForm;
