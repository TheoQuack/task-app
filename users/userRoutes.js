const express = require('express');
const router = express.Router();
const { GetUsers, GetSpecificUser , UpdateUser, CreateUser, DeleteUser } = require('./UserController');

router.get('/', GetUsers);

router.post('/', CreateUser);

router.get('/:id', GetSpecificUser);

router.put('/:id',  UpdateUser);

router.delete('/:id', DeleteUser);

module.exports = router;