const express = require("express");
const { 
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport, 
    deleteReport,
    getAggregatedReport 
} = require("../controller/reportsController");
const { access } = require("../middleware/accessMiddleware");
const { authenticateUser} = require("../middleware/authMiddleware")

const reportsRouter = express.Router();

reportsRouter.get('/getReports', getAllReports);
reportsRouter.get('/reports/:id', getReportById);
reportsRouter.post('/reports',authenticateUser , access(1, 3, 4), createReport);
reportsRouter.put('/reports/:id',authenticateUser , access(1 , 3, 4), updateReport);
reportsRouter.delete('/reports/:id',authenticateUser , access(1, 3, 4), deleteReport);
reportsRouter.get('/getAggregateReport', getAggregatedReport);

module.exports = reportsRouter;