const projectsModel = require("../model/projectsModel");

const getAllProjects = async (req, res) => {
    try {
        const projects = await projectsModel.getProjects();
        res.status(200).json({ projects });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProjectsById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await projectsModel.getProjectsById(id);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        res.status(200).json({ project });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createProjects = async (req, res) => {
    try {
        const { name,status_id, start_date, end_date } = req.body;
        const project = await projectsModel.createProjects(name,status_id, start_date, end_date);
        res.status(201).json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateProjects = async (req, res) => {
    try {
        const { name, status_id, start_date, end_date } = req.body;
        const project = await projectsModel.updateProjects(req.params.id, name, status_id, start_date, end_date);
        res.json(project);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteProjects = async (req, res) => {
    try {
        const result = await projectsModel.deleteProjects(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const summaryProject = async (req, res) => {
    try {
        const result = await projectsModel.summaryProject();
        res.json(result)
        
    } catch (error) {
        res.status(500).json({ error: err.message});
    }
}
module.exports = { getAllProjects, getProjectsById, createProjects, updateProjects, deleteProjects, summaryProject };
