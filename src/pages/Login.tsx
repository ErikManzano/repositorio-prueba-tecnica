import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Form, Button, Container } from 'react-bootstrap';

const Login: React.FC = () => {
  const { login } = useAuthContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login();
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="text-center">
        <h2 className="mb-4">Inicio de Sesión</h2>
        <Form onSubmit={handleSubmit}>
          <Button variant="primary" type="submit">
            Iniciar Sesión
          </Button>
        </Form>
      </div>
    </Container>
  );
};

export default Login;
