import React from "react";
import { FaBars } from "react-icons/fa";
import { IconContainer } from "../../styles";

const Toggle = ({ handleNavToggle }) => {
  return (
    <IconContainer onClick={handleNavToggle}>
      <FaBars />
    </IconContainer>
  );
};

export default Toggle;
