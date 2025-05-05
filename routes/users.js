const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

router.get('/', authController.authenticateToken, userController.getUsers);
router.post('/', authController.authenticateToken, userController.createUser);

module.exports = router;
