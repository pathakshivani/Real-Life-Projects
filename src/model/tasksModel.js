const { connection } = require("../config/db");

const getAllTasks  = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM tasks");
        return rows;
        
    } catch (err) {
        console.error("Error fetching tasks:", error);
        throw new Error("Failed to fetch tasks.");    
    }
};


const getAllTasksById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM tasks where id = ?", [id]);
        return rows.length ? rows[0] : null;
        
    } catch (err) {
        console.error(`Error fetching task with ID ${id}:`, error);
        throw new Error("Failed to fetch task.");     
    }
}

const createTasks = async (name, project_id, status_id, priority_id, due_date) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO tasks (name, project_id, status_id, priority_id, due_date) VALUES (?, ?, ?, ?, ?)",
            [name, project_id, status_id, priority_id, due_date]
        );
        return { id: result.insertId, name, project_id, status_id, priority_id, due_date };
    } catch (error) {
        console.error("Error creating task:", error);
        throw new Error("Failed to create task.");
    }
};

const updateTasks = async (id, name, project_id, status_id, priority_id, due_date) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE tasks SET name = ?, project_id = ?, status_id = ?, priority_id = ?, due_date = ? WHERE id = ?",
            [name, project_id, status_id, priority_id, due_date, id]
        );
        if (result.affectedRows === 0) return null; 
        return { id, name, project_id, status_id, priority_id, due_date };
    } catch (error) {
        console.error(`Error updating task with ID ${id}:`, error);
        throw new Error("Failed to update task.");
    }
};

const deleteTasks = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM tasks WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null; 
        return { message: "Task deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting task with ID ${id}:`, error);
        throw new Error("Failed to delete task.");
    }
};

module.exports = {  getAllTasks, getAllTasksById, createTasks, updateTasks, deleteTasks };