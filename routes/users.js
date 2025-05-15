const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', authController.authenticateToken, userController.getUsers);
router.get(
  '/:userId',
  authController.authenticateToken,
  userController.getUserById
);
router.post('/', authController.authenticateToken, userController.createUser);
router.put(
  '/email/:userId',
  authController.authenticateToken,
  userController.updateEmail
);
router.put(
  '/password/:userId',
  authController.authenticateToken,
  userController.updatePassword
);

module.exports = router;
