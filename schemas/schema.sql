CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);

CREATE TABLE habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  archived BOOLEAN DEFAULT FALSE
);

CREATE TABLE date_habits (
  id SERIAL PRIMARY KEY,
  date_id VARCHAR(10) NOT NULL,
  user_id INTEGER REFERENCES users(id),
  completed BOOLEAN DEFAULT FALSE
);

CREATE TABLE habit_entries (
  id SERIAL PRIMARY KEY,
  date_habit_id VARCHAR(10),
  habit_id INTEGER REFERENCES habits(id),
  completed BOOLEAN
);

CREATE TABLE settings (
  user_id INTEGER REFERENCES users(id),
  enable_notifications BOOLEAN DEFAULT FALSE,
  reminder_time VARCHAR(5) DEFAULT '21:00',
  week_starts TEXT DEFAULT 'Sunday'
);