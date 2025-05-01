const habitEntryModel = require('../models/habitEntryModel');

exports.updateHabitEntry = async (req, res) => {
  const { habitEntryId, completed } = req.body;
  try {
    const habitEntry = await habitEntryModel.updateHabitEntry(
      habitEntryId,
      completed
    );
    res.status(201).json(habitEntry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
