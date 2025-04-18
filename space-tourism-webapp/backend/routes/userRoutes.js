// backend/routes/userRoutes.js

const express = require('express');
const router  = express.Router();

// Require exactly the file and export names:
const { protect, isAdmin } = require('../middlewares/authMiddleware'); 
const adminController = require('../controllers/adminController');

// Protected profile endpoint
router.get(
  '/profile',
  protect,               // <-- use the imported protect function
  (req, res) => {
    res.json({
      message: 'This is a protected profile route',
      user: req.user
    });
  }
);
router.get('/admin/users', protect, isAdmin, adminController.getAllUsers);

module.exports = router;
