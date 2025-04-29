import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';


function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sessions', formData, { withCredentials: true });
      // Handle successful login
      setUser(response.data);
      navigate(location.state?.from || '/');
    } catch (err) {
      setError(err.response?.data?.errors || 'An error occurred during login');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <Container className="mb-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h1 className="text-start mb-4">Login</h1>

          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger">
                {error}
              </Alert>
            )}

            <Form.Group className="mb-3 text-start" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Login
            </Button>

            <Form.Text className="text-center d-block mt-3">
              New to MunchMatch? <Link to="/signup">Sign Up</Link>
            </Form.Text>
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;