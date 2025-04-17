// backend/routes/userRoutes.js
 
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
 
module.exports = router;