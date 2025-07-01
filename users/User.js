const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: DataTypes.ENUM("administrator", "user"),
        defaultValue: 'user',
        
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        validate: {isFuture(value){
            const today = new Date();
            today.setHours(0,0,0,0);
            const dueDate = new Date(value);
            today.setHours(0,0,0,0);

            if (dueDate > today){
                throw new Error ("Cannot be in the past");
            }
        }
        }
    },

    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }



}, {timestamps: true});

module.exports = User;
