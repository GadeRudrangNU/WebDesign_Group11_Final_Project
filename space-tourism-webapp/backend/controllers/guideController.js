const Mission = require('../models/Mission');

// Fetch missions assigned to the logged-in guide
exports.getAssignedMissions = async (req, res) => {
    try {
        const filter = { guideId: req.user.id };

        // Optional query param to filter by status (e.g., ?status=completed)
        if (req.query.status) {
            filter.status = req.query.status;
        }

        const missions = await Mission.find(filter)
            .sort({ startDate: 1 })
            .populate('travellerId', 'username email')
            .populate('coordinatorId', 'username email');

        res.status(200).json(missions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching missions', error });
    }
};

// Post or update instructions
exports.postInstructions = async (req, res) => {
    try {
        const { id } = req.params;
        const { instructions } = req.body;

        const mission = await Mission.findById(id);
        if (!mission || mission.guideId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied or mission not found' });
        }

        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            { instructions },
            { new: true, runValidators: false }
        );

        res.status(200).json({ message: 'Instructions updated successfully', mission: updatedMission });
    } catch (error) {
        res.status(500).json({ message: 'Error updating instructions', error });
    }
};

// Cancel a mission
exports.cancelMission = async (req, res) => {
    try {
        const { id } = req.params;

        const mission = await Mission.findById(id);
        if (!mission || mission.guideId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied or mission not found' });
        }

        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            { status: 'cancelled' },
            { new: true, runValidators: false }
          );

        res.status(200).json({ message: 'Mission cancelled successfully', mission: updatedMission });
    } catch (error) {
        res.status(500).json({ message: 'Error cancelling mission', error });
    }
};

// Mark mission as completed
exports.completeMission = async (req, res) => {
    try {
        const { id } = req.params;

        const mission = await Mission.findById(id);
        if (!mission || mission.guideId.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied or mission not found' });
        }

        const updatedMission = await Mission.findByIdAndUpdate(
            id,
            { status: 'Completed' }, 
            { new: true, runValidators: false }
        );

        res.status(200).json({ message: 'Mission marked as completed', mission: updatedMission });
    } catch (error) {
        res.status(500).json({ message: 'Error completing mission', error });
    }
};
