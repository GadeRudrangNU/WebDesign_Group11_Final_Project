// frontend/src/components/TripDetail.jsx
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchTrip, bookTrip } from '../services/apiService'
import { Carousel, Button, Modal, Form } from 'react-bootstrap'

export default function TripDetail() {
  const { slug } = useParams()
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
    <div className="container my-5">
      <h2>{trip.name}</h2>
      <p className="text-muted">{trip.location}</p>

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

      <div className="mt-4">
        <p>{trip.description}</p>
        <ul>
          <li><strong>Cost:</strong> ${trip.cost}</li>
          <li><strong>Distance:</strong> {trip.distance} million km</li>
          <li><strong>Duration:</strong> {trip.durationDays} days</li>
          <li><strong>Seats left:</strong> {trip.seatsAvailable}</li>
        </ul>
        <Button
          onClick={() => setShowBook(true)}
          disabled={trip.seatsAvailable < 1}
        >
          Book Now
        </Button>
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
