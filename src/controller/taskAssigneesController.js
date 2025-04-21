const taskAssigneesModel = require("../model/taskAssigneesModel");

const getAllTaskAssignees = async (req, res) => {
    try {
        const taskAssignees = await taskAssigneesModel.getAllTaskAssignees();
        res.status(200).json({ taskAssignees });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTaskAssigneeById = async (req, res) => {
    try {
        const { id } = req.params;
        const taskAssignee = await taskAssigneesModel.getTaskAssigneeById(id);
        if (!taskAssignee) return res.status(404).json({ message: "Task assignee not found" });
        res.status(200).json(taskAssignee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTaskAssignee = async (req, res) => {
    try {
        const { task_id, user_id } = req.body;
        if (!task_id || !user_id) {
            return res.status(400).json({ error: "task_id and user_id are required." });
        }

        const taskAssignee = await taskAssigneesModel.createTaskAssignee(task_id, user_id);
        res.status(201).json(taskAssignee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTaskAssignee = async (req, res) => {
    try {
        const { task_id, user_id } = req.body;
        const taskAssignee = await taskAssigneesModel.updateTaskAssignee(
            req.params.id, 
            task_id, 
            user_id
        );
        if (!taskAssignee) return res.status(404).json({ message: "Task assignee not found" });
        res.json(taskAssignee);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTaskAssignee = async (req, res) => {
    try {
        const result = await taskAssigneesModel.deleteTaskAssignee(req.params.id);
        if (!result) return res.status(404).json({ message: "Task assignee not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllTaskAssignments = async (req, res) => {
    try {
        const assignments = await taskAssigneesModel.getAllTaskAssignments();
        res.status(200).json({ assignments });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTaskAssignment = async (req, res) => {
    try {
        const { task_id, user_id } = req.body;
        if (!task_id || !user_id) {
            return res.status(400).json({ error: "Task ID and User ID are required." });
        }

        const assignment = await taskAssigneesModel.createTaskAssignment(task_id, user_id);
        res.status(201).json(assignment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTaskAssignment = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await taskAssigneesModel.deleteTaskAssignment(id);
        if (!result) return res.status(404).json({ message: "Task assignment not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getAllTaskAssignees, 
    getTaskAssigneeById, 
    createTaskAssignee, 
    updateTaskAssignee, 
    deleteTaskAssignee,
    getAllTaskAssignments,
    createTaskAssignment,
    deleteTaskAssignment
};