const express = require('express');
const app = express();
const userRoutes = require('./routes/users');
const habitRoutes = require('./routes/habits');
// const dateHabitRoutes = require('./routes/dateHabits');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);
// app.use('/api/date-habits', dateHabitRoutes);

module.exports = app;
