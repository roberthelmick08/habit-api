const db = require('./db.config');

exports.getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users');
  return result.rows;
};

exports.getUserById = async (userId) => {
  const result = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  return result.rows[0];
};

exports.createUser = async (name, email, password) => {
  const client = await db.connect();

  try {
    await client.query('BEGIN');

    const result = await client.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *',
      [name, email, password]
    );

    await client.query('INSERT INTO settings (user_id) VALUES ($1)', [userId]);

    await client.query('COMMIT');

    return result.rows[0];
  } catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
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
      `UPDATE users SET password = $2 WHERE id = $1 RETURNING *`,
      [userId, password]
    );

    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};
