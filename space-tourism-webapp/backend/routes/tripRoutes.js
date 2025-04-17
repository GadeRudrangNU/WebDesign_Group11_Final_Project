// backend/routes/tripRoutes.js
const express = require('express');
const router  = express.Router();
const Trip    = require('../models/Trip');
const Booking = require('../models/Booking');
const { protect, isAdmin } = require('../middlewares/authMiddleware');
 
// 1) CREATE a trip (protected; admin only)
router.post(
  '/',
  protect,
  isAdmin,
  async (req, res) => {
    try {
      const trip = await Trip.create({
        ...req.body,
        createdBy: req.user.id
      });
      res.status(201).json(trip);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: err.message });
    }
  }
);
 
// 2) LIST all trips
router.get('/', async (req, res) => {
  const trips = await Trip.find();
  res.json(trips);
});
 
// 3) GET one trip by slug
router.get('/:slug', async (req, res) => {
  const trip = await Trip.findOne({ slug: req.params.slug });
  if (!trip) return res.status(404).json({ message: 'Not found' });
  res.json(trip);
});
 
// 4) BOOK a trip
router.post(
  '/book',
  protect,
  async (req, res) => {
    const { tripId, passengers } = req.body;
    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.seatsAvailable < passengers)
      return res.status(400).json({ message: 'Not enough seats' });
 
    const booking = await Booking.create({
      user: req.user.id,
      trip: tripId,
      passengers
    });
 
    trip.seatsAvailable -= passengers;
    await trip.save();
 
    res.status(201).json(booking);
  }
);
 
module.exports = router;