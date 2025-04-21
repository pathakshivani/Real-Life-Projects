const express = require("express");
const { 
    getAllTaskAssignees, 
    getTaskAssigneeById, 
    createTaskAssignee, 
    updateTaskAssignee, 
    deleteTaskAssignee,
    getAllTaskAssignments, 
    createTaskAssignment, 
    deleteTaskAssignment 
} = require("../controller/taskAssigneesController");
const { authenticateUser } = require("../middleware/authMiddleware");
const { access} = require('../middleware/accessMiddleware');


const taskAssigneesRouter = express.Router();

taskAssigneesRouter.get('/getTaskAssignees', getAllTaskAssignees);
taskAssigneesRouter.get('/taskAssignees/:id', getTaskAssigneeById);
taskAssigneesRouter.post('/taskAssignees', authenticateUser, access(1, 3), createTaskAssignee);
taskAssigneesRouter.put('/taskAssignees/:id', authenticateUser, access(1, 3),updateTaskAssignee);
taskAssigneesRouter.delete('/taskAssignees/:id', authenticateUser, access(1, 3),deleteTaskAssignee);
taskAssigneesRouter.get('/getTaskAssignments', authenticateUser, access(1, 3),getAllTaskAssignments);
taskAssigneesRouter.post('/taskAssignees', authenticateUser, access(1, 3), createTaskAssignment);
taskAssigneesRouter.delete('/taskAssignees/:id', authenticateUser, access(1, 3),deleteTaskAssignment);

module.exports = taskAssigneesRouter;