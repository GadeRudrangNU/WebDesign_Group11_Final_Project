const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');
const authMiddleware = require('../middlewares/authMiddleware');

// Get all missions (for Trip Coordinator)
router.get('/', authMiddleware, missionController.getAllMissions);

// Create a new mission (can be used by Admin or Coordinator)
router.post('/', authMiddleware, missionController.createMission);

// Update mission status (Scheduled, Delayed, Completed)
router.put('/:id/status', authMiddleware, missionController.updateMissionStatus);

// Assign a guide to mission
router.put('/:id/assign-guide', authMiddleware, missionController.assignGuideToMission);

// Update seat capacity
router.put('/:id/seats', authMiddleware, missionController.updateSeatCapacity);

module.exports = router;
