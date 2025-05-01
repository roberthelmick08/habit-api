const db = require('./db.config');

exports.createHabitEntry = async (
  dateHabitId,
  habitId,
  completed,
  sortOrder
) => {
  const result = await db.query(
    'INSERT INTO habit_entries (date_habit_id, habit_id, completed, sortOrder) VALUES ($1, $2, $3, $4) RETURNING *',
    [dateHabitId, habitId, completed, sortOrder]
  );
  return result.rows[0];
};

exports.getEntriesByUserDateHabit = async (userId, dateHabitId) => {
  const result = await db.query(
    'SELECT * FROM habit_entries WHERE user_id = $1 AND date_habit_id = $2 ORDER BY sort_order ASC',
    [userId, dateHabitId]
  );
  return result.rows;
};

exports.updateHabitEntry = async (habitEntryId, completed) => {
  const result = await db.query(
    `UPDATE habit_entries
      SET completed = $2
      WHERE id = $1
      RETURNING *`,
    [habitEntryId, completed]
  );
  return result.rows[0];
};