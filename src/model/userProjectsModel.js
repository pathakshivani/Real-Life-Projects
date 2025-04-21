const { connection } = require("../config/db");

const getAllUserProjects = async () => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT up.*, u.name as user_name, p.name as project_name 
            FROM user_projects up 
            JOIN users u ON up.user_id = u.id 
            JOIN projects p ON up.project_id = p.id
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching user projects:", error);
        throw new Error("Failed to fetch user projects.");
    }
};

const getUserProjectById = async (id) => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT up.*, u.name as user_name, p.name as project_name 
            FROM user_projects up 
            JOIN users u ON up.user_id = u.id 
            JOIN projects p ON up.project_id = p.id 
            WHERE up.id = ?`, 
            [id]
        );
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching user project with ID ${id}:`, error);
        throw new Error("Failed to fetch user project.");
    }
};

const createUserProject = async (user_id, project_id) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO user_projects (user_id, project_id) VALUES (?, ?)",
            [user_id, project_id]
        );
        return { 
            id: result.insertId, 
            user_id, 
            project_id 
        };
    } catch (error) {
        console.error("Error creating user project:", error);
        throw new Error("Failed to create user project.");
    }
};

const updateUserProject = async (id, user_id, project_id) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE user_projects SET user_id = ?, project_id = ? WHERE id = ?",
            [user_id, project_id, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, user_id, project_id };
    } catch (error) {
        console.error(`Error updating user project with ID ${id}:`, error);
        throw new Error("Failed to update user project.");
    }
};

const deleteUserProject = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM user_projects WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "User project assignment deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting user project with ID ${id}:`, error);
        throw new Error("Failed to delete user project.");
    }
};

module.exports = { 
    getAllUserProjects, 
    getUserProjectById, 
    createUserProject, 
    updateUserProject, 
    deleteUserProject 
};