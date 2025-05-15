const settingsModel = require('../models/settingsModel');

exports.getSettings = async (req, res) => {
  const userId = req.params.userId;
  console.log('GET SETTINGS', userId);

  try {
    const users = await settingsModel.getSettingsByUser(userId);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateAppSettings = async (req, res) => {
  const userId = req.params.userId;
  const { weekStartsOn } = req.body;

  try {
    const user = await settingsModel.updateSettings(userId, weekStartsOn);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotificationSettings = async (req, res) => {
  const userId = req.params.userId;
  const { enableNotifications, reminderTime } = req.body;

  try {
    const user = await settingsModel.updateNotificationSettings(
      userId,
      enableNotifications,
      reminderTime
    );
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
