const express = require('express')
const { getAllpriority, getAllPriorityById, createPriority ,updatePriority,deletePriority} = require('../controller/prioritiesController')
const {  } = require('../model/prioritiesModel')
const priorityRouter = express.Router()



priorityRouter.get("/getpriority", getAllpriority)
priorityRouter.get("/priority/:id", getAllPriorityById)
priorityRouter.post("/priority", createPriority)
priorityRouter.put("/priority/:id", updatePriority);
priorityRouter.delete("/priority/:id", deletePriority); 
  
module.exports = priorityRouter;


