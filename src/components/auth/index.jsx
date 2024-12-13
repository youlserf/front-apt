import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
const AuthContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const SwitchText = styled.p`
  text-align: center;
  color: white;
  font-size: 14px;
  margin: 5px 0;
`;

const Span = styled.span`
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;
  font-weight: 500;
  cursor: pointer;
`;

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin); 
  };

  return (
    <AuthContainer>
      {isLogin ? (
        <>
          <LoginForm />
          <SwitchText>
          ¿No tienes una cuenta aun? <Span onClick={toggleForm}>Registrate</Span>
          </SwitchText>
        </>
      ) : (
        <>
          <RegisterForm />
          <SwitchText>
            ¿Ya tienes una cuenta? <Span onClick={toggleForm}>Inicia sesión</Span>
          </SwitchText>
        </>
      )}
    </AuthContainer>
  );
};

export default Auth;
