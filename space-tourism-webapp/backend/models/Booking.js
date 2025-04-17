// backend/models/Booking.js
const mongoose = require('mongoose');
 
const bookingSchema = new mongoose.Schema({
  user:       { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  trip:       { type: mongoose.Types.ObjectId, ref: 'Trip', required: true },
  passengers: { type: Number, default: 1 },
  status: {
    type: String,
    enum: ['pending','confirmed','cancelled'],
    default: 'pending'
  },
  bookedAt: { type: Date, default: Date.now },
  paymentInfo: {
    provider: String,
    chargeId: String,
    amount:   Number,
    paidAt:   Date
  }
});
 
module.exports = mongoose.model('Booking', bookingSchema);