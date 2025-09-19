// backend/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// load models so associations exist
require('./models/User');
require('./models/Account');

const sequelize = require('./config/db');

// routes
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);

// health
app.get('/', (req, res) => res.send('Banking backend running'));

// sync and start
sequelize.sync({ alter: true })
  .then(() => console.log('Database & tables ready'))
  .catch(err => console.error('DB sync error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
