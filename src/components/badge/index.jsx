import { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import TerminalPopup from '../../components/TerminalPopup';
import { createBadge, deleteBadge, getBadges, updateBadge } from '../../services/badgeService';
import { ScrollableTableWrapper, StyledCardWrapper } from '../../styles';
import BadgeForm from './BadgeForm';

const BadgeComponent = () => {
  const [badges, setBadges] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [editingBadge, setEditingBadge] = useState(null);

  useEffect(() => {
    const loadBadges = async () => {
      try {
        const fetchedBadges = await getBadges();
        setBadges(fetchedBadges);
      } catch (error) {
        console.error('Error loading badges', error);
      }
    };

    loadBadges();
  }, []);

  const handleCreateBadge = async (badgeData) => {
    try {
      const createdBadge = await createBadge(badgeData);
      setBadges((prevBadges) => [...prevBadges, createdBadge]);
    } catch (error) {
      console.error('Error creating badge', error);
    }
  };

  const handleUpdateBadge = async (badgeData) => {
    try {
      const updatedBadge = await updateBadge(editingBadge.id, badgeData);
      setBadges((prevBadges) =>
        prevBadges.map((badge) => (badge.id === editingBadge.id ? updatedBadge : badge))
      );
    } catch (error) {
      console.error('Error updating badge', error);
    }
  };

  const handleDeleteBadge = async (id) => {
    try {
      await deleteBadge(id);
      setBadges((prevBadges) => prevBadges.filter((badge) => badge.id !== id));
    } catch (error) {
      console.error('Error deleting badge', error);
    }
  };

  const handleCreateClick = () => {
    setEditingBadge(null);
    setShowPopup(true);
  };

  const handleEditClick = (badge) => {
    setEditingBadge(badge);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  // Dividir los badges en bloques de 10
  const badgeChunks = [];
  for (let i = 0; i < badges.length; i += 10) {
    badgeChunks.push(badges.slice(i, i + 10));
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Administracion de medallas</h2>
      <Button variant="warning" onClick={handleCreateClick} style={styles.button}>
        Crear nueva medalla
      </Button>

  
      <StyledCardWrapper style={{gridAutoRows: '40rem', gridTemplateColumns: 'repeat(auto-fill, minmax(25rem, 1fr))', gap:'1rem', maxHeight: '80vh'}}>

        {badgeChunks.map((chunk, index) => (
          <ScrollableTableWrapper key={index}>
            <Table striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th className="text-left">Nombre</th>
                  <th className="text-left">Nivel requerido</th>
                  <th className="text-left">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {chunk.map((badge) => (
                  <tr key={badge.id}>
                    <td>{badge.name}</td>
                    <td>{badge.levelRequired}</td>
                    <td>
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <Button variant="warning" onClick={() => handleEditClick(badge)} className="mr-2">
                          Editar
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ScrollableTableWrapper>
        ))}
      </StyledCardWrapper>


      {showPopup && (
        <TerminalPopup onClose={handleClosePopup}>
          <BadgeForm
            badge={editingBadge}
            onSubmit={editingBadge ? handleUpdateBadge : handleCreateBadge}
            onClose={handleClosePopup}
          />
        </TerminalPopup>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: '100vw',
    minHeight: '100vh',
    padding: '20px',
    borderRadius: '10px',
    gap: '10px',
    overflowY: 'auto',
    WebkitOverflowScrolling: 'touch',
  },
  title: {
    color: '#f0e68c',
    textAlign: 'left',
  },
  button: {
    justifyContent: 'flex-start',
    borderColor: '#b8860b',
  },
};

export default BadgeComponent;
