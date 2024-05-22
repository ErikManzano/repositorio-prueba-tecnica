import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
