const express = require('express');
const router = express.Router();
const taskRoutes = require('../tasks/taskRoutes');
const userRoutes = require('../users/userRoutes');

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes );

module.exports = router;