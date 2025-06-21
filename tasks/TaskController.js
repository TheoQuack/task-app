const express = require('express');
const router = express.Router();
const Task = require('./Task.js');

async function GetTasks (req,res) {
    const tasks = await Task.findAll();
    res.json(tasks);
}

async function CreateTasks (req,res) {
    const task = await Task.create(req.body);
    res.status(201).json(task);
}

async function GetSpecificTask (req,res) {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    task ? res.json(task) : res.status(404).json({error:"Not Found"});
}

async function UpdateTasks (req,res) {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.update(req.body);
    res.json(task);
}

async function DeleteTasks (req,res) {
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.destroy();
    res.json({ message: "deleted" });
}



module.exports = { GetTasks, CreateTasks, GetSpecificTask, UpdateTasks, DeleteTasks };