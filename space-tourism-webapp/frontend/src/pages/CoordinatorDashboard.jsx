import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CoordinatorDashboard = () => {
  const [missions, setMissions] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const [guides, setGuides] = useState({});
  const [selectedGuides, setSelectedGuides] = useState({});
  const [seatEdits, setSeatEdits] = useState({});

  const token = localStorage.getItem('token');

  // Fetch all missions
  const fetchMissions = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/missions', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setMissions(data);
    } catch (err) {
      console.error('Error fetching missions:', err);
      setMessage('Error fetching missions');
    }
  };

  const [statusUpdates, setStatusUpdates] = useState({});

  useEffect(() => {
    fetchMissions()
    const fetchGuides = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/users/guides', {
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) {
            setGuides(data.reduce((acc, guide) => {
              acc[guide._id] = guide;
              return acc;
            }, {}));
          }
        } catch (err) {
          console.error('Error fetching guides:', err);
        }
      };
      
      fetchGuides();

    const handleStatusChange = (missionId, newStatus) => {
        setStatusUpdates((prev) => ({
          ...prev,
          [missionId]: newStatus,
        }));
      };
      
    const updateStatus = async (missionId) => {
        try {
          const res = await fetch(`http://localhost:5000/api/missions/${missionId}/status`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ status: statusUpdates[missionId] })
          });
          const data = await res.json();
          if (res.ok) {
            setMessage('Status updated!');
            fetchMissions(); // refresh data
          } else {
            setMessage(data.message || 'Update failed');
          }
        } catch (err) {
          console.error('Error updating status:', err);
          setMessage('Error updating status');
        }
      };
      const handleGuideChange = (missionId, guideId) => {
        setSelectedGuides((prev) => ({
          ...prev,
          [missionId]: guideId
        }));
      };
      
      const assignGuide = async (missionId) => {
        try {
          const res = await fetch(`http://localhost:5000/api/missions/${missionId}/assign-guide`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ guideId: selectedGuides[missionId] })
          });
          const data = await res.json();
          if (res.ok) {
            setMessage('Guide assigned successfully!');
            fetchMissions(); // Refresh updated guide in table
          } else {
            setMessage(data.message || 'Assignment failed');
          }
        } catch (err) {
          console.error('Error assigning guide:', err);
          setMessage('Error assigning guide');
        }
      };

      const handleSeatChange = (missionId, newSeats) => {
        setSeatEdits((prev) => ({
          ...prev,
          [missionId]: newSeats
        }));
      };
      
      const updateSeats = async (missionId) => {
        try {
          const res = await fetch(`http://localhost:5000/api/missions/${missionId}/seats`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ seatCapacity: seatEdits[missionId] })
          });
          const data = await res.json();
          if (res.ok) {
            setMessage('Seat capacity updated!');
            fetchMissions(); // refresh updated mission
          } else {
            setMessage(data.message || 'Update failed');
          }
        } catch (err) {
          console.error('Error updating seat capacity:', err);
          setMessage('Error updating seats');
        }
      };
      ;
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Trip Coordinator Dashboard</h2>
      {message && <div className="alert alert-danger">{message}</div>}

      <table className="table table-striped table-bordered">
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
                    onChange={(e) => handleStatusChange(mission._id, e.target.value)}
                >
                    <option>Scheduled</option>
                    <option>Delayed</option>
                    <option>Completed</option>
                </select>
                <button
                    className="btn btn-sm btn-success mt-1"
                    onClick={() => updateStatus(mission._id)}
                >
                    Save
                </button>
                </td>
                <td>
                    <input
                        type="number"
                        className="form-control"
                        value={seatEdits[mission._id] || mission.seatCapacity}
                        onChange={(e) => handleSeatChange(mission._id, e.target.value)}
                    />
                    <button
                        className="btn btn-sm btn-warning mt-1"
                        onClick={() => updateSeats(mission._id)}
                    >
                        Save
                    </button>
                    </td>
              <td>
                <select
                    className="form-select"
                    value={selectedGuides[mission._id] || mission.assignedGuide?._id || ''}
                    onChange={(e) => handleGuideChange(mission._id, e.target.value)}
                >
                    <option value="">Select Guide</option>
                    {Object.values(guides).map((guide) => (
                    <option key={guide._id} value={guide._id}>
                        {guide.username}
                    </option>
                    ))}
                </select>
                <button
                    className="btn btn-sm btn-primary mt-1"
                    onClick={() => assignGuide(mission._id)}
                >
                    Assign
                </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CoordinatorDashboard;