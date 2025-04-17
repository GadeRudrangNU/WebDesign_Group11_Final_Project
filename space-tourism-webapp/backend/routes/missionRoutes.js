const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');
const { protect } = require('../middlewares/authMiddleware');

// Role-based access: only Trip Coordinators or Admins
function isCoordinatorOrAdmin(req, res, next) {
  if (
    req.user &&
    (req.user.role === 'TripCoordinator' || req.user.role === 'Admin')
  ) {
    return next();
  }
  return res.status(403).json({ message: 'Coordinators or Admins only' });
}

// GET all missions
router.get(
  '/',
  protect,
  isCoordinatorOrAdmin,
  missionController.getAllMissions
);

// POST new mission
router.post(
  '/',
  protect,
  isCoordinatorOrAdmin,
  missionController.createMission
);

// PUT: Update mission status
router.put(
  '/:id/status',
  protect,
  isCoordinatorOrAdmin,
  missionController.updateMissionStatus
);

// PUT: Assign guide to a mission
router.put(
  '/:id/assign-guide',
  protect,
  isCoordinatorOrAdmin,
  missionController.assignGuideToMission
);

// PUT: Update seat capacity
router.put(
  '/:id/seats',
  protect,
  isCoordinatorOrAdmin,
  missionController.updateSeatCapacity
);

module.exports = router;