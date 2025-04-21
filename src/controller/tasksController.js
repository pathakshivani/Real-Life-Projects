const tasksModel = require("../model/tasksModel");

const getAllTasks = async (req, res) => {
    try {
        const tasks = await tasksModel.getAllTasks();
        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getAllTasksById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await tasksModel.getAllTasksById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createTasks = async (req, res) => {
    try {
        const { name, project_id, status_id, priority_id, due_date } = req.body;
        if (!name || !project_id || !status_id || !priority_id || !due_date) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const task = await tasksModel.createTasks(name, project_id, status_id, priority_id, due_date);
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateTasks = async (req, res) => {
    try {
        const { name, project_id, status_id, priority_id, due_date } = req.body;
        const task = await tasksModel.updateTasks(req.params.id, name, project_id, status_id, priority_id, due_date);
        
        if (!task) return res.status(404).json({ message: "Task not found" });
        res.json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteTasks = async (req, res) => {
    try {
        const result = await tasksModel.deleteTasks(req.params.id);
        if (!result) return res.status(404).json({ message: "Task not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTasks, getAllTasksById, createTasks, updateTasks, deleteTasks };
