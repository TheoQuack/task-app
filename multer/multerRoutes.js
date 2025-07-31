// routes/multerRoutes.js
const express = require('express');
const router = express.Router(); // Create an Express Router
const multer = require('multer');

// Configure Multer with diskStorage for better control
// Make sure the 'uploads/' directory exists in your project's root
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store files in a directory named 'uploads'
    },
    filename: function (req, file, cb) {
        // You can customize the filename here, e.g., to be unique
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Define your upload route directly on the router
// This route will be accessible at '/uploads/upload' because of app.use("/uploads", multerRoutes) in index.js
router.post('/upload', upload.single('File'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log('Single file uploaded:', req.file);
    res.status(200).json({
        message: 'File uploaded successfully!',
        filename: req.file.filename,
        path: `/uploaded-files/${req.file.filename}` // Public URL to access the uploaded file
    });
});

// Define other routes related to uploads if any (e.g., for multiple files, or retrieving file info)
// This route will be accessible at '/uploads/test-upload-route'
router.get('/test-upload-route', (req, res) => {
    res.send('This is a test endpoint for the upload router.');
});

module.exports = router; // Export the router