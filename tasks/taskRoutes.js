const express = require('express');
const router = express.Router();
const { GetTasks,
     CreateTasks, 
     GetSpecificTask, 
     UpdateTasks, 
     DeleteTasks } = require('./TaskController.js');


router.get('/', GetTasks);

router.post('/', CreateTasks);

router.get('/:id', GetSpecificTask);

router.put('/:id', UpdateTasks);

router.delete('/:id', DeleteTasks);



module.exports = router;