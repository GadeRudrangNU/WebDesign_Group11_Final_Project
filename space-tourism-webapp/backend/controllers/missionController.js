const Mission = require('../models/Mission');
const User = require('../models/User');
 
// 1. Create a new mission
exports.createMission = async (req, res) => {
  try {
    const { title, destination, launchDate, seatCapacity } = req.body;
    const newMission = new Mission({ title, destination, launchDate, seatCapacity });
    await newMission.save();
    res.status(201).json({ message: 'Mission created successfully', mission: newMission });
  } catch (error) {
    console.error('Create mission error:', error);
    res.status(500).json({ message: 'Server error while creating mission' });
  }
};
 
// 2. Get all missions
exports.getAllMissions = async (req, res) => {
  try {
    const missions = await Mission.find().populate('assignedGuide', 'username email');
    res.json(missions);
  } catch (error) {
    console.error('Get missions error:', error);
    res.status(500).json({ message: 'Server error while fetching missions' });
  }
};
 
// 3. Update mission status
exports.updateMissionStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Status updated', mission });
  } catch (error) {
    console.error('Update status error:', error);
    res.status(500).json({ message: 'Server error while updating status' });
  }
};
 
// 4. Assign guide to mission
exports.assignGuideToMission = async (req, res) => {
  try {
    const { id } = req.params;
    const { guideId } = req.body;
 
    const guide = await User.findById(guideId);
    if (!guide || guide.role !== 'CertifiedSpaceGuide') {
      return res.status(400).json({ message: 'Invalid guide user' });
    }
 
    const mission = await Mission.findByIdAndUpdate(id, { assignedGuide: guideId }, { new: true });
    res.json({ message: 'Guide assigned', mission });
  } catch (error) {
    console.error('Assign guide error:', error);
    res.status(500).json({ message: 'Server error while assigning guide' });
  }
};
 
// 5. Update seat capacity
exports.updateSeatCapacity = async (req, res) => {
  try {
    const { id } = req.params;
    const { seatCapacity } = req.body;
    const mission = await Mission.findByIdAndUpdate(id, { seatCapacity }, { new: true });
    res.json({ message: 'Seat capacity updated', mission });
  } catch (error) {
    console.error('Update seat error:', error);
    res.status(500).json({ message: 'Server error while updating seat capacity' });
  }
};