const express = require('express');
const router = express.Router();
const { GetUsers, GetSpecificUser , UpdateUser, CreateUser, DeleteUser, RegisterUser, LoginUser } = require('./UserController');

router.get('/', GetUsers);

router.post('/', CreateUser);

router.get('/:id', GetSpecificUser);

router.put('/:id',  UpdateUser);

router.delete('/:id', DeleteUser);

router.post('/register', RegisterUser);

router.post('/login', LoginUser);


module.exports = router;