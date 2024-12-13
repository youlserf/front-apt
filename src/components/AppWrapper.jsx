import React, { useState } from 'react';
import Snowfall from 'react-snowfall';
import styled from 'styled-components';

const AppWrapper = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [navToggled, setNavToggled] = useState(false);


  const styles = {
    wrapper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: 'auto',
      minHeight: '100vh',
      width: '100%',
      position: 'relative',
      backgroundColor: isDarkMode ? '#121212' : '#f0f0f0',
      color: isDarkMode ? '#fff' : '#333',
    },
    content: {
      textAlign: 'center',
      zIndex: 10,
    },
  };

  return (
    <div style={styles.wrapper}>
      <Snowfall
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        snowflakeCount={200}
      />
      <div style={styles.content}>{children}</div>
    </div>
  );
};

const NavBarContainer = styled.div`
  position: fixed;
  top: 1%;
  right: 1%;
  display: flex;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export default AppWrapper;
