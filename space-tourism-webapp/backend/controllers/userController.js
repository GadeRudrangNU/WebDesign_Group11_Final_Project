const User = require('../models/User');

// 1. Get all Certified Space Guides
exports.getGuides = async (req, res) => {
  try {
    const guides = await User.find({ role: 'CertifiedSpaceGuide' }).select('username email');
    res.json(guides);
  } catch (error) {
    console.error('Fetch guides error:', error);
    res.status(500).json({ message: 'Server error fetching guides' });
  }
};

// 2. Get all users (admin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

// 3. Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error });
  }
};