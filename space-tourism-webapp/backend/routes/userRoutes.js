const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');

// Test protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});

// Add this route for Admin to fetch all users
router.get('/', authMiddleware, roleMiddleware('Admin'), userController.getAllUsers);

// Optional: Get user by ID
router.get('/:id', authMiddleware, roleMiddleware('Admin'), userController.getUserById);

module.exports = router;
