const express = require('express');
const {authenticateUser} = require('../middleware/authMiddleware');
const {access} = require('../middleware/accessMiddleware')
const { getAllProjects, getProjectsById, createProjects, updateProjects, deleteProjects, summaryProject } = require('../controller/projectsController');

const projectsRouter = express.Router();

projectsRouter.get("/getProjects", getAllProjects);
projectsRouter.get("/projects/:id", getProjectsById);
projectsRouter.post("/projects", authenticateUser, access(1, 3), createProjects);
projectsRouter.put("/projects/:id",authenticateUser, access(1, 3), updateProjects);
projectsRouter.delete("/projects/:id",authenticateUser, access(1, 3), deleteProjects);
projectsRouter.post("/summary", summaryProject);

module.exports = projectsRouter;

