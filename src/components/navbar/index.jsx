import React, { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import styled from "styled-components";
import { getBadgeRequestsStatus, updateBadgeRequestStatus } from "../../services/api";
import { Button, IconContainer } from "../../styles";
import { useAuth } from "../contexts/AuthContext";
import Bell from "./Bell";
import RadioGlider from "./Glider";
import LogoutIcon from "./Logout";
import Toggle from "./Toggle";

const NavBar = () => {
    const { user } = useAuth();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [navToggled, setNavToggled] = useState(false);
    const [navBelled, setNavBelled] = useState(false);
    const [badgeRequests, setBadgeRequests] = useState([]);
    console.log(user)
    const handleNavToggle = () => {
        setNavToggled(!navToggled);
    };

    const handleNavBell = () => {
        setNavBelled(!navToggled);
        const fetchBadgeRequests = async () => {
            const requests = await getBadgeRequestsStatus('PENDING');
            setBadgeRequests(requests);
        };

        fetchBadgeRequests();
        setPopupVisible(!popupVisible);
        setHasNewNotification(false);
    };

    const handleApprove = async (requestId) => {
        await updateBadgeRequestStatus(requestId, 'ACCEPTED');
        setBadgeRequests(badgeRequests.filter(req => req.id !== requestId));
    };

    const handleReject = async (requestId) => {
        await updateBadgeRequestStatus(requestId, 'REJECTED');
        setBadgeRequests(badgeRequests.filter(req => req.id !== requestId));
    };

    useEffect(() => {
        const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        setIsDarkMode(darkModeQuery.matches);

        const handleChange = (e) => setIsDarkMode(e.matches);
        darkModeQuery.addEventListener("change", handleChange);

        return () => darkModeQuery.removeEventListener("change", handleChange);
    }, []);

    return (
        <NavBarContainer>
            {user?.role === "USER" && !navToggled && !navBelled && (
                <Toggle handleNavToggle={handleNavToggle} />
            )}
            {user?.role === "ADMIN" && !navToggled && !navBelled && (
                <Bell handleNavBell={handleNavBell} />
            )}

            {!navToggled && !navBelled && (
                <LogoutIcon />
            )}

            {navToggled && (
                <RadioGliderContainer
                    isDarkMode={isDarkMode}
                    onMouseLeave={() => setNavToggled(false)}
                >
                    <RadioGlider isDarkMode={isDarkMode} />
                </RadioGliderContainer>
            )}

            {navBelled && (
                <div style={{ display: "flex", flexDirection: "column", gap: '10px' }}>
                    <Container isDarkMode={true}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                            <IconContainer onClick={() => setNavBelled(false)}>
                                <FaTimes />
                            </IconContainer>
                            <h3>Notificaciones</h3>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: '10px' }}>
                        {badgeRequests.length > 0 ? (
                            badgeRequests.map((request) => (
                                <StyledLi key={request.id}>
                                    <SmallText>{request.user.email} ha solicitado la medalla {request.badge.name}</SmallText>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
                                        <SmallButton onClick={() => handleApprove(request.id)}>Aprobar</SmallButton>
                                        <SmallButton onClick={() => handleReject(request.id)}>Rechazar</SmallButton>
                                    </div>
                                </StyledLi>
                            ))
                        ) : (
                            <SmallText>No hay nuevas notificaciones.</SmallText>
                        )}
                        </div>
                        
                    </Container>
                </div>
            )}

        </NavBarContainer>
    );
};

const NavBarContainer = styled.div`
  position: fixed;
  top: 1%;
  right: 1%;
  display: flex;
  align-items: center;
  gap: 10px;
  z-index: 1000;
`;

const RadioGliderContainer = styled.div`
  position: relative;
  background: ${(props) => (props.isDarkMode ? "#121212" : "#f7f7f7")};
  padding: 1rem;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;


const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  background: ${(props) => (props.isDarkMode ? "#121212" : "#f7f7f7")};
  border-radius: 12px;
  padding: 1rem;
  width: 200px;

  /* Agregar scroll y límite de altura */
  overflow-y: auto;
  max-height: 90vh;

  /* Estilos del scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: transparent;
  }
`;

const CloseButton = styled.button`
  background: #f7e479;
  color: #222;
  border: none;
  border-radius: 0.3rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background 0.2s;

  &:hover {
    background: #f7d34f;
  }
`;


const SmallButton = styled(Button)`
  font-size: 0.8rem;
  padding: 0.3rem 0.6rem;
`;

const SmallText = styled.p`
  font-size: 0.9rem;
`;

const StyledLi = styled.li`
  font-size: 0.9rem;
  list-style-type: none;
`;



export default NavBar;
