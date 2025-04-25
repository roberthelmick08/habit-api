const db = require('./db.config');

exports.getHabitsByUser = async (userId) => {
  const result = await db.query('SELECT * FROM habits WHERE user_id = $1', [
    userId,
  ]);
  return result.rows;
};

exports.createHabit = async (userId, name) => {
  const result = await db.query(
    'INSERT INTO habits (user_id, name) VALUES ($1, $2) RETURNING *',
    [userId, name]
  );
  return result.rows[0];
};
