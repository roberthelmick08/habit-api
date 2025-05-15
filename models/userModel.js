const db = require('./db.config');

exports.getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

exports.getUserById = async (userId) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

exports.updateEmail = async (userId, email) => {
  try {
    const result = await db.query(
      `UPDATE users SET email = $2 WHERE id = $1 RETURNING *`,
      [userId, email]
    );

    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

exports.updatePassword = async (userId, password) => {
  try {
    const result = await db.query(
      `UPDATE users SET password_hash = $2 WHERE id = $1 RETURNING *`,
      [userId, password]
    );

    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};
