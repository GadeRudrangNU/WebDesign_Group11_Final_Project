// frontend/src/components/TripDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchTrip } from '../services/apiService'; // Assuming you already have this function
import { Button, Container } from 'react-bootstrap'; // If you are using Bootstrap

export default function TripDetail() {
  const { slug } = useParams();             // Get trip slug from URL
  const navigate = useNavigate();            // To navigate programmatically
  const [trip, setTrip] = useState(null);     // Trip data state

  useEffect(() => {
    const getTripDetails = async () => {
      try {
        const data = await fetchTrip(slug);
        setTrip(data);
      } catch (error) {
        console.error('Failed to fetch trip details:', error);
      }
    };

    getTripDetails();
  }, [slug]);

  const handleBooking = async () => {
    try {
      // Instead of direct booking, redirect to payment page
      navigate(`/payment/${trip._id}`, { state: { passengers: 1 } }); // Example: you can pass passengers if needed
    } catch (err) {
      console.error(err);
      alert('Failed to proceed to booking!');
    }
  };

  if (!trip) {
    return <div>Loading trip details...</div>;
  }

  return (
    <Container className="my-5">
      <h2>{trip.name}</h2>
      <p>{trip.description}</p>
      <p><strong>Price:</strong> ${trip.price}</p>
      <Button onClick={handleBooking} variant="primary">
        Book Now
      </Button>
    </Container>
  );
}
