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

exports.getDateHabitsWithEntries = async (req, res) => {
  try {
    const dateHabits = await dateHabitModel.getDateHabitsWithEntries(
      req.params.userId
    );
    res.json(dateHabits);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createDateHabits = async (req, res) => {
  const { userId, dateHabits, habits } = req.body;
  try {
    const updatedDateHabits = await dateHabitModel.createDateHabits(
      userId,
      dateHabits,
      habits
    );
    res.status(201).json(updatedDateHabits);
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
