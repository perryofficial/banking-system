// backend/controllers/transactionController.js
const Account = require('../models/Account');
const User = require('../models/User');

const getBalance = async (userId) => {
  const last = await Account.findOne({
    where: { userId },
    order: [['createdAt', 'DESC']]
  });
  return last ? last.balanceAfter : 0;
};

exports.getTransactions = async (req, res) => {
  try {
    const reqUser = req.user; // from authMiddleware
    const { userId } = req.params;

    // customers can only access their own transactions
    if (reqUser.role === 'customer' && parseInt(userId) !== reqUser.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const tx = await Account.findAll({ where: { userId }, order: [['createdAt','DESC']] });
    const balance = await getBalance(userId);
    res.json({ balance, transactions: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deposit = async (req, res) => {
  try {
    const reqUser = req.user;
    const { userId } = req.params;
    const { amount } = req.body;

    if (reqUser.role === 'customer' && parseInt(userId) !== reqUser.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!amount || isNaN(amount) || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    // ensure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const balance = await getBalance(userId);
    const newBalance = balance + parseFloat(amount);

    const tx = await Account.create({
      userId,
      type: 'deposit',
      amount: parseFloat(amount),
      balanceAfter: newBalance
    });

    res.json({ message: 'Deposit successful', transaction: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const reqUser = req.user;
    const { userId } = req.params;
    const { amount } = req.body;

    if (reqUser.role === 'customer' && parseInt(userId) !== reqUser.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    if (!amount || isNaN(amount) || amount <= 0) return res.status(400).json({ error: 'Invalid amount' });

    // ensure user exists
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const balance = await getBalance(userId);
    if (parseFloat(amount) > balance) return res.status(400).json({ error: 'Insufficient Funds' });

    const newBalance = balance - parseFloat(amount);

    const tx = await Account.create({
      userId,
      type: 'withdraw',
      amount: parseFloat(amount),
      balanceAfter: newBalance
    });

    res.json({ message: 'Withdrawal successful', transaction: tx });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
