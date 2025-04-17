import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

export default function BookingSuccess() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  return (
    <Container className="text-center my-5">
      <Confetti width={width} height={height} />
      <h2 className="mb-4">🎉 Booking Confirmed!</h2>
      <p>Thank you for booking with Space Tourism! Your adventure awaits 🚀</p>
      <Button
        variant="success"
        className="mt-4"
        onClick={() => navigate('/trips')}
      >
        Back to Trips
      </Button>
    </Container>
  );
}
