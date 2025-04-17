const User = require('../models/User');

// Get all users with role "CertifiedSpaceGuide"
exports.getGuides = async (req, res) => {
  try {
    const guides = await User.find({ role: 'CertifiedSpaceGuide' }).select('username email');
    res.json(guides);
  } catch (error) {
    console.error('Fetch guides error:', error);
    res.status(500).json({ message: 'Server error fetching guides' });
  }
};