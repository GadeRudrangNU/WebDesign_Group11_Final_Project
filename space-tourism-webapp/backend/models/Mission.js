const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  tripName:    { type: String }, // optional alternate name
  destination: { type: String, required: true },

  status: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Completed', 'pending', 'assigned', 'cancelled'],
    default: 'Scheduled'
  },

  launchDate:   { type: Date, required: true },
  startDate:    { type: Date }, // optional
  endDate:      { type: Date }, // optional
  instructions: { type: String, default: '' },

  seatCapacity: { type: Number, required: true },

  assignedGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  travellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },

  coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  }

}, { timestamps: true });

module.exports = mongoose.model('Mission', missionSchema);