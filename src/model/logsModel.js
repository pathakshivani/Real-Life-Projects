const { connection } = require("../config/db");

const getAllLogs = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM logs");
        return rows;
    } catch (error) {
        console.error("Error fetching logs:", error);
        throw new Error("Failed to fetch logs.");
    }
};

const getLogById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM logs WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching log with ID ${id}:`, error);
        throw new Error("Failed to fetch log.");
    }
};

const createLog = async (user_id, action, timestamp) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO logs (user_id, action, timestamp) VALUES (?, ?, ?)",
            [user_id, action, timestamp]
        );
        return { 
            id: result.insertId, 
            user_id, 
            action, 
            timestamp 
        };
    } catch (error) {
        console.error("Error creating log:", error);
        throw new Error("Failed to create log.");
    }
};

const updateLog = async (id, user_id, action, timestamp) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE logs SET user_id = ?, action = ?, timestamp = ? WHERE id = ?",
            [user_id, action, timestamp, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, user_id, action, timestamp };
    } catch (error) {
        console.error(`Error updating log with ID ${id}:`, error);
        throw new Error("Failed to update log.");
    }
};

const deleteLog = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM logs WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "Log deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting log with ID ${id}:`, error);
        throw new Error("Failed to delete log.");
    }
};

module.exports = { 
    getAllLogs, 
    getLogById, 
    createLog, 
    updateLog, 
    deleteLog 
};