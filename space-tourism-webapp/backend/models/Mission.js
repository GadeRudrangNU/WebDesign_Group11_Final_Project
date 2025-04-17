const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  tripName: { type: String, required: true },
  travellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  coordinatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  guideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  instructions: { type: String, default: '' },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'cancelled', 'completed'],
    default: 'assigned'
  }
}, { timestamps: true });

module.exports = mongoose.model('Mission', missionSchema);
