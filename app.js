const express = require('express');
const app = express();
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const settingRoutes = require('./routes/settings');
const habitRoutes = require('./routes/habits');
const habitEntryRoutes = require('./routes/habitEntries');
const dateHabitRoutes = require('./routes/dateHabits');

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/habits', habitRoutes);
app.use('/api/habit-entries', habitEntryRoutes);
app.use('/api/date-habits', dateHabitRoutes);

module.exports = app;
