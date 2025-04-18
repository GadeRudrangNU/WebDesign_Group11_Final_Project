// frontend/src/pages/CreateTrip.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Card,
  Form,
  Alert,
  Table
} from 'react-bootstrap';
import starsBg from '../assets/stars.png';
import {
  fetchTrips,
  createTrip,
  updateTrip
} from '../services/apiService';
import '../styles/CreateTrip.css';
 
export default function CreateTrip() {
  const navigate = useNavigate();
  const [trips, setTrips]       = useState([]);
  const [selected, setSelected] = useState(null);
  const [form, setForm]         = useState({
    name: '',
    slug: '',
    location: '',
    description: '',
    cost: '',
    distance: '',
    durationDays: '',
    seatsAvailable: '',
    images: ''
  });
  const [error, setError]       = useState('');
  const [saving, setSaving]     = useState(false);
 
  // load trips
  const load = () =>
    fetchTrips()
      .then(setTrips)
      .catch(err => setError(err.message));
 
  useEffect(() => {
    load();
  }, []);
 
  const selectTrip = trip => {
    setSelected(trip);
    setForm({
      name: trip.name,
      slug: trip.slug,
      location: trip.location,
      description: trip.description,
      cost: trip.cost,
      distance: trip.distance,
      durationDays: trip.durationDays,
      seatsAvailable: trip.seatsAvailable,
      images: trip.images.join(', ')
    });
    setError('');
  };
 
  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
 
  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      const payload = {
        name: form.name,
        slug: form.slug,
        location: form.location,
        description: form.description,
        cost: Number(form.cost),
        distance: Number(form.distance),
        durationDays: Number(form.durationDays),
        seatsAvailable: Number(form.seatsAvailable),
        images: form.images.split(',').map(s => s.trim())
      };
 
      if (selected) {
        await updateTrip(selected._id, payload);
        setSelected(null);
      } else {
        await createTrip(payload);
      }
      setForm({
        name: '',
        slug: '',
        location: '',
        description: '',
        cost: '',
        distance: '',
        durationDays: '',
        seatsAvailable: '',
        images: ''
      });
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };
 
  const goBack = () => navigate('/admin');
 
  return (
    <div className="create-trip-root">
      {/* ← Back */}
      <div className="back-btn">
        <Button variant="outline-light" size="sm" onClick={goBack}>
          ← Back
        </Button>
      </div>
 
      {/* Navbar (same as AdminPage) */}
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
              Create Trips
            </Button>
            <Button
              variant="outline-info"
              size="sm"
              className="me-2"
              onClick={() => navigate('/admin/trips')}
            >
              Manage Trips
            </Button>
            <Button
              variant="outline-light"
              size="sm"
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/login', { replace: true });
              }}
            >
              Logout
            </Button>
          </Nav>
        </Container>
      </Navbar>
 
      <Container className="py-5">
        <h3 className="text-light mb-4">
          {selected ? 'Edit Trip' : 'Create New Trip'}
        </h3>
        {error && <Alert variant="danger">{error}</Alert>}
 
        <Form onSubmit={handleSubmit} className="mb-5 create-trip-form">
          <Form.Group className="mb-2">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Slug</Form.Label>
            <Form.Control
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Location</Form.Label>
            <Form.Control
              name="location"
              value={form.location}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Cost</Form.Label>
            <Form.Control
              type="number"
              name="cost"
              value={form.cost}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Distance (million km)</Form.Label>
            <Form.Control
              type="number"
              name="distance"
              value={form.distance}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Duration (days)</Form.Label>
            <Form.Control
              type="number"
              name="durationDays"
              value={form.durationDays}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Seats Available</Form.Label>
            <Form.Control
              type="number"
              name="seatsAvailable"
              value={form.seatsAvailable}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Images (comma‑separated URLs)</Form.Label>
            <Form.Control
              name="images"
              value={form.images}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="secondary" onClick={goBack} className="me-2">
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? 'Saving…' : selected ? 'Update Trip' : 'Create Trip'}
            </Button>
          </div>
        </Form>
 
        <h4 className="text-light mb-3">Existing Trips</h4>
        <Table
          striped
          bordered
          hover
          variant="dark"
          className="shadow-sm"
        >
          <thead>
            <tr>
              <th>Name</th>
              <th>Slug</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {trips.map(t => (
              <tr
                key={t._id}
                onClick={() => selectTrip(t)}
                style={{ cursor: 'pointer' }}
              >
                <td>{t.name}</td>
                <td>{t.slug}</td>
                <td>{t.location}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}