const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('task_manager_theo', 'theo', 'theo', {
    host: process.env.DATABASE,
    dialect: 'mysql'
});

module.exports = sequelize;