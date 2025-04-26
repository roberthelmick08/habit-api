const db = require('./db.config');

exports.getDateHabits = async (userId) => {
  const result = await db.query(
    'SELECT * FROM date_habits WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

exports.getDateHabitsWithEntries = async (userId) => {
  const result = await db.query(
    `SELECT
        dh.id AS date_habit_id,
        dh.user_id,
        dh.completed,
        (
          SELECT ARRAY_AGG(
            ROW(he.id, h.name, he.completed)
          )
          FROM habit_entries he
          INNER JOIN habits h ON he.habit_id = h.id
          WHERE he.date_habit_id = dh.id
        ) AS habit_entries
      FROM date_habits dh
      WHERE dh.user_id = $1;
  `,
    [userId]
  );
  return result.rows;
};

exports.createDateHabit = async (id, userId, completed = false) => {
  const result = await db.query(
    'INSERT INTO date_habits (id, user_id, completed) VALUES ($1, $2, $3) RETURNING *',
    [id, userId, completed]
  );
  return result.rows[0];
};
