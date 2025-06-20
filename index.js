const express = require('express');
const sequelize = require('./config/database.js');
const Task = require('./tasks/Task.js');
const PORT = 3000;

const app = express();
const taskRoutes = require('./tasks/taskRoutes');

app.use(express.json());


sequelize.sync()
    .then(()=>console.log("Database Synced"))
    .catch(err=>console.error("DB Sync Error", err));


app.get('/api/tasks',  taskRoutes);
app.post('/api/tasks', taskRoutes);
app.get('/api/tasks/:id',  taskRoutes);
app.put('/api/tasks/:id', taskRoutes);
app.delete('/api/tasks/:id', taskRoutes);


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
