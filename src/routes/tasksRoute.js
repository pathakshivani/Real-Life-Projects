const express = require("express");
const {getAllTasks, getAllTasksById, createTasks, updateTasks, deleteTasks} = require("../controller/tasksController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { access } = require("../middleware/accessMiddleware");

const tasksRouter = express.Router();

tasksRouter.get('/getTasks', getAllTasks);
tasksRouter.get('/tasks/:id', getAllTasksById);
tasksRouter.post('/tasks', authenticateUser, access(1), createTasks);
tasksRouter.put('/tasks/:id', authenticateUser, access(1), updateTasks);
tasksRouter.delete('/tasks/:id', authenticateUser, access(1),deleteTasks);

module.exports = tasksRouter;