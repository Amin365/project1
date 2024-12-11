const express = require('express');
const router = express.Router();
const { getTasks, addTask, updateTaskStatus, deleteTask } = require('../controllers/tasksController');

router.get('/tasks', getTasks);
router.post('/tasks', addTask);
router.put('/tasks/:id', updateTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
