import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function BookingSuccess() {
  const navigate = useNavigate();

  return (
    <Container className="text-center my-5">
      <h2>Booking Successful 🎉</h2>
      <p>Your trip has been booked successfully!</p>
      <Button variant="success" onClick={() => navigate('/')}>
        Go Back to Home
      </Button>
    </Container>
  );
}
