const express = require('express');
const router = express.Router();
const dateHabitController = require('../controllers/dateHabitController');

router.get('/:userId', dateHabitController.getDateHabits);
router.post('/', dateHabitController.createDateHabit);
router.post('/entry', dateHabitController.addHabitEntry);

module.exports = router;
