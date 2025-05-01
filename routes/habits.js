const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/:userId', habitController.getHabits);
router.delete('/:userId/:habitId/:dateId', habitController.deleteHabit);
router.post('/', habitController.createHabit);
router.put('/', habitController.updateHabit);
router.put('/batch-update', habitController.updateHabitsBatch);

module.exports = router;
