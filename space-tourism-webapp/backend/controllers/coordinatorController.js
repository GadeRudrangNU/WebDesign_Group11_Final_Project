const Mission = require('../models/Mission');

// Fetch missions assigned to the logged-in trip coordinator
exports.getCoordinatorMissions = async (req, res) => {
  try {
    const query = { coordinatorId: req.user.id };

    // Apply status filtering if provided as query param (e.g., ?status=completed)
    if (req.query.status && req.query.status !== 'all') {
      query.status = req.query.status;
    }

    const missions = await Mission.find(query)
      .sort({ startDate: 1 })
      .populate('travellerId', 'username email')
      .populate('guideId', 'username email')
      .populate('coordinatorId', 'username email');

    res.status(200).json(missions);
  } catch (error) {
    console.error('Error fetching coordinator missions:', error);
    res.status(500).json({ message: 'Error fetching missions', error });
  }
};