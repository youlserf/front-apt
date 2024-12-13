import React from 'react';
import ReactDOM from 'react-dom';
import styled, { keyframes } from 'styled-components';


const TerminalPopup = ({ children, onClose }) => {
  return ReactDOM.createPortal(
    <Overlay>
      <TerminalLoader>
        <TerminalHeader>
          <span>Status</span>
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </TerminalHeader>
        {children}
      </TerminalLoader>
    </Overlay>,
    document.body
  );
};

const blinkCursor = keyframes`
  50% {
    border-right-color: transparent;
  }
`;

const typeAndDelete = keyframes`
  0%, 10% {
    width: 0;
  }
  45%, 55% {
    width: 6.2em; /* Ajustar el ancho según el contenido */
  }
  90%, 100% {
    width: 0;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const TerminalLoader = styled.div`
  border: 0.1em solid #333;
  background-color: #1a1a1a;
  color: #0f0;
  font-family: "Courier New", Courier, monospace;
  font-size: 1em;
  padding: 1.5em 1em;
  width: 20em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  position: relative;
  box-sizing: border-box;
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2em;
  background-color: #333;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 0 1em;
  box-sizing: border-box;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #e33;
  cursor: pointer;
  font-size: 1.2em;

  &:hover {
    color: #f55;
  }
`;

const Text = styled.div`
  display: inline-block;
  white-space: nowrap;
  overflow: hidden;
  border-right: 0.2em solid green; /* Cursor */
  animation: ${typeAndDelete} 4s steps(11) infinite, ${blinkCursor} 0.5s step-end infinite alternate;
  margin-top: 1.5em;
`;

export default TerminalPopup;
