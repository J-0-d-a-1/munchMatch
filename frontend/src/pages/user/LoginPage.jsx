import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';


function LoginPage(props) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { user, setUser } = props;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/sessions', formData, { withCredentials: true });
      // Handle successful login (e.g., redirect or update auth state)
      // console.log('Login successful:', response.data);
      setUser(prevUser => ({
        ...prevUser,
        id: response.data.id,
        name: response.data.name,
        is_owner: response.data.is_owner
      }));
      // Redirect based on user type
      if (response.data.is_owner) {
        navigate('/user/restaurants');
      } else {
        navigate('/user');
      }
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
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;