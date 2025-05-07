const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const authController = require('../controllers/authController');

router.get(
  '/:userId',
  authController.authenticateToken,
  habitController.getHabits
);
router.put(
  '/:userId/:habitId/:dateId',
  authController.authenticateToken,
  habitController.deleteHabit
);
router.post('/', authController.authenticateToken, habitController.createHabit);
router.put('/', authController.authenticateToken, habitController.updateHabit);
router.put(
  '/batch-update',
  authController.authenticateToken,
  habitController.updateHabitsBatch
);

module.exports = router;
