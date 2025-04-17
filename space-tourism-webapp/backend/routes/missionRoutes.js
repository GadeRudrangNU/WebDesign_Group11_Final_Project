const express = require('express');
const router = express.Router();
// Placeholder mission controller function
const missionController = {
  getMissions: (req, res) => res.json({ message: 'List of missions' })
};

router.get('/', missionController.getMissions);
module.exports = router;
