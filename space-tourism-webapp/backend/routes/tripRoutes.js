// backend/routes/tripRoutes.js
const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const Booking = require('../models/Booking');
const { protect } = require('../middlewares/authMiddleware');

// Middleware: Admin or TripCoordinator only
function isCoordinatorOrAdmin(req, res, next) {
  const role = req.user.role;
  if (role === 'Admin' || role === 'TripCoordinator') {
    return next();
  }
  return res.status(403).json({ message: 'Forbidden: Admin or TripCoordinator only' });
}

// CREATE a trip
router.post('/', protect, isCoordinatorOrAdmin, async (req, res) => {
  try {
    const {
      name,
      slug,
      location,
      cost,
      distance,
      durationDays,
      seatsAvailable,
      launchDate,
      description,
      images
    } = req.body;

    if (!name || !slug || !location || !cost || !distance || !durationDays || !launchDate) {
      return res.status(400).json({ message: 'Missing required trip fields.' });
    }

    const trip = await Trip.create({
      name,
      slug,
      location,
      cost,
      distance,
      durationDays,
      seatsAvailable,
      description,
      images,
      launchDate: new Date(launchDate),
      createdBy: req.user.id,
    });

    res.status(201).json(trip);
  } catch (err) {
    console.error('Trip creation error:', err);
    res.status(400).json({ message: err.message });
  }
});

// GET all trips
router.get('/', async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trips' });
  }
});

// GET a single trip by slug
router.get('/:slug', async (req, res) => {
  try {
    const trip = await Trip.findOne({ slug: req.params.slug });
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    res.json(trip);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch trip' });
  }
});

// BOOK a trip
router.post('/book', protect, async (req, res) => {
  try {
    const { tripId, passengers } = req.body;

    const trip = await Trip.findById(tripId);
    if (!trip) return res.status(404).json({ message: 'Trip not found' });
    if (trip.seatsAvailable < passengers) {
      return res.status(400).json({ message: 'Not enough seats available' });
    }

    const booking = await Booking.create({
      user: req.user.id,
      trip: tripId,
      passengers,
    });

    trip.seatsAvailable -= passengers;
    await trip.save();

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Booking failed' });
  }
});

// UPDATE a trip
router.put('/:id', protect, isCoordinatorOrAdmin, async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      launchDate: req.body.launchDate ? new Date(req.body.launchDate) : undefined,
    };

    const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedTrip);
  } catch (err) {
    console.error('Trip update error:', err);
    res.status(500).json({ message: 'Error updating trip' });
  }
});

// DELETE a trip
router.delete('/:id', protect, isCoordinatorOrAdmin, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    console.error('Trip delete error:', err);
    res.status(500).json({ message: 'Error deleting trip' });
  }
});

module.exports = router;