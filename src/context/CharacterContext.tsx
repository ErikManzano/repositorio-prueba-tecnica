import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';

interface Character {
  id: number;
  name: string;
  image: string;
}

interface CharacterContextProps {
  characters: Character[];
  fetchMoreCharacters: () => void;
  addFavorite: (character: Character) => void;
  removeFavorite: (character: Character) => void;
  favorites: Character[];
}

interface CharacterProviderProps {
  children: ReactNode;
}

const CharacterContext = createContext<CharacterContextProps | undefined>(undefined);

export const CharacterProvider: React.FC<CharacterProviderProps> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Character[]>([]);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    fetchCharacters();
  }, [page]);

  const fetchCharacters = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/character?page=${page}`);
      setCharacters(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };

  const fetchMoreCharacters = () => {
    setPage(prev => prev + 1);
  };

  const addFavorite = (character: Character) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar favoritos.');
      return;
    }
    setFavorites(prev => [...prev, character]);
  };

  const removeFavorite = (character: Character) => {
    setFavorites(prev => prev.filter(fav => fav.id !== character.id));
  };

  return (
    <CharacterContext.Provider value={{ characters, fetchMoreCharacters, addFavorite, removeFavorite, favorites }}>
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacterContext = () => {
  const context = React.useContext(CharacterContext);
  if (!context) {
    throw new Error('useCharacterContext must be used within a CharacterProvider');
  }
  return context;
};
