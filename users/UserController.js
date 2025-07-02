const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const User = require('./User');
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

async function RegisterUser(req,res) {

    try {
    const {name, email, password, role, birthDate} = req.body;

    if ( email == undefined || name == undefined || password == undefined ){
        res.status(403).json({ message: 'Lacking Credentials'});
    }

    const existEmail = await User.findOne({ where: { email } });
    if (existEmail) return res.status(400).json({ error: 'email already registered' });

    const existName = await User.findOne({ where: { name } });
    if (existName) return res.status(400).json({ error: 'name already registered' });
    

    if (password.replace(/ /g, "").length < 8) return res.status(400).json({ error: 'password too short' });


    const hash = await bcrypt.hash(password.replace(/ /g, ""), 10);
    const user = await User.create({name, role, birthDate, email, password: hash });

    res.status(201).json({ message: 'User Registered', userID: user.id });
    } catch(err) {
        console.log(err);
    }
};


async function LoginUser(req,res) {

    const { email, password } = req.body;

    const user = await User.findOne({ where: {email} });
    if (!user) return res.status(400).json({ error: "Invalid email or Password" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ error: "Invalid email or password" });

    let token = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ "token": token, "userID": user.id });

};

async function GetUsers(req,res) {
    const tasks = await User.findAll();
    res.json(tasks);
}

async function CreateUser(req,res) {

    const {name, email, password} = req.body;

    if ( email == undefined || name == undefined || password == undefined ){
        res.status(403).json({ message: 'Lacking Credentials'});
    }

    const task = await User.create(req.body);
    res.status(201).json(task);
}

async function GetSpecificUser (req,res) {
    const id = req.params.id;
    const task = await User.findByPk(id);
    task ? res.json(task) : res.status(404).json({error:"Not Found"});
}

async function UpdateUser (req,res) {
    const id = req.params.id;
    const task = await User.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.update(req.body);
    res.json(task);
}

async function DeleteUser (req,res) {

    const id = req.params.id;
    if ( id == undefined ){
        res.status(403).json({ message: 'Lacking Credentials'});
    }

    const task = await User.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.destroy();
    res.json({ message: "deleted" });
}



module.exports = { GetUsers, CreateUser, GetSpecificUser, UpdateUser , DeleteUser, LoginUser, RegisterUser };