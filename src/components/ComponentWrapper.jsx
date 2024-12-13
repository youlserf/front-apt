import React from 'react';
import { StyledComponentWrapper } from '../styles';
import NavBar from './navbar';

const ComponentWrapper = ({ children }) => {

  return (
    <StyledComponentWrapper>
        <NavBar/>
      <div>{children}</div>
    </StyledComponentWrapper>
  );
};

export default ComponentWrapper;
