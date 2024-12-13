import React, { useState } from 'react';
import BadgeComponent from '../components/badge';
import BadgeRequestComponent from '../components/badge-request';
import ComponentWrapper from '../components/ComponentWrapper';

const AdminPanel = () => {
  const [activeButton, setActiveButton] = useState('badgeRequests'); 

  const handleShowBadgeRequests = () => {
    setActiveButton('badgeRequests');
  };

  const handleShowBadges = () => {
    setActiveButton('badges');
  };

  return (
    <ComponentWrapper>
      <nav className="navbar" style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 10 }}>
        <form className="form-inline" style={{ display: 'flex', gap: '10px' }}>
          <button
            className={`btn ${activeButton === 'badgeRequests' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
            type="button"
            onClick={handleShowBadgeRequests}
          >
            Solicitudes de Medallas
          </button>
          <button
            className={`btn ${activeButton === 'badges' ? 'btn-outline-success' : 'btn-outline-secondary'}`}
            type="button"
            onClick={handleShowBadges}
          >
            Medallas
          </button>
        </form>
      </nav>

      {activeButton === 'badgeRequests' && <BadgeRequestComponent />}
      {activeButton === 'badges' && <BadgeComponent />}
    </ComponentWrapper>
  );
};

export default AdminPanel;
