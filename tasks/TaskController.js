const express = require('express');
const router = express.Router();
const Task = require('./Task.js'); // Assuming Task.js is in the same directory

async function GetTasks (req,res) {
    try {
        const tasks = await Task.findAll({where: {userID: req.user.userID}});
        res.json(tasks);
    } catch (error) {
        console.error("Error getting tasks:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function CreateTasks (req,res) {
    try {
        req.body.userID = req.user.userID; 

        const task = await Task.create(req.body);
        res.status(201).json(task);
    } catch (error) {
        console.error("Error creating task:", error);

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: errors, errors: errors });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function GetSpecificTask (req,res) {
    try {
        const id = req.params.id;
        const task = await Task.findOne({where:{ userID: req.user.userID, id }})
        task ? res.json(task) : res.status(404).json({error:"Not Found"});
    } catch (error) {
        console.error("Error getting specific task:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function UpdateTasks (req,res) {
    try {

        const id = req.params.id;
        const task = await Task.findOne({where:{ userID: req.user.userID, id }});

        if (!task) {
            return res.status(404).json({error: "Not Found"});
        }

        // Sequelize will apply validations here too
        await task.update(req.body);
        res.json(task);
    } catch (error) {
        console.error("Error updating task:", error);

        // --- IMPORTANT: Handle Sequelize Validation Errors for Update too ---
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: errors });
        }
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

async function DeleteTasks (req,res) {
    try {
        const id = req.params.id;
        const task = await Task.findOne({where:{ userID: req.user.userID, id }});
        if (!task) {
            return res.status(404).json({error: "Not Found"});
        }
        await task.destroy();
        res.json({ message: "deleted" });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

module.exports = { GetTasks, CreateTasks, GetSpecificTask, UpdateTasks, DeleteTasks };