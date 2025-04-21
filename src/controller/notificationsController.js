const { connection } = require("../config/db");
const notificationsModel = require("../model/notificationsModel");

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await notificationsModel.getAllNotifications();
        res.status(200).json({ notifications });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getNotificationById = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await notificationsModel.getNotificationById(id);
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        res.status(200).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createNotification = async (req, res) => {
    try {
        const { user_id, message, status } = req.body;
        if (!user_id || !message) {
            return res.status(400).json({ error: "user_id and message are required." });
        }

        const notification = await notificationsModel.createNotification(user_id, message, status || 'unread');
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateNotification = async (req, res) => {
    try {
        const { user_id, message, status } = req.body;
        const notification = await notificationsModel.updateNotification(
            req.params.id, 
            user_id, 
            message, 
            status
        );
        if (!notification) return res.status(404).json({ message: "Notification not found" });
        res.json(notification);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteNotification = async (req, res) => {
    try {
        const result = await notificationsModel.deleteNotification(req.params.id);
        if (!result) return res.status(404).json({ message: "Notification not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// const markNotificationAsRead = async (req, res) => {
//     try {
//         const { id } = req.params;
//         console.log('Marking notification as read:', id);
//         const notification = await notificationsModel.markNotificationAsRead(id);
//         console.log('Notification update result:', notification);
//         if (!notification) return res.status(404).json({ message: "Notification not found" });
//         res.json(notification);
//     } catch (err) {
//         console.error('Error in markNotificationAsRead:', err);
//         res.status(500).json({ error: err.message });
//     }
// };

const markNotificationAsRead = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await connection.promise().query(
        'UPDATE notifications SET status = ? WHERE id = ?',
        ['read', id]
      );
  
      if (result.affectedRows > 0) {
        res.status(200).json({ message: 'Notification marked as read' });
      } else {
        res.status(404).json({ message: 'Notification not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
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