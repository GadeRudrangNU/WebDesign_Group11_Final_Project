// frontend/src/components/TripList.jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchTrips } from '../services/apiService'
import '../styles/TripList.css'

export default function TripList() {
  const [trips, setTrips] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchTrips()
      .then(data => setTrips(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="trips-root" style={{ position: 'relative' }}>
      {/* ← Back to Home button */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
        <button
          className="btn btn-outline-light"
          onClick={() => navigate('/home')}
        >
          ← Back to Home
        </button>
      </div>

      <div className="trips-header">
        <h2>Available Trips</h2>
        <p>Choose your next cosmic adventure</p>
      </div>
      <div className="trips-grid">
        {trips.map(t => (
          <div key={t._id} className="trip-card">
            <img src={t.images[0]} className="card-img-top" alt={t.name}/>
            <div className="card-body">
              <h5 className="card-title">{t.name}</h5>
              <p className="card-text">{t.location}</p>
              <a href={`/trips/${t.slug}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
