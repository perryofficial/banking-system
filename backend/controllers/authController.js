// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ error: 'Email already used' });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role: role || 'customer' });

    res.json({ message: 'User created', user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'Missing fields' });

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = uuidv4(); // 36-char uuid
    user.token = token;
    await user.save();

    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.logout = async (req, res) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.json({ message: 'No token' });

    const user = await User.findOne({ where: { token } });
    if (user) {
      user.token = null;
      await user.save();
    }
    res.json({ message: 'Logged out' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
