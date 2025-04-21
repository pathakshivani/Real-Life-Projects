const { connection } = require("../config/db");

const getAllTaskAssignees = async () => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT ta.*, t.name as task_name, u.name as user_name 
            FROM task_assignees ta 
            JOIN tasks t ON ta.task_id = t.id 
            JOIN users u ON ta.user_id = u.id
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching task assignees:", error);
        throw new Error("Failed to fetch task assignees.");
    }
};

const getTaskAssigneeById = async (id) => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT ta.*, t.name as task_name, u.name as user_name 
            FROM task_assignees ta 
            JOIN tasks t ON ta.task_id = t.id 
            JOIN users u ON ta.user_id = u.id 
            WHERE ta.id = ?`, 
            [id]
        );
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching task assignee with ID ${id}:`, error);
        throw new Error("Failed to fetch task assignee.");
    }
};

const createTaskAssignee = async (task_id, user_id) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO task_assignees (task_id, user_id) VALUES (?, ?)",
            [task_id, user_id]
        );
        return { 
            id: result.insertId, 
            task_id, 
            user_id 
        };
    } catch (error) {
        console.error("Error creating task assignee:", error);
        throw new Error("Failed to create task assignee.");
    }
};

const updateTaskAssignee = async (id, task_id, user_id) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE task_assignees SET task_id = ?, user_id = ? WHERE id = ?",
            [task_id, user_id, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, task_id, user_id };
    } catch (error) {
        console.error(`Error updating task assignee with ID ${id}:`, error);
        throw new Error("Failed to update task assignee.");
    }
};

const deleteTaskAssignee = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM task_assignees WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "Task assignee deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting task assignee with ID ${id}:`, error);
        throw new Error("Failed to delete task assignee.");
    }
};

module.exports = { 
    getAllTaskAssignees, 
    getTaskAssigneeById, 
    createTaskAssignee, 
    updateTaskAssignee, 
    deleteTaskAssignee 
};