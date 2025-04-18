// backend/models/Trip.js
const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  name:           { type: String, required: true },
  slug:           { type: String, required: true, unique: true },
  description:    { type: String },
  location:       { type: String, required: true },
  images:         [ String ],
  cost:           { type: Number, required: true },
  distance:       { type: Number, required: true },
  durationDays:   { type: Number, required: true },
  seatsAvailable: { type: Number, default: 10 },
  createdBy:      { type: mongoose.Types.ObjectId, ref: 'User' },
  createdAt:      { type: Date, default: Date.now }
});

module.exports = mongoose.model('Trip', tripSchema);
