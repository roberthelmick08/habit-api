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
  const { userId, name, dateId, sortOrder } = req.body;
  try {
    const habit = await habitModel.createHabit(userId, name, dateId, sortOrder);
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteHabit = async (req, res) => {
  try {
    const habits = await habitModel.deleteHabit(
      req.params.userId,
      req.params.habitId,
      req.params.dateId
    );
    res.json(habits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHabit = async (req, res) => {
  const { userId, habitId, name, sortOrder } = req.body;
  try {
    const habit = await habitModel.updateHabit(
      userId,
      habitId,
      name,
      sortOrder
    );
    res.status(201).json(habit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateHabitsBatch = async (req, res) => {
  const { userId, habits } = req.body;
  try {
    const updatedHabits = await habitModel.updateHabitsBatch(userId, habits);
    res.status(201).json(updatedHabits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
