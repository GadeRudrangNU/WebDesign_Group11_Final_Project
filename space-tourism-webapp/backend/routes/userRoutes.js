const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Test protected route
router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected profile route', user: req.user });
});

module.exports = router;
