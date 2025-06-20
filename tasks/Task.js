const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Task = sequelize.define('Task', {

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.ENUM("pending", "in-progress", "testing", "done"),
        defaultValue: 'pending',
        
    },
    dueDate: {
        type: DataTypes.DATEONLY,
        validate: {isFuture(value){
            const today = new Date();
            today.setHours(0,0,0,0);
            const dueDate = new Date(value);
            today.setHours(0,0,0,0);

            if (dueDate < today){
                throw new Error ("Cannot be in the past");
            }
        }
    }
    }
}, {timestamps: true});

module.exports = Task;
