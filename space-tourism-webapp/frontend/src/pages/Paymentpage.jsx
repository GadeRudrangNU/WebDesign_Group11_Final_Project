// frontend/src/pages/PaymentPage.jsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Spinner } from 'react-bootstrap';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51REzodCzKwvVDtvZ68k61q30anblUYUgVOysfj5jcqvqlykrlXwJpFflEQYb5YyLegGbNIVKfTS2Z6EGDGUH1wdc00MXBmW6jo'); // <-- Replace with your Stripe publishable key

export default function PaymentPage() {
  const { tripId } = useParams();  // Get tripId from URL
  const navigate = useNavigate();

  useEffect(() => {
    const initiatePayment = async () => {
      try {
        const stripe = await stripePromise;

        // Create a Checkout Session on backend
        const response = await fetch('https://7ec4-2601-19b-0-4c90-ac5f-e924-d9b6-8084.ngrok-free.app/api/payment/create-checkout-session', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tripId: tripId,
            amount: 50, // Example: $50 trip price (you can make this dynamic later)
          }),
        });

        const session = await response.json();

        // Redirect user to Stripe Checkout
        const result = await stripe.redirectToCheckout({
          sessionId: session.id,
        });

        if (result.error) {
          console.error(result.error.message);
          alert('Payment redirect failed. Try again.');
          navigate('/home');
        }
      } catch (error) {
        console.error('Payment error:', error);
        alert('Payment Failed. Please try again.');
        navigate('/home');
      }
    };

    initiatePayment();
  }, [tripId, navigate]);

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <h4 className="mt-3">Redirecting to Secure Payment...</h4>
      </div>
    </Container>
  );
}
