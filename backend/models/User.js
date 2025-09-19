const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey:true, autoIncrement:true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: { type: DataTypes.STRING, allowNull: false, unique: true},
    password: {type: DataTypes.STRING, allowNull: false},
    role: { type: DataTypes.ENUM('customer', 'banker'), defaultValue: 'customer' },
    token: { type: DataTypes.STRING(36) } // <-- for access token
}, {timestamps: true});

module.exports = User;