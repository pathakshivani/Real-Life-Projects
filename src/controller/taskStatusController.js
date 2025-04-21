const express = require('express')
const taskStatusModel = require('../model/taskStatusModel');

const getAllTaskStatus = async (req , res) => {
    try {
        const status = await taskStatusModel.getTaskStatus();
        res.status(200).json({status});
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTaskStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching Task Status with Id:', id);
        
        const status = await taskStatusModel.getTaskStatusById(id);

        if (!status) {
            return res.status(404).json({ message: "task status not found"});
        }

        res.status(200).json({ status });
        
    } catch (err) {
        console.error("Error in getTaskStatusById:", err);
        res.status(500).json({error: err.message});
        
    }
};

const createTaskStatus = async (req, res) => {
    try {
        const { status_name } = req.body;

        if (!status_name || typeof status_name !== 'string') {
            return res.status(400).json({
                error: "status_name is required and must be a string"
            });
        }

        console.log("Attempting to create Task status:", status_name);

        const status = await taskStatusModel.createTaskStatus(status_name);
        res.status(201).json(status);
    } catch (err) {
        console.error("Error in createTaskStatus controller:", err);
        res.status(500).json({ error: err.message });
    }
};

const updateTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status_name } = req.body;

        console.log('Received request:', {
            id,
            status_name,
            body: req.body
        });

        if (!status_name) {
            return res.status(400).json({
                error: "status_name is required"
            });
        }

        const existingStatus = await taskStatusModel.getTaskStatusById(id);
        if (!existingStatus) {
            return res.status(404).json({
                error: "Task status not found"
            });
        }

        const result = await taskStatusModel.updateTaskStatus(id, status_name);
        res.status(200).json(result);

    } catch (err) {
        console.error('Controller error:', err);
        res.status(500).json({
            error: err.message || 'Failed to update task status'
        });
    }
};

const deleteTaskStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const existingStatus = await taskStatusModel.getTaskStatusById(id);
        if (!existingStatus) {
            return res.status(404).json({ 
                error: "Task status not found" 
            });
        }

        const result = await taskStatusModel.deleteTaskStatus(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error in deleteTaskStatus controller:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllTaskStatus, getTaskStatusById, createTaskStatus, updateTaskStatus, deleteTaskStatus }