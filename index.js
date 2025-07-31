// index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database.js'); // Assuming this path is correct
const apiRoutes = require('./routes/apiRoutes.js'); // Assuming you have general API routes here
const multerRoutes = require('./multer/multerRoutes.js'); // New: Import your multer routes
const createDefaultAdmin = require('./scripts/createAdmin'); // Assuming this path is correct
require('dotenv').config();

const PORT = process.env.PORT || 3000; // Use process.env.PORT for flexibility

const app = express();
app.use(express.json());
app.use(cors());

// Mount your API routes
app.use("/api", apiRoutes);

// Mount your Multer (upload) routes
// This means any route defined in multerRoutes.js will be prefixed with '/uploads'
app.use("/uploads", multerRoutes);

// Serve static files from the 'public' directory (for your frontend, etc.)
app.use(express.static('public'));

// Serve the uploaded files (make sure the 'uploads' directory exists in your project root)
app.use('/uploaded-files', express.static('uploads')); // A public URL to access uploaded files

// Example: A simple root route
app.get('/', (req, res) => {
    res.send("Hello World! Server is running.");
});

// Database synchronization and admin creation
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
        process.exit(1); // Exit if database or admin creation fails
    });