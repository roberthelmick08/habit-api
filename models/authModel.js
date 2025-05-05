const db = require('./db.config');

exports.signup = async (email, password) => {
  const result = await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email, password]
  );

  const user = result.rows[0];
  return user;
};

exports.findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE email = $1', [
    email,
  ]);
  return result.rows[0];
};
