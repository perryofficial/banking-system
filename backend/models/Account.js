const {DataTypes} = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Account = sequelize.define('Account',{
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: { type: DataTypes.ENUM('deposit', 'withdraw'), allowNull: false},
    amount: { type: DataTypes.FLOAT, allowNull: false },
    balanceAfter: { type: DataTypes.FLOAT, allowNull: false}
}, {timestamps: true});


User.hasMany(Account, { foreignKey: 'userId'});
Account.belongsTo(User, {foreignKey: 'userId'});


module.exports = Account;