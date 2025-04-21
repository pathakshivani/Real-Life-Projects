const { connection } = require("../config/db");


const getProjects = async () => {
    try {
    const [rows] = await connection.promise().query("SELECT * FROM projects");
    return rows;
    }
    catch (error) {
        console.error("Error fetching projects:", error);
        throw new Error("Failed to fetch projects.");
    }
};


const getProjectsById = async (id) => {
    try {
    const [rows] = await connection.promise().query("SELECT * FROM projects WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
    }
    catch (error) {
        console.error(`Error fetching project with ID ${id}:`, error);
        throw new Error("Failed to fetch project.");
    }
};


const createProjects = async (name, status_id, start_date, end_date) => {
    try {
    const [result] = await connection.promise().query(
        "INSERT INTO projects (name, status_id, start_date, end_date) VALUES (?, ?, ?, ?)",
        [name,status_id, start_date, end_date]
    );
    return { id: result.insertId, name, status_id, start_date, end_date };
} catch (error) {
    console.error("Error creating project:", error);
    throw new Error("Failed to create project.");
}
};


const updateProjects = async (id, name, status_id, start_date, end_date) => {
    try {
    await connection.promise().query(
        "UPDATE projects SET name = ?, status_id = ?, start_date = ?, end_date = ? WHERE id = ?",
        [name, status_id, start_date, end_date, id]
    );
    return { id, name, status_id, start_date, end_date };
    } catch (error) {
        console.error(`Error updating project with ID ${id}:`, error);
        throw new Error("Failed to update project.");
    } 
};


const deleteProjects = async (id) => {
    try {
    await connection.promise().query("DELETE FROM projects WHERE id = ?", [id]);
    return { message: "Project deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting project with ID ${id}:`, error);
        throw new Error("Failed to delete project.");
    }
};

const summaryProject = async () => {
    try {
        await connection.promise().query(`
                SELECT 
                p.id AS project_id,
                p.name AS project_name,
                COUNT(t.id) AS total_tasks,
                ROUND((SUM(CASE WHEN ts.status_name = 'Completed' THEN 1 ELSE 0 END) / COUNT(t.id)) * 100, 2) AS completion_percentage
                        FROM projects p
            LEFT JOIN tasks t ON p.id = t.project_id
            LEFT JOIN task_statuses ts ON t.status_id = ts.id
            LEFT JOIN project_status ps ON p.status_id = ps.id
            GROUP BY p.id, p.name, ps.status_name;`)        
    } catch (error) {
        console.error('Error in showing summary', error);
        throw new Error("Failed to show");
    }
}

module.exports = { getProjects, getProjectsById, createProjects, updateProjects, deleteProjects, summaryProject };


