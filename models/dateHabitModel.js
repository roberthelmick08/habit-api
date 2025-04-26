const db = require('./db.config');

exports.getDateHabits = async (userId) => {
  const result = await db.query(
    'SELECT * FROM date_habits WHERE user_id = $1',
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
