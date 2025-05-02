CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL
);

CREATE TABLE date_habits (
  id VARCHAR(10) PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id),
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE habit_entries (
  id SERIAL PRIMARY KEY,
  date_habit_id VARCHAR(10) REFERENCES date_habits(id),
  habit_id INTEGER REFERENCES habits(id),
  completed BOOLEAN
);