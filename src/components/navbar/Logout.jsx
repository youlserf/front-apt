import styled from "styled-components";

import React from "react";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";

const LogoutIcon = () => {
    const {logout } = useAuth();
    const handleLogout = () => {
        logout();
      };
  return (
    <IconContainer onClick={handleLogout}>
      <FaSignOutAlt />
    </IconContainer>
  );
};


const IconContainer = styled.button`
  position: relative;
  background: #eee;
  border: 2px solid #f7e479;
  padding: 0.2rem;
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #222;
  transition: all 0.3s ease;

  &:hover {
    background: #ddd;
  }
`;

export default LogoutIcon;