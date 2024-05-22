// Home.tsx
import React, { useEffect } from 'react';
import { useCharacterContext } from '../context/CharacterContext';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';

interface Character {
  id: number;
  name: string;
  image: string;
}

const Home: React.FC = () => {
  const { characters, fetchMoreCharacters, addFavorite } = useCharacterContext();
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
        fetchMoreCharacters();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [fetchMoreCharacters]);

  const handleAddFavorite = (character: Character) => {
    if (isAuthenticated) {
      addFavorite(character);
      alert(`Personaje ${character.name} agregado a favoritos`);
    } else {
      alert('Debes iniciar sesión para agregar favoritos');
    }
  };

  return (
    <Container className="mt-4 pt-5">
      <h2 className="text-center mb-4">Personajes de Rick & Morty</h2>
      <Row xs={1} sm={2} md={3} lg={4}>
        {characters.map(character => (
          <Col key={character.id} className="mb-4">
            <Card className='text-center'>
              <Card.Img variant="top" src={character.image} />
              <Card.Body>
                <Card.Title className="text-center">{character.name}</Card.Title>
                <Button variant="primary" size='lg' onClick={() => handleAddFavorite(character)}>
                  Agregar a Favoritos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Home;
