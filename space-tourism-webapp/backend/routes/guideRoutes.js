const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');
const { protect } = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// All routes below are protected and for GUIDE role only
router.use(protect, roleMiddleware('CertifiedSpaceGuide'));

router.get('/missions', guideController.getAssignedMissions);
router.patch('/missions/:id/instructions', guideController.postInstructions);
router.patch('/missions/:id/cancel', guideController.cancelMission);
router.patch('/missions/:id/complete', guideController.completeMission);

module.exports = router;
