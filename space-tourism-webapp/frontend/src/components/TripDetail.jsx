// frontend/src/components/TripDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTrip } from '../services/apiService';
import { Carousel, Button, Form } from 'react-bootstrap';

export default function TripDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [trip, setTrip] = useState(null);
  const [passengers, setPassengers] = useState(1);

  useEffect(() => {
    fetchTrip(slug)
      .then(data => setTrip(data))
      .catch(console.error);
  }, [slug]);

  if (!trip) return <p>Loading…</p>;

  const handleBooking = () => {
    navigate('/payment', { state: { tripId: trip._id, passengers } });
  };

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
          <li><strong>Distance:</strong> {trip.distance} million km</li>
          <li><strong>Duration:</strong> {trip.durationDays} days</li>
          <li><strong>Seats left:</strong> {trip.seatsAvailable}</li>
        </ul>

        {/* Passenger Selection */}
        <Form.Group className="my-3" style={{ maxWidth: '200px' }}>
          <Form.Label>Number of Passengers</Form.Label>
          <Form.Control
            type="number"
            min="1"
            max={trip.seatsAvailable}
            value={passengers}
            onChange={e => setPassengers(+e.target.value)}
          />
        </Form.Group>

        {/* Book Now Button */}
        <Button
          onClick={handleBooking}
          disabled={trip.seatsAvailable < 1}
        >
          Book Now
        </Button>
      </div>
    </div>
  );
}
