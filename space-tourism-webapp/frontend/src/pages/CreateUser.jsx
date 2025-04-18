import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Card,
  Form,
  Alert
} from 'react-bootstrap';
import starsBg from '../assets/stars.png';
import { createUser } from '../services/apiService';
import '../styles/CreateUser.css';

export default function CreateUser() {
  const navigate = useNavigate();
  const [form, setForm]     = useState({ username:'', email:'', password:'', role:'Traveler' });
  const [error, setError]   = useState('');
  const [saving, setSaving] = useState(false);

  const handleChange = e => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    try {
      await createUser(form);
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  const goBack = () => navigate('/admin');
  const handleManageTrips = () => navigate('/admin/trips');
  const handleLogout     = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  return (
    <div className="createuser-root">
      {/* Admin navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid style={{ position: 'relative' }}>
          <Navbar.Brand className="text-light">SpaceTourism</Navbar.Brand>
          <h2 className="admin-title">Admin</h2>
          <Nav className="ms-auto">
            <Button
              variant="outline-success"
              size="sm"
              className="me-2"
              disabled
            >
              Create User
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              className="me-2"
              onClick={handleManageTrips}
            >
              Manage Trips
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* back button under the navbar */}
      <div className="back-btn">
        <Button variant="outline-light" size="sm" onClick={goBack}>
          ← Back
        </Button>
      </div>

      {/* form */}
      <Container className="py-5">
        <Card className="mx-auto create-card">
          <Card.Body>
            <h3 className="mb-4 text-center">Create New User</h3>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="username" className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="role" className="mb-4">
                <Form.Label>Role</Form.Label>
                <Form.Select name="role" value={form.role} onChange={handleChange}>
                  <option>Traveler</option>
                  <option>TripCoordinator</option>
                  <option>CertifiedSpaceGuide</option>
                  <option>Trainee</option>
                  <option>Admin</option>
                </Form.Select>
              </Form.Group>
              <div className="text-end">
                <Button variant="secondary" onClick={goBack} className="me-2">
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Creating…' : 'Create User'}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
