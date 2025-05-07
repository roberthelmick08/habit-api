const express = require('express');
const router = express.Router();
const dateHabitController = require('../controllers/dateHabitController');
const authController = require('../controllers/authController');

router.get(
  '/:userId',
  authController.authenticateToken,
  dateHabitController.getDateHabitsWithEntries
);
router.post(
  '/:userId',
  authController.authenticateToken,
  dateHabitController.createDateHabits
);
router.post(
  '/entry',
  authController.authenticateToken,
  dateHabitController.addHabitEntry
);

module.exports = router;
