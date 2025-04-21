const reportsModel = require("../model/reportsModel");

const getAllReports = async (req, res) => {
    try {
        const reports = await reportsModel.getAllReports();
        res.status(200).json({ reports });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getReportById = async (req, res) => {
    try {
        const { id } = req.params;
        const report = await reportsModel.getReportById(id);
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.status(200).json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createReport = async (req, res) => {
    try {
        const { project_id, generated_by, report_type, data } = req.body;
        if (!project_id || !generated_by || !report_type || !data) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const report = await reportsModel.createReport(project_id, generated_by, report_type, data);
        res.status(201).json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateReport = async (req,access, res) => {
    try {
        const { project_id, generated_by, report_type, data } = req.body;
        const report = await reportsModel.updateReport(
            req.params.id, 
            project_id, 
            generated_by, 
            report_type, 
            data
        );
        if (!report) return res.status(404).json({ message: "Report not found" });
        res.json(report);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteReport = async (req, res) => {
    try {
        const result = await reportsModel.deleteReport(req.params.id);
        if (!result) return res.status(404).json({ message: "Report not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getAggregatedReport = async (req, res) => {
    try {
        const reportData = await reportsModel.getAggregateReport();
        res.status(200).json(reportData);
    } catch (error) {
        console.error("Error fetching aggregated reports:", error);
        res.status(500).json({ message: "Error fetching aggregated reports", error: error.message });
    }
};




module.exports = { 
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport, 
    deleteReport, 
    getAggregatedReport
};