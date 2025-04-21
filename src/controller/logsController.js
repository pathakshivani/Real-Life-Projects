const logsModel = require("../model/logsModel");

const getAllLogs = async (req, res) => {
    try {
        const logs = await logsModel.getAllLogs();
        res.status(200).json({ logs });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getLogById = async (req, res) => {
    try {
        const { id } = req.params;
        const log = await logsModel.getLogById(id);
        if (!log) return res.status(404).json({ message: "Log not found" });
        res.status(200).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createLog = async (req, res) => {
    try {
        const { user_id, action, timestamp } = req.body;
        if (!user_id || !action) {
            return res.status(400).json({ error: "user_id and action are required." });
        }

        // Use current timestamp if not provided
        const currentTimestamp = timestamp || new Date().toISOString();
        
        const log = await logsModel.createLog(user_id, action, currentTimestamp);
        res.status(201).json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateLog = async (req, res) => {
    try {
        const { user_id, action, timestamp } = req.body;
        const log = await logsModel.updateLog(
            req.params.id, 
            user_id, 
            action, 
            timestamp
        );
        if (!log) return res.status(404).json({ message: "Log not found" });
        res.json(log);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteLog = async (req, res) => {
    try {
        const result = await logsModel.deleteLog(req.params.id);
        if (!result) return res.status(404).json({ message: "Log not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getAllLogs, 
    getLogById, 
    createLog, 
    updateLog, 
    deleteLog 
};