const habitModel = require('../models/habitModel');

exports.getHabits = async (req, res) => {
  try {
    const habits = await habitModel.getHabitsByUser(req.params.userId);
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createHabit = async (req, res) => {
  const { userId, name, dateId } = req.body;
  try {
    const habit = await habitModel.createHabit(userId, name, dateId);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  const { userId, habitId, name } = req.body;
  try {
    const habit = await habitModel.updateHabit(userId, habitId, name);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
