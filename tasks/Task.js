const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Task = sequelize.define('Task', {

      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmptyOrWhitespace(value) {
                console.log(String(value).trim(), 'after trim');
                if (String(value).trim() === '') {
                    throw new Error("Title cannot be empty or contain only whitespace.");
                }
            }
        },
    },
    status: {
        type: DataTypes.ENUM("pending", "in-progress", "testing", "done"),
        defaultValue: 'pending',
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false, // Added: dueDate cannot be null
        validate: {
            isFuture(value){
                const today = new Date();
                today.setHours(0,0,0,0);
                const dueDate = new Date(value);
                dueDate.setHours(0,0,0,0);

                if (dueDate < today){
                    throw new Error ("Due date cannot be in the past");
                }
            },
            notEmptyOrWhitespace(value) {
                console.log(String(value).trim(), 'after trim');
                if (String(value).trim() === '') {
                    throw new Error("Due date cannot be empty");
                }
            }
        }
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }

}, {timestamps: true});

module.exports = Task;