// src/pages/ManageTrips.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const ManageTrips = () => {
  const [trips, setTrips] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const limit = 5;

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    location: '',
    cost: 0,
    distance: 0,
    durationDays: 0,
    seatsAvailable: 0,
    launchDate: ''
  });
  const [editingTripId, setEditingTripId] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/trips');
      const data = await res.json();
      setTrips(data);
      setFiltered(data);
    } catch (err) {
      console.error('Error fetching trips:', err);
    }
  };

  useEffect(() => {
    let results = [...trips];

    if (search) {
      results = results.filter(trip =>
        (trip.name || '').toLowerCase().includes(search.toLowerCase()) ||
        (trip.destination || '').toLowerCase().includes(search.toLowerCase())
      );
    }

    results.sort((a, b) => {
      const valA = (a[sortBy] || '').toString();
      const valB = (b[sortBy] || '').toString();
      return valA.localeCompare(valB);
    });

    setFiltered(results);
    setPage(1);
  }, [search, sortBy, trips]);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddOrUpdate = async () => {
    const method = editingTripId ? 'PUT' : 'POST';
    const url = editingTripId
      ? `http://localhost:5000/api/trips/${editingTripId}`
      : 'http://localhost:5000/api/trips';

    try {
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });

      if (res.ok) {
        setShowModal(false);
        fetchTrips();
        setEditingTripId(null);
        setForm({
          name: '', slug: '', location: '', cost: 0, distance: 0,
          durationDays: 0, seatsAvailable: 0, launchDate: ''
        });
      } else {
        console.error('Failed to add/update trip');
      }
    } catch (err) {
      console.error('Error adding/updating trip:', err);
    }
  };

  const handleEdit = (trip) => {
    setForm({
      name: trip.name,
      slug: trip.slug,
      location: trip.location,
      cost: trip.cost,
      distance: trip.distance,
      durationDays: trip.durationDays,
      seatsAvailable: trip.seatsAvailable,
      launchDate: trip.launchDate?.split('T')[0] || ''
    });
    setEditingTripId(trip._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trip?')) {
      try {
        await fetch(`http://localhost:5000/api/trips/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchTrips();
      } catch (err) {
        console.error('Error deleting trip:', err);
      }
    }
  };

  const paginatedTrips = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="manage-trips-page">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark space-navbar">
        <div className="container-fluid">
          <span className="navbar-brand">🚀 Mission Control</span>
          <ul className="navbar-nav ms-auto d-flex flex-row gap-2">
            <li className="nav-item">
              <button
                className="btn btn-outline-warning"
                onClick={() =>
                  navigate(location.pathname === '/coordinator/manage-trips' ? '/coordinator' : '/coordinator/manage-trips')
                }
              >
                {location.pathname === '/coordinator/manage-trips'
                  ? '← Back to Dashboard'
                  : 'Manage Trips'}
              </button>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-outline-light"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('role');
                  navigate('/login');
                }}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* PAGE CONTENT */}
      <div className="container mt-4">
        <h2 className="mb-4">🪐 Manage Trips</h2>

        {/* Controls */}
        <div className="d-flex justify-content-between mb-3">
          <Form.Control
            type="text"
            placeholder="Search by name or destination"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: '300px' }}
          />
          <div className="d-flex gap-2">
            <Form.Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
              <option value="name">Sort by Name</option>
              <option value="location">Sort by Location</option>
            </Form.Select>
            <Button onClick={() => setShowModal(true)}>➕ Add Trip</Button>
          </div>
        </div>

        {/* Table */}
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Launch Date</th>
              <th>Seats</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedTrips.map(trip => (
              <tr key={trip._id}>
                <td>{trip.name}</td>
                <td>{trip.location}</td>
                <td>{new Date(trip.launchDate).toLocaleDateString()}</td>
                <td>{trip.seatsAvailable}</td>
                <td>
                  <Button variant="warning" size="sm" onClick={() => handleEdit(trip)}>Edit</Button>{' '}
                  <Button variant="danger" size="sm" onClick={() => handleDelete(trip._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-between mt-3">
          <span>Page {page} of {totalPages}</span>
          <div className="btn-group">
            <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>Previous</Button>
            <Button disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next</Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingTripId ? 'Edit Trip' : 'Add Trip'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control name="name" value={form.name} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Slug</Form.Label>
              <Form.Control name="slug" value={form.slug} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Location</Form.Label>
              <Form.Control name="location" value={form.location} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Launch Date</Form.Label>
              <Form.Control type="date" name="launchDate" value={form.launchDate} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Seats Available</Form.Label>
              <Form.Control type="number" name="seatsAvailable" value={form.seatsAvailable} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Cost</Form.Label>
              <Form.Control type="number" name="cost" value={form.cost} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Distance (M km)</Form.Label>
              <Form.Control type="number" name="distance" value={form.distance} onChange={handleInputChange} required />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Duration (days)</Form.Label>
              <Form.Control type="number" name="durationDays" value={form.durationDays} onChange={handleInputChange} required />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button onClick={handleAddOrUpdate}>{editingTripId ? 'Update' : 'Add'} Trip</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageTrips;