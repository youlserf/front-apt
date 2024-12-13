import styled from "styled-components";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #2a2a2a;  // Fondo oscuro
  padding: 30px;
  width: 450px;
  border-radius: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);  // Sombra suave para resaltar el formulario
`;

export const InputForm = styled.div`
  border: 1.5px solid #444444;  // Borde gris oscuro
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: 0.2s ease-in-out;
  
  &:focus-within {
    border: 1.5px solid #2d79f3;  // Resaltar el borde cuando está en foco
  }
`;

export const Input = styled.input`
  margin-left: 10px;
  border-radius: 10px;
  border: none;
  width: 100%;
  height: 100%;
  background-color: #444444;  // Fondo gris oscuro para los campos de texto
  color: white;  // Texto blanco
  padding: 10px;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  margin: 20px 0 10px 0;
  background-color: #151717;  // Botón con fondo oscuro
  border: none;
  color: white;
  font-size: 15px;
  font-weight: 500;
  border-radius: 10px;
  height: 50px;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #2d79f3;  // Botón con color al pasar el mouse
  }
`;

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
`;

export const Span = styled.span`
  font-size: 14px;
  margin-left: 5px;
  color: #2d79f3;  // Color azul para los enlaces
  font-weight: 500;
  cursor: pointer;
`;

export const P = styled.p`
  text-align: center;
  color: white;  // Texto blanco en el centro
  font-size: 14px;
  margin: 5px 0;
`;

export const Btn = styled.button`
  margin-top: 10px;
  width: 100%;
  height: 50px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 500;
  gap: 10px;
  border: 1px solid #ededef;
  background-color: #333333;  // Fondo gris oscuro
  color: white;  // Texto blanco
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    background-color: #2d79f3;  // Cambio de color al pasar el mouse
  }
`;
