import React from 'react';
import styled from 'styled-components';

const FlipCardComponent = ({ pokemonName, imageUrl }) => {
  return (
    <CardContainer>
      <CardInner>
        <CardFront>
          <Title>{pokemonName}</Title>
          <p>Hover Me</p>
        </CardFront>
        <CardBack>
          <Image src={imageUrl} alt="Pokemon" />
        </CardBack>
      </CardInner>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  background-color: transparent;
  width: 190px;
  height: 254px;
  perspective: 1000px;
  font-family: sans-serif;
`;

const CardInner = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const CardFront = styled.div`
  box-shadow: 0 8px 14px 0 rgba(0, 0, 0, 0.3); /* Aumenta la sombra para un efecto más oscuro */
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border: 1px solid #333; /* Cambiar el borde a un color más oscuro */
  border-radius: 1rem;
  background: linear-gradient(
    120deg,
    #333 60%, /* Color base más oscuro */
    #444 88%,  /* Colores más oscuros en el gradiente */
    #555 40%,  /* Para dar variedad en el gradiente */
    rgba(0, 0, 0, 0.7) 48% /* Ajusta para un fondo más profundo */
  );
  color: #fff; /* Cambiar el color del texto a blanco para mayor contraste */
  z-index: 2; /* Para que el frente siempre quede encima cuando la tarjeta gire */
`;


const CardBack = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: transparent; /* Hacemos el fondo transparente */
  transform: rotateY(180deg);
  /* En el estado "hover", la tarjeta será transparente, dejando ver solo la imagen */
  &:hover {
    background: transparent;
  }
`;

const Title = styled.p`
  font-size: 1.5em;
  font-weight: 900;
  text-align: center;
  margin: 0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`;

export default FlipCardComponent;
