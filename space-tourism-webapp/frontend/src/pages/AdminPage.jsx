import React, { useEffect, useState } from 'react';
import { fetchAllUsers } from '../services/apiService';

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchAllUsers()
      .then(setUsers)
      .catch(err => setError(err.message));
  }, []);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome, administrator! Here you can manage users, trips, and bookings.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" style={{ margin: 'auto', marginTop: '1rem', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f0f0f0' }}>
            <th>ID</th>
            <th>Email</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr
              key={user._id}
              onClick={() => handleSelectUser(user)}
              style={{ cursor: 'pointer' }}
            >
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <div style={{ marginTop: '2rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
          <h3>Edit User</h3>
          <p><strong>ID:</strong> {selectedUser._id}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Username:</strong> {selectedUser.username}</p>
          <p><strong>Role:</strong> {selectedUser.role}</p>
          {/* TODO: Add dropdown to update role */}
        </div>
      )}
    </div>
  );
}
