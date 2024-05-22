import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav } from 'react-bootstrap';
import { useAuthContext } from '../context/AuthContext';
import Logo from '../assets/react.svg'; // Importa tu logo desde la ruta correcta

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuthContext();

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" fixed="top" className="d-flex flex-column justify-content-center text-center">
      <BootstrapNavbar.Brand as={Link} to="/">
        <img src={Logo} alt="Logo" style={{ width: '40px', marginRight: '10px' }} />Prueba Técnica Erik Manzano
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" style={{}}>Inicio</Nav.Link>
          <Nav.Link as={NavLink} to="/locations" style={{}}>Ubicaciones</Nav.Link>
          <Nav.Link as={NavLink} to="/favorites">Favoritos</Nav.Link>
        </Nav>
        <Nav className="ml-auto">
          {isAuthenticated ? (
            <Nav.Link as={NavLink} to="/" onClick={logout}>
              Cerrar Sesión
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/login">
              Iniciar Sesión
            </Nav.Link>
          )}
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};

export default Navbar;
