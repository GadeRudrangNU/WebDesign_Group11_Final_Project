// backend/routes/userRoutes.js

// Test protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});
router.get('/guides', authMiddleware, userController.getGuides);
const express = require('express');
const router  = express.Router();

// Require exactly the file and export names:
const { protect } = require('../middlewares/authMiddleware'); 

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

// Get all certified space guides
router.get('/guides', protect, userController.getGuides);

module.exports = router;
