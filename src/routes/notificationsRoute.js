const express = require("express");
const { 
    getAllNotifications, 
    getNotificationById, 
    createNotification, 
    updateNotification, 
    deleteNotification,
    markNotificationAsRead 
} = require("../controller/notificationsController");
const { access } = require('../middleware/accessMiddleware');
const {authenticateUser } = require('../middleware/authMiddleware')

const notificationsRouter = express.Router();

notificationsRouter.get('/getNotifications', getAllNotifications);
notificationsRouter.get('/notifications/:id', getNotificationById);
notificationsRouter.post('/notifications',authenticateUser , access(1),createNotification);
notificationsRouter.put('/notifications/:id',authenticateUser , access(1),updateNotification);
notificationsRouter.put('/notifications/:id/read', markNotificationAsRead);
notificationsRouter.delete('/notifications/:id',authenticateUser , access(1), deleteNotification);

module.exports = notificationsRouter;