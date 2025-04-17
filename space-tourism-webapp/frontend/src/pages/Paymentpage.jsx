// frontend/src/pages/PaymentPage.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { bookTrip } from '../services/apiService';
import { Container, Form, Button, Card } from 'react-bootstrap';

export default function PaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripId, passengers } = location.state;

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCVC] = useState('');
  const [name, setName] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      // Mock validation
      if (cardNumber.length === 16 && expiry && cvc.length === 3 && name) {
        await bookTrip(tripId, passengers);
        navigate('/booking-success');
      } else {
        alert('Please fill all details correctly');
      }
    } catch (error) {
      console.error(error);
      alert('Payment Failed');
    }
  };

  return (
    <Container className="my-5 d-flex justify-content-center">
      <Card style={{ width: '400px', padding: '20px', borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.2)' }}>
        <h3 className="text-center mb-4">Payment Information</h3>
        <Form onSubmit={handlePayment}>
          <Form.Group className="mb-3">
            <Form.Label>Cardholder Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Card Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="1234 5678 9012 3456"
              maxLength="16"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, ''))}
              required
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <Form.Group className="mb-3 flex-grow-1">
              <Form.Label>Expiry</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                maxLength="5"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: '100px' }}>
              <Form.Label>CVC</Form.Label>
              <Form.Control
                type="text"
                placeholder="123"
                maxLength="3"
                value={cvc}
                onChange={(e) => setCVC(e.target.value.replace(/\D/g, ''))}
                required
              />
            </Form.Group>
          </div>

          <Button variant="primary" type="submit" className="w-100 mt-3">
            Pay & Book Trip
          </Button>
        </Form>
      </Card>
    </Container>
  );
}
