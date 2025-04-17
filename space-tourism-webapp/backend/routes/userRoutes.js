const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// 1. Protected profile route
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'This is a protected profile route',
    user: req.user
  });
});

// 2. Certified Guides (for Coordinators)
router.get('/guides', protect, userController.getGuides);

// 3. Admin-only: get all users
router.get('/', protect, roleMiddleware('Admin'), userController.getAllUsers);

// 4. Admin-only: get user by ID
router.get('/:id', protect, roleMiddleware('Admin'), userController.getUserById);

module.exports = router;