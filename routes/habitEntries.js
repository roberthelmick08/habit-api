const express = require('express');
const router = express.Router();
const habitEntryController = require('../controllers/habitEntryController');
const authController = require('../controllers/authController');

router.put(
  '/',
  authController.authenticateToken,
  habitEntryController.updateHabitEntry
);

module.exports = router;
