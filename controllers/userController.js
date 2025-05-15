const userModel = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserById = async (req, res) => {
  const userId = req.params.userId;
  console.log('GET USER BY ID', userId);

  try {
    const users = await userModel.getUserById(userId);
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.createUser(name, email, password);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEmail = async (req, res) => {
  const userId = req.params.userId;
  const { email } = req.body;

  try {
    const user = await userModel.updateEmail(userId, email);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  const userId = req.params.userId;
  const { password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await userModel.updateEmail(userId, hashedPassword);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
