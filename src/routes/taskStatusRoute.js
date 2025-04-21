const express = require('express');
const { getAllTaskStatus, getTaskStatusById, createTaskStatus, updateTaskStatus, deleteTaskStatus } = require('../controller/taskStatusController');

const taskStatusRouter = express.Router();

taskStatusRouter.get("/getTaskStatus", getAllTaskStatus);
taskStatusRouter.get("/taskStatus/:id", getTaskStatusById);
taskStatusRouter.post("/taskStatus", createTaskStatus);
taskStatusRouter.put("/taskStatus/:id", updateTaskStatus);
taskStatusRouter.delete("/taskStatus/:id", deleteTaskStatus);

module.exports = taskStatusRouter;