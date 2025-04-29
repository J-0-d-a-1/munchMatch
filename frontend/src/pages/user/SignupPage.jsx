import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';

function SignupPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    is_owner: false
  });
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/users',
        { user: formData },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true
        }
      );

      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      console.error('Signup error:', err.response?.data);
      setErrors(err.response?.data?.errors || ['An error occurred during signup']);
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
          <h1 className="text-start mb-4">Sign Up</h1>

          <Form onSubmit={handleSubmit}>
            {errors.length > 0 && (
              <Alert variant="danger">
                <Alert.Heading>The following errors prevented signup:</Alert.Heading>
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </Alert>
            )}

            <Form.Group className="mb-3 text-start" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                autoComplete="name"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
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
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="password_confirmation">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                required
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group className="mb-3 text-start" controlId="is_owner">
              <Form.Check
                type="checkbox"
                name="is_owner"
                label="Register as Restaurant Owner"
                checked={formData.is_owner}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  is_owner: e.target.checked
                }))}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Sign Up
            </Button>

            <Form.Text className="text-center d-block mt-3">
              Already have an account? <Link to="/login">Log In</Link>
            </Form.Text>

          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;