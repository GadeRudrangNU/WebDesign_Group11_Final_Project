// src/pages/CoordinatorDashboard.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../styles/CoordinatorDashboard.css';

const CoordinatorDashboard = () => {
  const [missions, setMissions] = useState([]);
  const [guides, setGuides] = useState({});
  const [selectedGuides, setSelectedGuides] = useState({});
  const [seatEdits, setSeatEdits] = useState({});
  const [statusUpdates, setStatusUpdates] = useState({});
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    title: '',
    destination: '',
    launchDate: '',
    seatCapacity: '',
  });

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const fetchMissions = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/missions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      Array.isArray(data) ? setMissions(data) : setMessage(data.message || 'Unexpected response');
    } catch {
      setMessage('Failed to fetch missions');
    }
  };

  const fetchGuides = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/users/guides', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      const mapped = data.reduce((acc, g) => ({ ...acc, [g._id]: g }), {});
      setGuides(mapped);
    } catch {
      setMessage('Error fetching guides');
    }
  };

  useEffect(() => {
    fetchMissions();
    fetchGuides();
  }, []);

  const updateStatus = async (id) => {
    const newStatus = statusUpdates[id];
    try {
      await fetch(`http://localhost:5000/api/missions/${id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      fetchMissions();
    } catch {
      setMessage('Failed to update status');
    }
  };

  const assignGuide = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/missions/${id}/assign-guide`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ guideId: selectedGuides[id] })
      });
      fetchMissions();
    } catch {
      setMessage('Failed to assign guide');
    }
  };

  const updateSeats = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/missions/${id}/seats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ seatCapacity: seatEdits[id] })
      });
      fetchMissions();
    } catch {
      setMessage('Failed to update seats');
    }
  };

  const handleAddMission = async () => {
    try {
      await fetch('http://localhost:5000/api/missions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(form)
      });
      setShowModal(false);
      setForm({ title: '', destination: '', launchDate: '', seatCapacity: '' });
      fetchMissions();
    } catch {
      setMessage('Failed to add mission');
    }
  };

  return (
    <div className="coordinator-dashboard">
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark space-navbar">
        <div className="container-fluid">
          <span className="navbar-brand">🚀 Mission Control</span>

          <ul className="navbar-nav ms-auto d-flex flex-row gap-2">
            <li className="nav-item">
              <button className="btn btn-outline-success" onClick={() => setShowModal(true)}>➕ Add Mission</button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-warning" onClick={() => navigate('/coordinator/manage-trips')}>
                Manage Trips
              </button>
            </li>
            <li className="nav-item">
              <button className="btn btn-outline-light" onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container mt-4">
        <h2 className="dashboard-heading">🛰️ Scheduled Missions Panel</h2>
        {message && <div className="alert alert-warning">{message}</div>}
        <div className="table-responsive">
          <table className="table table-dark table-hover table-striped border">
            <thead>
              <tr>
                <th>Title</th>
                <th>Destination</th>
                <th>Launch Date</th>
                <th>Status</th>
                <th>Seats</th>
                <th>Guide</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission) => (
                <tr key={mission._id}>
                  <td>{mission.title}</td>
                  <td>{mission.destination}</td>
                  <td>{new Date(mission.launchDate).toLocaleDateString()}</td>
                  <td>
                    <select
                      className="form-select"
                      value={statusUpdates[mission._id] || mission.status}
                      onChange={(e) => setStatusUpdates({ ...statusUpdates, [mission._id]: e.target.value })}
                    >
                      <option>Scheduled</option>
                      <option>Delayed</option>
                      <option>Completed</option>
                    </select>
                    <button className="btn btn-sm btn-success mt-1" onClick={() => updateStatus(mission._id)}>Save</button>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={seatEdits[mission._id] || mission.seatCapacity}
                      onChange={(e) => setSeatEdits({ ...seatEdits, [mission._id]: e.target.value })}
                    />
                    <button className="btn btn-sm btn-warning mt-1" onClick={() => updateSeats(mission._id)}>Save</button>
                  </td>
                  <td>
                    <select
                      className="form-select"
                      value={selectedGuides[mission._id] || mission.assignedGuide?._id || ''}
                      onChange={(e) => setSelectedGuides({ ...selectedGuides, [mission._id]: e.target.value })}
                    >
                      <option value="">Select Guide</option>
                      {Object.values(guides).map((g) => (
                        <option key={g._id} value={g._id}>{g.username}</option>
                      ))}
                    </select>
                    <button className="btn btn-sm btn-primary mt-1" onClick={() => assignGuide(mission._id)}>Assign</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MISSION MODAL */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Mission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Destination</Form.Label>
              <Form.Control name="destination" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Launch Date</Form.Label>
              <Form.Control type="date" name="launchDate" value={form.launchDate} onChange={(e) => setForm({ ...form, launchDate: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Seat Capacity</Form.Label>
              <Form.Control type="number" name="seatCapacity" value={form.seatCapacity} onChange={(e) => setForm({ ...form, seatCapacity: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddMission}>Create Mission</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CoordinatorDashboard;