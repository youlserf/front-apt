import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { getBadgeRequests, updateBadgeRequestStatus } from '../../services/api';
import { ScrollableTableWrapper, StyledCardWrapper } from '../../styles';

const BadgeRequestComponent = () => {
    const [requests, setRequests] = useState([]);
    const [statusFilter, setStatusFilter] = useState('ALL');

    useEffect(() => {
        const loadRequests = async () => {
            try {
                const fetchedRequests = await getBadgeRequests();
                setRequests(fetchedRequests);
            } catch (error) {
                console.error('Error loading badge requests', error);
            }
        };

        loadRequests();
    }, []);

    const handleStatusFilter = async (status) => {
        setStatusFilter(status);
        const filteredRequests = await getBadgeRequests(status);
        setRequests(filteredRequests);
    };

    const handleUpdateStatus = async (requestId, status) => {
        try {
            await updateBadgeRequestStatus(requestId, status);
            setRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request.id === requestId ? { ...request, status } : request
                )
            );
        } catch (error) {
            console.error('Error updating badge request status', error);
        }
    };

    const requestChunks = [];
    for (let i = 0; i < requests.length; i += 10) {
        requestChunks.push(requests.slice(i, i + 10));
    }
    
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Solicitudes de medallas</h2>

            <DropdownButton
                id="statusFilterDropdown"
                title={`Filtrado por estado: ${statusFilter}`}
                onSelect={handleStatusFilter}
                style={styles.button}
                variant="warning"
            >
                <Dropdown.Item eventKey="ALL">Todos</Dropdown.Item>
                <Dropdown.Item eventKey="PENDING">Pendientes</Dropdown.Item>
                <Dropdown.Item eventKey="ACCEPTED">Aprobadas</Dropdown.Item>
                <Dropdown.Item eventKey="REJECTED">Rechazados</Dropdown.Item>
            </DropdownButton>
            <StyledCardWrapper style={{ gridAutoRows: '40rem', gridTemplateColumns: 'repeat(auto-fill, minmax(30rem, 1fr))', gap: '1rem', maxHeight: '80vh' }}>
                {requestChunks.map((chunk, index) => (
                    <ScrollableTableWrapper key={index}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className="text-left">Usuario</th>
                                    <th className="text-left">Medalla</th>
                                    <th className="text-left">Estado</th>
                                    <th className="text-left">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {requests
                                    .filter((request) => statusFilter === 'ALL' || request.status === statusFilter)
                                    .map((request) => (
                                        <tr key={request.id}>
                                            <td>{request.user.email}</td>
                                            <td>{request.badge.name}</td>
                                            <td>{request.status}</td>
                                            <td>
                                                <div style={{ display: 'flex', gap: '10px' }}>
                                                    <Button
                                                        variant="warning"
                                                        onClick={() => handleUpdateStatus(request.id, 'ACCEPTED')}
                                                        className="mr-2"
                                                        disabled={request.status !== 'PENDING'}
                                                    >
                                                        Aprobar
                                                    </Button>
                                                    <Button
                                                        variant="danger"
                                                        onClick={() => handleUpdateStatus(request.id, 'REJECTED')}
                                                        disabled={request.status !== 'PENDING'}
                                                    >
                                                        Rechazar
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

export default BadgeRequestComponent;
