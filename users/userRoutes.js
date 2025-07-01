const express = require('express');
const router = express.Router();
const authGuard = require('../middlwares/authGuard.js');
const { GetUsers, GetSpecificUser , UpdateUser, CreateUser, DeleteUser} = require('./UserController');

router.use(authGuard);

router.get('/', GetUsers);

router.post('/', CreateUser);

router.get('/:id', GetSpecificUser);

router.put('/:id',  UpdateUser);

router.delete('/:id', DeleteUser);


module.exports = router;