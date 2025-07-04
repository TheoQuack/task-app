const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js');
const api = require('./routes/apiRoutes.js')
const PORT = 3000;


const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", api);



sequelize.sync()
    .then(()=>console.log("Database Synced"))
    .catch(err=>console.error("DB Sync Error", err));


app.listen(PORT, ()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})
