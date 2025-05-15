const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authController = require('../controllers/authController');

router.get(
  '/:userId',
  authController.authenticateToken,
  settingsController.getSettings
);
router.put(
  '/app/:userId',
  authController.authenticateToken,
  settingsController.updateAppSettings
);
router.put(
  '/notifications/:userId',
  authController.authenticateToken,
  settingsController.updateNotificationSettings
);

module.exports = router;
