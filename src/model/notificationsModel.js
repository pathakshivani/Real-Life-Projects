const { connection } = require("../config/db");

const getAllNotifications = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM notifications");
        return rows;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw new Error("Failed to fetch notifications.");
    }
};

const getNotificationById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM notifications WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching notification with ID ${id}:`, error);
        throw new Error("Failed to fetch notification.");
    }
};

const createNotification = async (user_id, message, status) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO notifications (user_id, message, status) VALUES (?, ?, ?)",
            [user_id, message, status]
        );
        return { 
            id: result.insertId, 
            user_id, 
            message, 
            status 
        };
    } catch (error) {
        console.error("Error creating notification:", error);
        throw new Error("Failed to create notification.");
    }
};

const updateNotification = async (id, user_id, message, status) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE notifications SET user_id = ?, message = ?, status = ? WHERE id = ?",
            [user_id, message, status, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, user_id, message, status };
    } catch (error) {
        console.error(`Error updating notification with ID ${id}:`, error);
        throw new Error("Failed to update notification.");
    }
};

const deleteNotification = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM notifications WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "Notification deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting notification with ID ${id}:`, error);
        throw new Error("Failed to delete notification.");
    }
};

const markNotificationAsRead = async (id) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE notifications SET status = 'read' WHERE id = ?",
            [id]
        );
        if (result.affectedRows === 0) return null;
        return { id, status: 'read' };
    } catch (error) {
        console.error(`Error marking notification ${id} as read:`, error);
        throw new Error("Failed to mark notification as read.");
    }
};

module.exports = { 
    getAllNotifications, 
    getNotificationById, 
    createNotification, 
    updateNotification, 
    deleteNotification,
    markNotificationAsRead 
};

