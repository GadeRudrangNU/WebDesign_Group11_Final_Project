const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // All routes protected

router.get('/', missionController.getAllMissions);
router.post('/', missionController.createMission);

module.exports = router;
