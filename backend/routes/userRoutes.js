// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { getAllUsers, getUserWithTransactions } = require('../controllers/userController');
const { authMiddleware, requireBanker } = require('../middlewares/authMiddleware');

router.use(authMiddleware);
router.get('/', requireBanker, getAllUsers);
router.get('/:id', requireBanker, getUserWithTransactions);

module.exports = router;
