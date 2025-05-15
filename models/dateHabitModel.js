const db = require('./db.config');

exports.getDateHabits = async (userId) => {
  const result = await db.query(
    'SELECT * FROM date_habits WHERE user_id = $1',
    [userId]
  );
  return result.rows;
};

exports.getDateHabitsWithEntries = async (userId) => {
  const result = await db.query(
    `SELECT
      dh.date_id AS "dateId",
      dh.completed,
      COALESCE((
        SELECT json_agg(
          json_build_object(
            'id', h.id,
            'habitEntryId', he.id,
            'name', h.name,
            'completed', he.completed,
            'sortOrder', h.sort_order
          )
          ORDER BY h.sort_order
        )
        FROM habit_entries he
        INNER JOIN habits h ON he.habit_id = h.id
        WHERE he.date_habit_id = dh.date_id AND h.user_id = $1
      ), '[]'::json) AS "habitEntries"
    FROM date_habits dh
    WHERE dh.user_id = $1
    ORDER BY dh.id ASC;
  `,
    [userId]
  );
  return result.rows;
};

exports.createDateHabits = async (userId, dateHabits, habits) => {
  const client = await db.connect();

  const resultArray = [];
  try {
    await client.query('BEGIN');
    for (const dh of dateHabits) {
      const res = await client.query(
        'INSERT INTO date_habits (date_id, user_id) VALUES ($1, $2) RETURNING *',
        [dh.dateId, userId]
      );

      const habitEntries = [];
      for (const h of habits) {
        const habitRes = await client.query(
          'INSERT INTO habit_entries (date_habit_id, habit_id) VALUES ($1, $2) RETURNING *',
          [dh.dateId, h.id]
        );

        const inserted = habitRes.rows[0];

        habitEntries.push({
          id: h.id,
          habitEntryId: inserted.id,
          name: h.name,
          completed: null,
        });
      }
      resultArray.push({
        dateId: dh.dateId,
        completed: false,
        habitEntries,
      });
    }
    await client.query('COMMIT');
    return resultArray;
  } catch (err) {
    console.log(err);
    await client.query('ROLLBACK');
  } finally {
    client.release();
  }
};

exports.updateDateHabit = async (userId, dateHabitId, completedState) => {
  try {
    const result = await db.query(
      `UPDATE date_habits SET completed = $3 WHERE user_id = $1 AND date_id = $2 RETURNING *`,
      [userId, dateHabitId, completedState]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};
