const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const User = sequelize.define('User', {

    name: {

         validate: {
            notEmptyOrWhitespace(value) {
                console.log(String(value).trim(), 'after trim');
                if (String(value).trim() === '') {
                    throw new Error("Name cannot be empty.");
                }
            }
        },

        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {

         validate: {
            notEmptyOrWhitespace(value) {
                console.log(String(value).trim(), 'after trim');
                if (String(value).trim() === '') {
                    throw new Error("Role cannot be empty.");
                }
            }
        },

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
                throw new Error ("Birthdate cannot be in the future");
            }
        },

        notEmptyOrWhitespace(value) {
            console.log(String(value).trim(), 'after trim');
            if (String(value).trim() === '') {
                throw new Error("Birthdate cannot be empty.");
            }
        }

        }
    },

    email: {
        validate: {
            notEmptyOrWhitespace(value) {
                console.log(String(value).trim(), 'after trim');
                if (String(value).trim() === '') {
                    throw new Error("Email cannot be empty or contain only whitespace.");
                }
            }
        },
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },

    password: {
        validate: {
            notEmptyOrWhitespace(value) {
                console.log(String(value).trim(), 'after trim');
                if (String(value).trim() === '') {
                    throw new Error("Password cannot be empty or contain only whitespace.");
                }
            }
        },

        type: DataTypes.STRING,
        allowNull: false,
        
    }



}, {timestamps: true});

module.exports = User;
