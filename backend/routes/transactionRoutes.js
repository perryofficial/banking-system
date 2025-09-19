// backend/routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { getTransactions, deposit, withdraw } = require('../controllers/transactionController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.use(authMiddleware);

// note: userId in URL is the user whose account to access
router.get('/:userId', getTransactions);
router.post('/:userId/deposit', deposit);
router.post('/:userId/withdraw', withdraw);

module.exports = router;
