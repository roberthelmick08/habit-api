const dateHabitModel = require('../models/dateHabitModel');
const habitEntryModel = require('../models/habitEntryModel');

exports.getDateHabits = async (req, res) => {
  try {
    const dateHabits = await dateHabitModel.getDateHabits(req.params.userId);
    res.json(dateHabits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDateHabit = async (req, res) => {
  const { id, userId, completed } = req.body;
  try {
    const dateHabit = await dateHabitModel.createDateHabit(
      id,
      userId,
      completed
    );
    res.status(201).json(dateHabit);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addHabitEntry = async (req, res) => {
  const { dateHabitId, habitId, completed } = req.body;
  try {
    const entry = await habitEntryModel.createHabitEntry(
      dateHabitId,
      habitId,
      completed
    );
    res.status(201).json(entry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
