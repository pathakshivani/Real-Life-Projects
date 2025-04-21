const express = require("express");
const { 
    getAllUserProjects, 
    getUserProjectById, 
    createUserProject, 
    updateUserProject, 
    deleteUserProject 
} = require("../controller/userProjectsController");
const { access} = require('../middleware/accessMiddleware');
const { authenticateUser} = require('../middleware/authMiddleware');

const userProjectsRouter = express.Router();

userProjectsRouter.get('/getUserProjects', getAllUserProjects);
userProjectsRouter.get('/userProjects/:id', getUserProjectById);
userProjectsRouter.post('/userProjects',authenticateUser, access(1), createUserProject);
userProjectsRouter.put('/userProjects/:id',authenticateUser,access(1), updateUserProject);
userProjectsRouter.delete('/userProjects/:id',authenticateUser, access(1), deleteUserProject);

module.exports = userProjectsRouter;