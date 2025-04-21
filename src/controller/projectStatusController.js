const express = require('express');
const projectStatusModel = require('../model/projectStatusModel');

const getAllProjectStatus = async (req, res) => {
    try {
        const statuses = await projectStatusModel.getProjectStatus();
        res.status(200).json({ statuses });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getProjectStatusById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('Fetching project status with ID:', id);

        const status = await projectStatusModel.getProjectStatusById(id);
        
        if (!status) {
            return res.status(404).json({ message: "Project status not found" });
        }
        
        res.status(200).json({ status });
    } catch (err) {
        console.error('Error in getProjectStatusById:', err);
        res.status(500).json({ error: err.message });
    }
};

const createProjectStatus = async (req, res) => {
    try {
        const { status_name } = req.body;

        if (!status_name || typeof status_name !== 'string') {
            return res.status(400).json({
                error: "status_name is required and must be a string"
            });
        }

        console.log("Attempting to create project status:", status_name);

        const status = await projectStatusModel.createProjectStatus(status_name);
        res.status(201).json(status);
    } catch (err) {
        console.error("Error in createProjectStatus controller:", err);
        res.status(500).json({ error: err.message });
    }
};

const updateProjectStatus = async (req, res) => {
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

        const existingStatus = await projectStatusModel.getProjectStatusById(id);
        if (!existingStatus) {
            return res.status(404).json({
                error: "Project status not found"
            });
        }

        const result = await projectStatusModel.updateProjectStatus(id, status_name);
        res.status(200).json(result);

    } catch (err) {
        console.error('Controller error:', err);
        res.status(500).json({
            error: err.message || 'Failed to update project status'
        });
    }
};

const deleteProjectStatus = async (req, res) => {
    try {
        const { id } = req.params;

        const existingStatus = await projectStatusModel.getProjectStatusById(id);
        if (!existingStatus) {
            return res.status(404).json({ 
                error: "Project status not found" 
            });
        }

        const result = await projectStatusModel.deleteProjectStatus(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error in deleteProjectStatus controller:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { 
    getAllProjectStatus, 
    getProjectStatusById, 
    createProjectStatus, 
    updateProjectStatus, 
    deleteProjectStatus 
};