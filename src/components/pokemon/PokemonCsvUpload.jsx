import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { uploadPokemonCsv } from '../../services/api';

const PokemonCsvUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError(null); 
    setSuccess(null); 

    try {
      const response = await uploadPokemonCsv(file);
      setSuccess('Archivo cargado exitosamente');
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } catch (err) {
      setError('Error al cargar el archivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <div className="text-center">
            <h2>Cargar CSV de Pokemones</h2>
            <Form style={{display: 'flex', gap: '10px', flexDirection: 'column'}}>
              <Form.Group controlId="formFile">
                <Form.Label>Selecciona el archivo CSV</Form.Label>
                <Form.Control
                  type="file"
                  accept=".csv"
                  onChange={handleFileChange}
                  disabled={loading}
                />
              </Form.Group>

              <Button
                variant="primary"
                onClick={handleUpload}
                disabled={loading || !file}
                className="w-100"
              >
                {loading ? 'Cargando...' : 'Subir CSV'}
              </Button>
            </Form>

            {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
            {success && <Alert variant="success" className="mt-3">{success}</Alert>}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PokemonCsvUpload;
