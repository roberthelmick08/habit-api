const express = require('express');
const router = express.Router();
const dateHabitController = require('../controllers/dateHabitController');

router.get('/:userId', dateHabitController.getDateHabitsWithEntries);
router.post('/:userId', dateHabitController.createDateHabits);
router.post('/entry', dateHabitController.addHabitEntry);

module.exports = router;
