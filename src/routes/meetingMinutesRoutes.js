const express = require("express");
const { 
    getAllMeetingMinutes, 
    getMeetingMinutesById, 
    createMeetingMinutes, 
    updateMeetingMinutes, 
    deleteMeetingMinutes 
} = require("../controller/meetingMinutesController");
const { authenticateUser } = require("../middleware/authMiddleware");
const {access} = require('../middleware/accessMiddleware');

const meetingMinutesRouter = express.Router();

meetingMinutesRouter.get('/getMeetingMinutes', getAllMeetingMinutes);
meetingMinutesRouter.get('/meetingMinutes/:id', authenticateUser, getMeetingMinutesById);
meetingMinutesRouter.post('/meetingMinutes', authenticateUser, access(1, 3), createMeetingMinutes);
meetingMinutesRouter.put('/meetingMinutes/:id', authenticateUser, access(1, 3),updateMeetingMinutes);
meetingMinutesRouter.delete('/meetingMinutes/:id', authenticateUser, access(1, 3), deleteMeetingMinutes);

module.exports = meetingMinutesRouter;