const express = require('express');
const {getAllProjectStatus, getProjectStatusById, createProjectStatus, updateProjectStatus, deleteProjectStatus} = require('../controller/projectStatusController');

const projectStatusRouter = express.Router();

projectStatusRouter.get("/getProjectStatus", getAllProjectStatus);
projectStatusRouter.get("/projectStatus/:id", getProjectStatusById);
projectStatusRouter.post("/projectStatus", createProjectStatus);
projectStatusRouter.put("/projectStatus/:id", updateProjectStatus);
projectStatusRouter.delete("/projectStatus/:id", deleteProjectStatus);

module.exports = projectStatusRouter;