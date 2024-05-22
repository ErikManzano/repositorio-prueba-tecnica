import React from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { useLocationContext } from '../context/LocationContext';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

const Favorites: React.FC = () => {
  const { favorites, removeFavorite } = useCharacterContext();
  const { favoriteLocations, removeFavoriteLocation } = useLocationContext();

  return (
    <Container className="mt-5 pt-5">
      <h2 className="text-center mb-4">Favoritos</h2>

      {favorites.length > 0 && (
        <>
          <h3 className="text-center mb-3">Personajes Favoritos</h3>
          <Row xs={1} sm={2} md={3} lg={4}>
            {favorites.map(character => (
              <Col key={character.id} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={character.image} />
                  <Card.Body>
                    <Card.Title className="text-center">{character.name}</Card.Title>
                    <Button variant="danger" onClick={() => removeFavorite(character)}>
                      Eliminar de Favoritos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {favoriteLocations.length > 0 && (
        <>
          <h3 className="text-center mt-5 mb-3">Ubicaciones Favoritas</h3>
          <Row xs={1} sm={2} md={3} lg={4}>
            {favoriteLocations.map(location => (
              <Col key={location.id} className="mb-4">
                <Card>
                  <Card.Body>
                    <Card.Title className="text-center">{location.name}</Card.Title>
                    <Card.Text className="text-center">
                      <strong>Type:</strong> {location.type} <br />
                      <strong>Dimension:</strong> {location.dimension}
                    </Card.Text>
                    <Button variant="danger" onClick={() => removeFavoriteLocation(location)}>
                      Eliminar de Favoritos
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      )}

      {(favorites.length === 0 && favoriteLocations.length === 0) && (
        <p className="text-center">No hay elementos favoritos.</p>
      )}
    </Container>
  );
};

export default Favorites;
