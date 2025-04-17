// frontend/src/components/TripDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchTrip, bookTrip } from '../services/apiService'
import { Carousel, Button, Modal, Form, Table } from 'react-bootstrap'
import '../styles/TripDetail.css'

export default function TripDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [trip, setTrip]         = useState(null)
  const [showBook, setShowBook] = useState(false)
  const [passengers, setPassengers] = useState(1)

  useEffect(() => {
    fetchTrip(slug)
      .then(data => setTrip(data))
      .catch(console.error)
  }, [slug])

  const handleBooking = async () => {
    try {
      await bookTrip(trip._id, passengers)
      alert('Booking successful!')
      setShowBook(false)
    } catch (err) {
      console.error(err)
      alert('Booking failed')
    }
  }

  if (!trip) return <p>Loading…</p>

  return (
    // make this relative so the back button can be positioned absolutely
    <div className="tripdetail-root" style={{ position: 'relative' }}>
      {/* ← Back button now in top-left */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
        <Button variant="outline-light" onClick={() => navigate('/trips')}>
          ← Back to Trips
        </Button>
      </div>

      <h2 className="glow-heading" style={{ textAlign: 'center', marginTop: '2rem' }}>
        {trip.name}
      </h2>
      <p className="text-muted" style={{ textAlign: 'center' }}>
        {trip.location}
      </p>

      <Carousel>
        {trip.images.map((img, i) => (
          <Carousel.Item key={i}>
            <img
              className="d-block w-100"
              src={img}
              alt={`slide ${i}`}
              style={{ height: '400px', objectFit: 'cover' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <div
        className="mt-4"
        style={{
          maxWidth: '600px',
          margin: '1.5rem auto',
          color: '#ddd',
          textAlign: 'center'
        }}
      >
        <p>{trip.description}</p>

        <h3 className="glow-heading" style={{ fontSize: '1.4rem', marginTop: '2rem' }}>
          Details
        </h3>

        <Table
          striped
          bordered
          hover
          variant="dark"
          className="mt-3"
          style={{ maxWidth: '400px', margin: '0 auto' }}
        >
          <tbody>
            <tr>
              <td>Cost</td>
              <td>${trip.cost.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Distance</td>
              <td>{trip.distance} million km</td>
            </tr>
            <tr>
              <td>Duration</td>
              <td>{trip.durationDays} days</td>
            </tr>
            <tr>
              <td>Seats left</td>
              <td>{trip.seatsAvailable}</td>
            </tr>
          </tbody>
        </Table>

        <div style={{ marginTop: '1.5rem' }}>
          <Button
            onClick={() => setShowBook(true)}
            disabled={trip.seatsAvailable < 1}
          >
            Book Now
          </Button>
        </div>
      </div>

      <Modal show={showBook} onHide={() => setShowBook(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book {trip.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Passengers</Form.Label>
              <Form.Control
                type="number"
                min="1"
                max={trip.seatsAvailable}
                value={passengers}
                onChange={e => setPassengers(+e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBook(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Confirm Booking
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
