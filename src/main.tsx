import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.tsx';
import './App.css';
import { CharacterProvider } from './context/CharacterContext.tsx';
import { LocationProvider } from './context/LocationContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CharacterProvider>
          <LocationProvider>
            <App />
          </LocationProvider>
        </CharacterProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
