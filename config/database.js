const { Sequelize } = require('sequelize');
require('dotenv').config();

// const sequelize = new Sequelize('task_manager_theo', 'theo', 'theo', {
//     host: process.env.DATABASE,
//     dialect: 'mysql'
// });

const sequelize = new Sequelize(process.env.DATABASE, process.env.USER , process.env.PASSWORD , {
    host: process.env.HOST,
    dialect: 'mysql'
});


module.exports = sequelize;