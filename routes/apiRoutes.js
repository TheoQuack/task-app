const express = require('express');
const router = express.Router();
const taskRoutes = require('../tasks/taskRoutes');
const userRoutes = require('../users/userRoutes');

const { RegisterUser, LoginUser } = require('../users/UserController')
router.post('/register', RegisterUser);
router.post('/login', LoginUser);

router.use("/tasks", taskRoutes);
router.use("/users", userRoutes );



module.exports = router;