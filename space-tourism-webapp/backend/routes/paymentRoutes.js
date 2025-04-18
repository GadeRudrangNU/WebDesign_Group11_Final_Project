// backend/routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Stripe = require('stripe');

const stripe = Stripe('sk_test_51REzodCzKwvVDtvZgKLjxxFvcAcRrFFNhGSSpvlmFMmz8NonCt1XFiGgOglRWB3YVXpyst7WFPZadN8ATUiYE2Mo00BqVvHgjn'); // <-- replace with your real secret key

router.post('/create-checkout-session', async (req, res) => {
  const { tripId, amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Trip ID: ${tripId}`,  // you can show trip name if available
          },
          unit_amount: amount * 100, // Stripe expects amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'https://1e12-2601-19b-0-4c90-ac5f-e924-d9b6-8084.ngrok-free.app/booking-success',
      cancel_url: 'https://1e12-2601-19b-0-4c90-ac5f-e924-d9b6-8084.ngrok-free.app/payment',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong while creating session' });
  }
});

module.exports = router;
