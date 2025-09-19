// backend/controllers/userController.js
const User = require('../models/User');
const Account = require('../models/Account');

exports.getAllUsers = async (req, res) => {
  try {
    // For demo: bankers only
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserWithTransactions = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt'],
      include: [{
        model: Account,
        attributes: ['id', 'type', 'amount', 'balanceAfter', 'createdAt'],
      }]
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
