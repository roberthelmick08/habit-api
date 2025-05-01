const db = require('./db.config');

exports.getHabitsByUser = async (userId) => {
  const result = await db.query(
    'SELECT id, name, sort_order AS "sortOrder" FROM habits WHERE user_id = $1 ORDER BY sort_order ASC',
    [userId]
  );
  return result.rows;
};

exports.createHabit = async (userId, name, dateId, sortOrder) => {
  const habitResult = await db.query(
    'INSERT INTO habits (user_id, name, sort_order) VALUES ($1, $2, 3) RETURNING *',
    [userId, name, sortOrder]
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

exports.updateHabit = async (userId, habitId, name, sortOrder) => {
  const result = await db.query(
    `UPDATE habits
      SET name = $3 AND sort_order = $4
      WHERE user_id = $1 AND id = $2
      RETURNING *`,
    [userId, habitId, name, sortOrder]
  );
  return result.rows[0];
};

exports.updateHabitsBatch = async (userId, habits) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    for (const habit of habits) {
      await client.query(
        'UPDATE habits SET sort_order = $2 WHERE user_id = $1 AND id = $3',
        [userId, habit.sortOrder, habit.id]
      );
    }
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};
