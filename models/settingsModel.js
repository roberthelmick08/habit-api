const db = require('./db.config');

exports.getSettingsByUser = async (userId) => {
  const result = await db.query(
    'SELECT enable_notifications AS "enableNotifications", reminder_time AS "reminderTime", week_starts AS "weekStartsOn" FROM settings WHERE user_id = $1',
    [userId]
  );
  return result.rows[0];
};

exports.updateAppSettings = async (userId, weekStartsOn) => {
  try {
    const result = await db.query(
      `UPDATE settings SET (week_starts) VALUES($2) WHERE user_id = $1`,
      [userId, weekStartsOn]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};

exports.updateNotificationSettings = async (
  userId,
  enableNotifications,
  reminderTime
) => {
  try {
    const result = await db.query(
      `UPDATE settings SET (enable_notifications, reminder_time) VALUES($2, $3) WHERE user_id = $1`,
      [userId, enableNotifications, reminderTime]
    );
    return result.rows[0];
  } catch (err) {
    console.log(err);
  }
};
