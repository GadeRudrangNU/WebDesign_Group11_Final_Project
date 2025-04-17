const mongoose = require('mongoose');
 
const missionSchema = new mongoose.Schema({
  title:       { type: String, required: true },
  destination: { type: String, required: true },
  status: {
    type: String,
    enum: ['Scheduled', 'Delayed', 'Completed'],
    default: 'Scheduled',
  },
  launchDate:   { type: Date, required: true },
  seatCapacity: { type: Number, required: true },
  assignedGuide: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });
 
module.exports = mongoose.model('Mission', missionSchema);