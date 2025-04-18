import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Navbar,
  Container,
  Nav,
  Button,
  Row,
  Col,
  Card,
  Table,
  Form
} from 'react-bootstrap';
import starsBg from '../assets/stars.png';
import {
  fetchAllUsers,
  updateUser,
  deleteUser
} from '../services/apiService';

export default function AdminPage() {
  const navigate = useNavigate();
  const [users, setUsers]         = useState([]);
  const [selected, setSelected]   = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm]           = useState({ username: '', role: '' });
  const [error, setError]         = useState('');

  // reload users
  const load = () =>
    fetchAllUsers()
      .then(setUsers)
      .catch(err => setError(err.message));

  useEffect(() => {
    load();
  }, []);

  const selectUser = user => {
    setSelected(user);
    setForm({ username: user.username, role: user.role });
    setIsEditing(false);
  };

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const save = async () => {
    try {
      await updateUser(selected._id, form);
      setIsEditing(false);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const remove = async () => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await deleteUser(selected._id);
      setSelected(null);
      load();
    } catch (e) {
      setError(e.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const handleManageTrips = () => {
    navigate('/admin/trips');
  };

  return (
    <div
      style={{
        backgroundImage: `url(${starsBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        color: '#fff'
      }}
    >
      {/* Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container fluid style={{ position: 'relative' }}>
          {/* Left: SpaceTourism */}
          <Navbar.Brand className="text-light">SpaceTourism</Navbar.Brand>
          {/* Center: Admin */}
          <h2
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              margin: 0,
              fontWeight: 'bold',
              color: '#FFD700'
            }}
          >
            Admin
          </h2>
          {/* Right: Manage Trips + Logout */}
          <Nav className="ms-auto">
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

      {/* Content */}
      <Container className="py-4">
        {/* Header */}
        <Row className="mb-4">
          <Col>
            <h3 className="text-light">Users Management</h3>
            <p className="text-secondary">
              Click a row to select a user and edit their details.
            </p>
            {error && <div className="alert alert-danger">{error}</div>}
          </Col>
        </Row>

        {/* Users Table with scroll pane & fade-in */}
        <Row>
          <Col>
            <Card bg="transparent" border="light" className="shadow-sm mb-4 animate__animated animate__fadeIn">
              <Card.Body className="p-0" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <Table
                  striped
                  bordered
                  hover
                  responsive
                  variant="dark"
                  className="mb-0"
                >
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Email</th>
                      <th>Username</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr
                        key={u._id}
                        onClick={() => selectUser(u)}
                        className={selected?._id === u._id ? 'table-active' : ''}
                        style={{ cursor: 'pointer' }}
                      >
                        <td style={{ maxWidth: '200px', wordBreak: 'break-all', fontSize: '0.9rem' }}>
                          {u._id}
                        </td>
                        <td style={{ fontSize: '1rem' }}>{u.email}</td>
                        <td style={{ fontSize: '1rem' }}>{u.username}</td>
                        <td style={{ fontSize: '1rem' }}>{u.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Edit User Form */}
        {selected && (
          <Row className="justify-content-center mt-5">
            <Col xs={12} md={6}>
              <Card bg="dark" text="light" className="p-3 shadow-sm animate__animated animate__zoomIn">
                <Card.Body>
                  <Card.Title style={{ fontSize: '1.5rem', color: '#FFD700' }}>
                    Edit User
                  </Card.Title>

                  <Form>
                    <Form.Group controlId="formUserId" className="mb-3">
                      <Form.Label style={{ fontSize: '0.9rem', color: '#aaa' }}>ID</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        value={selected._id}
                        style={{ fontSize: '1rem', color: '#fff' }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formUserEmail" className="mb-3">
                      <Form.Label style={{ fontSize: '0.9rem', color: '#aaa' }}>Email</Form.Label>
                      <Form.Control
                        plaintext
                        readOnly
                        value={selected.email}
                        style={{ fontSize: '1rem', color: '#fff' }}
                      />
                    </Form.Group>

                    <Form.Group controlId="formUsername" className="mb-3">
                      <Form.Label style={{ fontSize: '0.9rem', color: '#aaa' }}>Username</Form.Label>
                      {isEditing ? (
                        <Form.Control
                          name="username"
                          value={form.username}
                          onChange={handleChange}
                          style={{ backgroundColor: '#222', color: '#fff', fontSize: '1rem' }}
                        />
                      ) : (
                        <Form.Control
                          plaintext
                          readOnly
                          value={selected.username}
                          style={{ fontSize: '1rem', color: '#fff' }}
                        />
                      )}
                    </Form.Group>

                    <Form.Group controlId="formRole" className="mb-4">
                      <Form.Label style={{ fontSize: '0.9rem', color: '#aaa' }}>Role</Form.Label>
                      {isEditing ? (
                        <Form.Select
                          name="role"
                          value={form.role}
                          onChange={handleChange}
                          style={{ backgroundColor: '#222', color: '#fff', fontSize: '1rem' }}
                        >
                          <option>Traveler</option>
                          <option>TripCoordinator</option>
                          <option>CertifiedSpaceGuide</option>
                          <option>Trainee</option>
                          <option>Admin</option>
                        </Form.Select>
                      ) : (
                        <Form.Control
                          plaintext
                          readOnly
                          value={selected.role}
                          style={{ fontSize: '1rem', color: '#fff' }}
                        />
                      )}
                    </Form.Group>

                    <div className="text-end">
                      {!isEditing && (
                        <Button
                          variant="outline-info"
                          className="me-2"
                          onClick={() => setIsEditing(true)}
                        >
                          Update
                        </Button>
                      )}
                      {isEditing && (
                        <Button
                          variant="success"
                          className="me-2"
                          onClick={save}
                        >
                          Save
                        </Button>
                      )}
                      <Button variant="outline-danger" onClick={remove}>
                        Delete
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
}
