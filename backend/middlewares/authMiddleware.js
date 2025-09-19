// backend/middlewares/authMiddleware.js
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Missing Authorization token' });

    const user = await User.findOne({ where: { token } });
    if (!user) return res.status(401).json({ error: 'Invalid token' });

    // attach authenticated user
    req.user = { id: user.id, role: user.role, name: user.name };
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const requireBanker = (req, res, next) => {
  if (!req.user) return res.status(401).json({ error: 'Not authenticated' });
  if (req.user.role !== 'banker') return res.status(403).json({ error: 'Banker role required' });
  next();
};

module.exports = { authMiddleware, requireBanker };
