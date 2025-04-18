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

module.exports = router;
