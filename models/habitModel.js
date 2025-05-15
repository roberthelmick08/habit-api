const db = require('./db.config');

exports.getHabitsByUser = async (userId) => {
  const result = await db.query(
    'SELECT id, name, sort_order AS "sortOrder" FROM habits WHERE user_id = $1 AND archived = FALSE ORDER BY sort_order ASC',
    [userId]
  );
  return result.rows;
};

exports.createHabit = async (userId, name, dateId, sortOrder) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');
    const habitResult = await client.query(
      'INSERT INTO habits (user_id, name, sort_order) VALUES ($1, $2, $3) RETURNING *',
      [userId, name, sortOrder]
    );

    const newHabit = habitResult.rows[0];

    await client.query(
      'INSERT INTO habit_entries (date_habit_id, habit_id) VALUES ($1, $2)',
      [dateId, newHabit.id]
    );

    await client.query('COMMIT');
    return newHabit;
  } catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

exports.deleteHabit = async (userId, habitId, dateHabitId) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      `UPDATE habits
      SET archived = TRUE
      WHERE user_id = $1 AND id = $2
      RETURNING *`,
      [userId, habitId]
    );

    await client.query(
      `DELETE FROM habit_entries
      WHERE habit_id = $1 AND date_habit_id = $2`,
      [habitId, dateHabitId]
    );

    await client.query('COMMIT');

    return result.rows[0];
  } catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

exports.updateHabit = async (userId, habitId, name) => {
  try {
    const result = await db.query(
      `UPDATE habits SET name = $3 WHERE user_id = $1 AND id = $2 RETURNING *`,
      [userId, habitId, name]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
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
    console.log(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};
