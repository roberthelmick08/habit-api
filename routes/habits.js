const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');
const authController = require('../controllers/authController');

// FETCH
router.get(
  '/:userId',
  authController.authenticateToken,
  habitController.getHabits
);

// DELETE
router.put(
  '/:userId/:habitId/:dateId',
  authController.authenticateToken,
  habitController.deleteHabit
);

// CREATE
router.post('/', authController.authenticateToken, habitController.createHabit);

// UPDATE
router.put('/', authController.authenticateToken, habitController.updateHabit);
router.put(
  '/batch-update',
  authController.authenticateToken,
  habitController.updateHabitsBatch
);

module.exports = router;
