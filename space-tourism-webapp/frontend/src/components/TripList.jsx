// frontend/src/components/TripList.jsx
import React, { useEffect, useState } from 'react'
import { fetchTrips } from '../services/apiService'

export default function TripList() {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetchTrips()
      .then(data => setTrips(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="row">
      {trips.map(t => (
        <div key={t._id} className="col-md-4 mb-4">
          <div className="card">
            <img src={t.images[0]} className="card-img-top" alt={t.name}/>
            <div className="card-body">
              <h5 className="card-title">{t.name}</h5>
              <p className="card-text">{t.location}</p>
              <a href={`/trips/${t.slug}`} className="btn btn-primary">
                View Details
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
