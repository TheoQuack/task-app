const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('./User');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function RegisterUser(req,res) {
    try {
        let {name, email, password, role, birthDate} = req.body;

        if ( email == undefined || name == undefined || password == undefined ){
            return res.status(403).json({ message: 'Lacking Credentials'});
        }

        const existEmail = await User.findOne({ where: { email } });
        if (existEmail) return res.status(401).json({ message: 'Email already registered' });

        const existName = await User.findOne({ where: { name } });
        if (existName) return res.status(401).json({ message: 'Name already registered' });
        
        password = password.replace(/ /g, "");

        if (password.length < 8) return res.status(401).json({ message: 'Password too short' });


        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({name, role, birthDate, email, password: hash });

        res.status(201).json({ message: 'User Registered', userID: user.id });
    } catch(error) {
        console.error("Error registering user:", error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: errors }); 
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


async function LoginUser(req,res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: {email} });
        if (!user) return res.status(400).json({ message: "Invalid email or Password" });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(400).json({ message: "Invalid email or password" });

        let token = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ "token": token, "userID": user.id });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

async function GetUsers(req,res) {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error("Error getting users:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function CreateUser(req,res) {
    try {
        const {name, email, password} = req.body;

        if ( email == undefined || name == undefined || password == undefined ){
            return res.status(403).json({ message: 'Lacking Credentials'});
        }

        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error("Error creating user:", error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: errors }); 
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function GetSpecificUser (req,res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        user ? res.json(user) : res.status(404).json({message:"Not Found"});
    } catch (error) {
        console.error("Error getting specific user:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function UpdateUser (req,res) {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({message: "Not Found"});
        await user.update(req.body);
        res.json(user);
    } catch (error) {
        console.error("Error updating user:", error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: errors }); 
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function DeleteUser (req,res) {
    try {
        const id = req.params.id;
        if (id == undefined) return res.status(403).json({ message: 'Lacking Credentials'});

        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({message: "Not Found"});
        await user.destroy();
        res.json({ message: "deleted" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = { GetUsers, CreateUser, GetSpecificUser, UpdateUser , DeleteUser, LoginUser, RegisterUser };