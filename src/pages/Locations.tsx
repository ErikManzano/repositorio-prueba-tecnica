// Locations.tsx
import React, { useEffect } from 'react';
import { useLocationContext } from '../context/LocationContext';
import { useAuthContext } from '../context/AuthContext'; // Importa el contexto de autenticación
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}


const Locations: React.FC = () => {
  const { locations, fetchMoreLocations, addFavoriteLocation } = useLocationContext();
  const { isAuthenticated } = useAuthContext(); // Obtén el estado de autenticación

  useEffect(() => {
    fetchMoreLocations();
  }, []);

  const handleAddFavoriteLocation = (location: Location) => {
    if (isAuthenticated) {
      addFavoriteLocation(location);
      alert(`Ubicación ${location.name} agregada a favoritos`);
    } else {
      alert('Debes iniciar sesión para agregar favoritos');
    }
  };

  return (
    <Container>
      <h2 className="mt-4 mb-4">Ubicaciones de Rick & Morty</h2>
      <Row>
        {locations.map(location => (
          <Col key={location.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{location.name}</Card.Title>
                <Card.Text>{location.type} - {location.dimension}</Card.Text>
                <Button variant="primary" onClick={() => handleAddFavoriteLocation(location)}>Agregar a Favoritos</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Button variant="secondary" onClick={fetchMoreLocations} className="mt-4">Cargar más</Button>
    </Container>
  );
};

export default Locations;
