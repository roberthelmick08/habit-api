const db = require('./db.config');

exports.signup = async (email, password) => {
  const client = await db.connect();
  console.log('CREATE USER');

  try {
    await client.query('BEGIN');

    const result = await client.query(
      'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
      [email, password]
    );

    await client.query('INSERT INTO settings (user_id) VALUES ($1)', [
      result.rows[0].id,
    ]);

    await client.query('COMMIT');
    return result.rows[0];
  } catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

exports.findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return result.rows[0];
};
