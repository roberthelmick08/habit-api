const db = require('./db.config');

exports.createHabitEntry = async (dateHabitId, habitId, completed) => {
  const result = await db.query(
    'INSERT INTO habit_entries (date_habit_id, habit_id, completed) VALUES ($1, $2, $3) RETURNING *',
    [dateHabitId, habitId, completed]
  );
  return result.rows[0];
};

exports.getEntriesByDateHabit = async (dateHabitId) => {
  const result = await db.query(
    'SELECT * FROM habit_entries WHERE date_habit_id = $1',
    [dateHabitId]
  );
  return result.rows;
};
