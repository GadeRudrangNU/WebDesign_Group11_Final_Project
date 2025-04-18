// backend/routes/userRoutes.js

const express = require('express');

const router  = express.Router();

const { protect, isAdmin } = require('../middlewares/authMiddleware');
const adminController = require('../controllers/adminController');

router.get(
  '/profile',
  protect,              
  (req, res) => {
    res.json({
      message: 'This is a protected profile route',
      user: req.user
    });
  }
);
router.get('/admin/users', protect, isAdmin, adminController.getAllUsers);
 
// Admin-only routes
router.get(
  '/',
  protect,
  isAdmin,
  adminController.getAllUsers
);
router.put(
  '/admin/users/:id',
  protect,
  isAdmin,
  adminController.updateUser
);
 
router.delete(
  '/admin/users/:id',
  protect,
  isAdmin,
  adminController.deleteUser
);
// CREATE a new user
router.post(
  '/',
  protect,
  isAdmin,
  adminController.createUser
);

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
