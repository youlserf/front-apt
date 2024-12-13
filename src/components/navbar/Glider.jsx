import React, { useState } from "react";
import styled from "styled-components";
import { getAvailableBadges, getUserBadgesDetail, } from "../../services/api";
import { Button } from "../../styles";
import TerminalPopup from "../TerminalPopup";
import { useAuth } from "../contexts/AuthContext";
const RadioGlider = ({ isDarkMode }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const { user } = useAuth();

  const handleOptionClick = async (optionIndex) => {
    setSelectedIndex(optionIndex);

    let fetchData;
    switch (optionIndex) {
      case 0:
        fetchData = getUserBadgesDetail(user?.id);
        break;
      case 1:
        fetchData = getAvailableBadges();
        break;
    }

    try {
      const data = await fetchData;
      setPopupData(data);
      setShowPopup(true);
      console.log("Fetched Data:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Container isDarkMode={isDarkMode}>
      <Button
        isDarkMode={isDarkMode}
        selected={selectedIndex === 0}
        onClick={() => handleOptionClick(0)}
      >
        Mis Medallas
      </Button>
      <Button
        isDarkMode={isDarkMode}
        selected={selectedIndex === 1}
        onClick={() => handleOptionClick(1)}
      >
        Medallas Disponibles
      </Button>
      <Glider style={{ transform: `translateY(${selectedIndex * 100}%)` }} />
      {showPopup && (
        <TerminalPopup onClose={handleClosePopup}>
          {popupData.length > 0 ? (
            popupData.map((item) => (
              <div key={item.id}>
                <strong>{item?.name}</strong> - Level: {item.levelRequired}
              </div>
            ))
          ) : (
            "Loading..."
          )}
        </TerminalPopup>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.isDarkMode ? "#121212" : "#f7f7f7")};
  border-radius: 12px;
  padding: 1rem;
  width: 200px;
`;



const Glider = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #f7e479;
  transition: transform 0.3s ease-in-out;
`;

export default RadioGlider;
