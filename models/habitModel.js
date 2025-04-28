const db = require('./db.config');

exports.getHabitsByUser = async (userId) => {
  const result = await db.query(
    'SELECT id, name FROM habits WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

exports.createHabit = async (userId, name, dateId) => {
  const habitResult = await db.query(
    'INSERT INTO habits (user_id, name) VALUES ($1, $2) RETURNING *',
    [userId, name]
  );
  const newHabit = habitResult.rows[0];

  await db.query(
    'INSERT INTO habit_entries (date_habit_id, habit_id) VALUES ($1, $2)',
    [dateId, newHabit.id]
  );

  return newHabit;
};

exports.deleteHabit = async (userId, habitId, dateId) => {
  const client = await db.connect();

  await client.query('BEGIN');

  await client.query(
    'DELETE FROM habit_entries WHERE habit_id = $1 AND date_habit_id = $2',
    [habitId, dateId]
  );

  const result = await client.query(
    'DELETE FROM habits WHERE user_id = $1 AND id = $2 RETURNING *',
    [userId, habitId]
  );

  await client.query('COMMIT');

  return result.rows[0];
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
