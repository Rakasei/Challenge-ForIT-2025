const express = require('express');
const router = express.Router();
const taskController = require('../controllers/')

router.get('/tasks', taskController.list);

router.post('/tasks', taskController.create)

router.put('/tasks/:id', taskController.edit)

router.delete('/tasks/:id', taskController.delete)

module.exports = router;
