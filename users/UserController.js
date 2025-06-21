const express = require('express');
const router = express.Router();
const User = require('./User');

async function GetUsers(req,res) {
    const tasks = await User.findAll();
    res.json(tasks);
}

async function CreateUser(req,res) {
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
    const task = await User.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.destroy();
    res.json({ message: "deleted" });
}



module.exports = { GetUsers, CreateUser, GetSpecificUser, UpdateUser , DeleteUser };