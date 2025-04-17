const Mission = require('../models/Mission');

// Used by Trip Coordinator to create and assign missions
exports.createMission = async (req, res) => {
  try {
    const { tripName, travellerId, coordinatorId, guideId, startDate, endDate } = req.body;

    const mission = new Mission({
      tripName,
      travellerId,
      coordinatorId,
      guideId,
      startDate,
      endDate
    });

    await mission.save();
    res.status(201).json({ message: 'Mission created successfully', mission });
  } catch (error) {
    res.status(500).json({ message: 'Error creating mission', error });
  }
};

// Fetch all missions (for admin or dashboard display)
exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find()
      .populate('travellerId', 'username email')
      .populate('guideId', 'username email')
      .populate('coordinatorId', 'username email');

    res.status(200).json(missions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching missions', error });
  }
};
