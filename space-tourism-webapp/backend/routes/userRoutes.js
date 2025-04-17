// backend/routes/userRoutes.js
<<<<<<< HEAD

const express = require('express');
const router  = express.Router();

// Require exactly the file and export names:
const { protect } = require('../middlewares/authMiddleware'); 

=======
 
const express = require('express');
const router  = express.Router();
 
// Require exactly the file and export names:
const { protect } = require('../middlewares/authMiddleware');
 
>>>>>>> 1ac4c4de8f6e2a9cd938ba9f1e21e10fbff630ae
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
<<<<<<< HEAD

module.exports = router;
=======
 
module.exports = router;
>>>>>>> 1ac4c4de8f6e2a9cd938ba9f1e21e10fbff630ae
