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
        dh.id AS "dateId",
        dh.completed,
        (
          SELECT json_agg(
            json_build_object('id', h.id, 'habitEntryId', he.id, 'name', h.name, 'completed', he.completed)
          )
          FROM habit_entries he
          INNER JOIN habits h ON he.habit_id = h.id
          WHERE he.date_habit_id = dh.id
        ) AS habits
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
