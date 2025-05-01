const express = require('express');
const router = express.Router();
const habitEntryController = require('../controllers/habitEntryController');

router.put('/', habitEntryController.updateHabitEntry);

module.exports = router;
