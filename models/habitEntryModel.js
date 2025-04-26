const db = require('./db.config');

exports.createHabitEntry = async (dateHabitId, habitId, completed) => {
  const result = await db.query(
    'INSERT INTO habit_entries (date_habit_id, habit_id, completed) VALUES ($1, $2, $3) RETURNING *',
    [dateHabitId, habitId, completed]
  );
  return result.rows[0];
};

exports.getEntriesByUserDateHabit = async (userId, dateHabitId) => {
  const result = await db.query(
    'SELECT * FROM habit_entries WHERE user_id = $1 AND date_habit_id = $2',
    [userId, dateHabitId]
  );
  return result.rows;
};
