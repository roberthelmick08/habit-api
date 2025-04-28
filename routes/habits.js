const express = require('express');
const router = express.Router();
const habitController = require('../controllers/habitController');

router.get('/:userId', habitController.getHabits);
router.post('/', habitController.createHabit);
router.put('/', habitController.updateHabit);

module.exports = router;
