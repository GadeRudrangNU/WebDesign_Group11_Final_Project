const User = require('../models/User');
const bcrypt = require('bcryptjs'); 
 
// GET /api/admin/users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // hide passwords
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error while fetching users' });
  }
};
 
// Update user role (and/or other fields)
exports.updateUser = async (req, res) => {
    try {
      const { username, role } = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        { username, role },
        { new: true, runValidators: true }
      ).select('-password');
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Server error while updating user' });
    }
  };
 
  // Delete user
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error while deleting user' });
    }
  };
  exports.createUser = async (req, res) => {
    try {
      const { username, email, password, role } = req.body;
  
      // Hash the password
      const salt     = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);
  
      // Create & save
      const newUser = new User({
        username,
        email,
        password: hashPass,
        role
      });
      await newUser.save();
  
      // Strip the password before sending back
      const userSafe = newUser.toObject();
      delete userSafe.password;
  
      res.status(201).json(userSafe);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(400).json({ message: error.message });
    }
  };