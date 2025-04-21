const meetingMinutesModel = require("../model/meetingMinutesModel");

const getAllMeetingMinutes = async (req, res) => {
    try {
        const minutes = await meetingMinutesModel.getAllMeetingMinutes();
        res.status(200).json({ minutes });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMeetingMinutesById = async (req, res) => {
    try {
        const { id } = req.params;
        const minutes = await meetingMinutesModel.getMeetingMinutesById(id);
        if (!minutes) return res.status(404).json({ message: "Meeting minutes not found" });
        res.status(200).json(minutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createMeetingMinutes = async (req, res) => {
    try {
        const { project_id, date, attendees, notes } = req.body;
        if (!project_id || !date || !attendees || !notes) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Get the user from the authenticated request
        const created_by = req.user?.name || 'Unknown User';

        const minutes = await meetingMinutesModel.createMeetingMinutes(project_id, date, attendees, notes, created_by);
        res.status(201).json(minutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateMeetingMinutes = async (req, res) => {
    try {
        const { project_id, date, attendees, notes } = req.body;
        const minutes = await meetingMinutesModel.updateMeetingMinutes(
            req.params.id, 
            project_id, 
            date, 
            attendees, 
            notes
        );
        if (!minutes) return res.status(404).json({ message: "Meeting minutes not found" });
        res.json(minutes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMeetingMinutes = async (req, res) => {
    try {
        const result = await meetingMinutesModel.deleteMeetingMinutes(req.params.id);
        if (!result) return res.status(404).json({ message: "Meeting minutes not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getAllMeetingMinutes, 
    getMeetingMinutesById, 
    createMeetingMinutes, 
    updateMeetingMinutes, 
    deleteMeetingMinutes 
};