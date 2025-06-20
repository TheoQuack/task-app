const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('task_manager_theo', 'theo', 'theo', {
    host: '192.168.1.85',
    dialect: 'mysql'
});

module.exports = sequelize;