const express = require('express');
const router = express.Router();
const Task = require('./Task.js');


router.get('/api/tasks', async (req,res)=>{
    const tasks = await Task.findAll();
    res.json(tasks);
})

router.post('/api/tasks', async (req,res)=>{
    const task = await Task.create(req.body);
    res.status(201).json(task);
    
});

router.get('/api/tasks/:id', async (req,res)=>{
    const id = req.params.id;
    const task = await Task.findByPk(id);
    task ? res.json(task) : res.status(404).json({error:"Not Found"});
})

router.put('/api/tasks/:id', async (req,res)=>{
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.update(req.body);
    res.json(task);

})

router.delete('/api/tasks/:id', async (req,res)=>{
    const id = req.params.id;
    const task = await Task.findByPk(id);
    if (!task) return res.status(404).json({error: "Not Found"});
    await task.destroy();
    res.json({ message: "deleted" });
})





module.exports = router;