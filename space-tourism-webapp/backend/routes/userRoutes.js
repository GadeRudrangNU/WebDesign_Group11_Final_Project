const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');

// Protected profile endpoint
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'This is a protected profile route',
    user: req.user
  });
});

// Get all certified space guides
router.get('/guides', protect, userController.getGuides);

module.exports = router;