const express = require("express");
const { 
    getAllLogs, 
    getLogById, 
    createLog, 
    updateLog, 
    deleteLog 
} = require("../controller/logsController");

const logsRouter = express.Router();

logsRouter.get('/getLogs', getAllLogs);
logsRouter.get('/logs/:id', getLogById);
logsRouter.post('/logs', createLog);
logsRouter.put('/logs/:id', updateLog);
logsRouter.delete('/logs/:id', deleteLog);

module.exports = logsRouter;