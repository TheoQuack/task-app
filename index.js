const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js');
const api = require('./routes/apiRoutes.js');
const createDefaultAdmin = require('./scripts/createAdmin');
require('dotenv').config(); 

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", api);

sequelize.sync()
    .then(() => {
        console.log("Database Synced");
        return createDefaultAdmin(
            process.env.DEFAULT_ADMIN_EMAIL,
            process.env.DEFAULT_ADMIN_PASSWORD,
            process.env.DEFAULT_ADMIN_NAME,
            process.env.DEFAULT_ADMIN_BIRTHDATE
        );
    })
    .then(() => {
        console.log("Default admin check/creation complete.");
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error("DB Sync or Admin Creation Error", err);
        process.exit(1);
    });

