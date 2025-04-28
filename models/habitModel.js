const db = require('./db.config');

exports.getHabitsByUser = async (userId) => {
  const result = await db.query(
    'SELECT id, name FROM habits WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

exports.createHabit = async (userId, name, dateId) => {
  // Insert the habit
  const habitResult = await db.query(
    'INSERT INTO habits (user_id, name) VALUES ($1, $2) RETURNING *',
    [userId, name]
  );
  const newHabit = habitResult.rows[0];

  // Insert into habit_entries
  await db.query(
    'INSERT INTO habit_entries (date_habit_id, habit_id) VALUES ($1, $2)',
    [dateId, newHabit.id]
  );

  return newHabit;
};

exports.updateHabit = async (userId, habitId, name) => {
  const result = await db.query(
    `UPDATE habits
  SET name = $3
  WHERE user_id = $1 AND id = $2
  RETURNING *`,
    [userId, habitId, name]
  );
  return result.rows[0];
};
