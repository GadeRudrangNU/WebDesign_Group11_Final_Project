// backend/routes/userRoutes.js

const express = require('express');
const router = express.Router();

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');
// const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const userController = require('../controllers/userController');

// Test protected route
router.get('/profile', protect, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});

// ✅ Admin-only routes
router.post('/', protect, roleMiddleware('Admin'), adminController.createUser);

router.put('/:id', protect, roleMiddleware('Admin'), adminController.updateUser);

router.get('/', protect, roleMiddleware('Admin'), userController.getAllUsers);

router.get('/:id', protect, roleMiddleware('Admin'), userController.getUserById);

router.delete('/:id', protect, roleMiddleware('Admin'), adminController.deleteUser);

module.exports = router;


