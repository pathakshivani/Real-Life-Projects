const { connection } = require("../config/db");

const getAllMeetingMinutes = async () => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT m.*, u.name as created_by 
            FROM meeting_minutes m 
            LEFT JOIN users u ON m.id  = u.id
        `);
        return rows;
    } catch (error) {
        console.error("Error fetching meeting minutes:", error);
        throw new Error("Failed to fetch meeting minutes.");
    }
};

const getMeetingMinutesById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM meeting_minutes WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching meeting minutes with ID ${id}:`, error);
        throw new Error("Failed to fetch meeting minutes.");
    }
};

const createMeetingMinutes = async (project_id, date, attendees, notes, created_by) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO meeting_minutes (project_id, date, attendees, notes, created_by) VALUES (?, ?, ?, ?, ?)",
            [project_id, date, attendees, notes, created_by]
        );
        return {
            id: result.insertId,
            project_id,
            date,
            attendees,
            notes,
            created_by
        };
    } catch (error) {
        console.error("Error creating meeting minutes:", error);
        throw new Error("Failed to create meeting minutes.");
    }
};

const updateMeetingMinutes = async (id, project_id, date, attendees, notes) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE meeting_minutes SET project_id = ?, date = ?, attendees = ?, notes = ? WHERE id = ?",
            [project_id, date, attendees, notes, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, project_id, date, attendees, notes };
    } catch (error) {
        console.error(`Error updating meeting minutes with ID ${id}:`, error);
        throw new Error("Failed to update meeting minutes.");
    }
};

const deleteMeetingMinutes = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM meeting_minutes WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "Meeting minutes deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting meeting minutes with ID ${id}:`, error);
        throw new Error("Failed to delete meeting minutes.");
    }
};

module.exports = {
    getAllMeetingMinutes,
    getMeetingMinutesById,
    createMeetingMinutes,
    updateMeetingMinutes,
    deleteMeetingMinutes
};