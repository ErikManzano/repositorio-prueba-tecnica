import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { useAuthContext } from './AuthContext';

interface Location {
  id: number;
  name: string;
  type: string;
  dimension: string;
}

interface LocationContextProps {
  locations: Location[];
  fetchMoreLocations: () => void;
  addFavoriteLocation: (location: Location) => void;
  removeFavoriteLocation: (location: Location) => void;
  favoriteLocations: Location[];
}

interface LocationProviderProps {
  children: ReactNode;
}

const LocationContext = createContext<LocationContextProps | undefined>(undefined);

export const LocationProvider: React.FC<LocationProviderProps> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState(1);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
  const { isAuthenticated } = useAuthContext();

  useEffect(() => {
    fetchLocations();
  }, [page]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(`https://rickandmortyapi.com/api/location?page=${page}`);
      setLocations(prev => [...prev, ...response.data.results]);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  const fetchMoreLocations = () => {
    setPage(prev => prev + 1);
  };

  const addFavoriteLocation = (location: Location) => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para agregar favoritos.');
      return;
    }
    setFavoriteLocations(prev => [...prev, location]);
  };

  const removeFavoriteLocation = (location: Location) => {
    setFavoriteLocations(prev => prev.filter(fav => fav.id !== location.id));
  };

  return (
    <LocationContext.Provider value={{ locations, fetchMoreLocations, addFavoriteLocation, removeFavoriteLocation, favoriteLocations }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
};
