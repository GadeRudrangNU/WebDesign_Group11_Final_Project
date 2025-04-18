const express = require('express');
const router = express.Router();
const missionController = require('../controllers/missionController');

const { protect }       = require('../middlewares/authMiddleware');

function isCoordinatorOrAdmin(req, res, next) {
  if (
    req.user &&
    (req.user.role === 'TripCoordinator' || req.user.role === 'Admin')
  ) {
    return next();
  }
  return res.status(403).json({ message: 'Coordinators or Admins only' });
}

router.get(
  '/', 
  protect, 
  isCoordinatorOrAdmin,
  missionController.getAllMissions
);

router.post(
  '/', 
  protect, 
  isCoordinatorOrAdmin,
  missionController.createMission
);

router.put(
  '/:id/status',
  protect,
  isCoordinatorOrAdmin,
  missionController.updateMissionStatus
);

router.put(
  '/:id/assign-guide',
  protect,
  isCoordinatorOrAdmin,
  missionController.assignGuideToMission
);

router.put(
  '/:id/seats',
  protect,
  isCoordinatorOrAdmin,
  missionController.updateSeatCapacity
);

module.exports = router;

const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware); // All routes protected

router.get('/', missionController.getAllMissions);
router.post('/', missionController.createMission);

module.exports = router;

