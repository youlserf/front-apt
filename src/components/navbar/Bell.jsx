import React, { useEffect, useState } from "react";
import { FaBell } from "react-icons/fa";
import io from "socket.io-client";
import styled from "styled-components";
import { API_URL } from "../../services/config";
import { IconContainer } from "../../styles";

const Bell = ({ handleNavBell }) => {
  const [notifications, setNotifications] = useState([]);

  const [popupVisible, setPopupVisible] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    const socket = io(API_URL);

    socket.on("new_badge_request_notification", (data) => {
      setNotifications((prev) => [...prev, data]);
      setHasNewNotification(true);
    });

    return () => socket.close();
  }, []);

  return (
    <BellContainer>
      <IconContainer onClick={handleNavBell}>
        <FaBell />
        {hasNewNotification && <NotificationDot />}
      </IconContainer>
    </BellContainer>
  );
};

const BellContainer = styled.div`
  position: relative;
`;

const NotificationDot = styled.span`
  position: absolute;
  top: 10%;
  right: 10%;
  width: 0.5rem;
  height: 0.5rem;
  background: #e63946;
  border-radius: 50%;
`;

export default Bell;