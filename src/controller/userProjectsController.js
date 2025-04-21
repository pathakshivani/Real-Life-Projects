const userProjectsModel = require("../model/userProjectsModel");

const getAllUserProjects = async (req, res) => {
    try {
        const userProjects = await userProjectsModel.getAllUserProjects();
        res.status(200).json({ userProjects });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const userProject = await userProjectsModel.getUserProjectById(id);
        if (!userProject) return res.status(404).json({ message: "User project assignment not found" });
        res.status(200).json(userProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createUserProject = async (req, res) => {
    try {
        const { user_id, project_id } = req.body;
        if (!user_id || !project_id) {
            return res.status(400).json({ error: "user_id and project_id are required." });
        }

        const userProject = await userProjectsModel.createUserProject(user_id, project_id);
        res.status(201).json(userProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUserProject = async (req, res) => {
    try {
        const { user_id, project_id } = req.body;
        const userProject = await userProjectsModel.updateUserProject(
            req.params.id, 
            user_id, 
            project_id
        );
        if (!userProject) return res.status(404).json({ message: "User project assignment not found" });
        res.json(userProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUserProject = async (req, res) => {
    try {
        const result = await userProjectsModel.deleteUserProject(req.params.id);
        if (!result) return res.status(404).json({ message: "User project assignment not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getAllUserProjects, 
    getUserProjectById, 
    createUserProject, 
    updateUserProject, 
    deleteUserProject 
};