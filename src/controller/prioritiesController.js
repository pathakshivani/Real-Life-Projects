const express = require('express');

const priorityModel = require('../model/prioritiesModel');

const getAllpriority =  async (req, res) => {
    try {
        const priorities = await priorityModel.getPriority();
        res.status(200).json({priorities})
    } catch (err) {
       res.status(500).json({error: err.message });
    }
};

const getAllPriorityById = async(req, res) => {
    try {
        const { id } = req.body;  // Get ID from request body instead of params
        const priority = await priorityModel.getPriorityById(id);
        
        if (!priority) {
            return res.status(404).json({ message: "Priority not found" });
        }
        
        res.status(200).json({ priority });
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
};

// const createPriority = async (req, res) => {
//     try {
//       const { priorities_name } = req.body;
//       const priority = await priorityModel.createPriority(priorities_name);
//       res.status(201).json(priority);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   };

const createPriority = async (req, res) => {
    try {
        const { priorities_name } = req.body;
        
        if (!priorities_name || typeof priorities_name !== 'string') {
            return res.status(400).json({ 
                error: "priorities_name is required and must be a string" 
            });
        }

        console.log("Attempting to create priority:", priorities_name); // Debug log

        const priority = await priorityModel.createPriority(priorities_name);
        res.status(201).json(priority);
    } catch (err) {
        console.error("Error in createPriority controller:", err);
        res.status(500).json({ error: err.message });
    }
};




const updatePriority = async (req, res) => {
    try {
        const { id } = req.params;
        const { priorities_name } = req.body;

        // Debug logs
        console.log('Received request:', {
            id,
            priorities_name,
            body: req.body
        });

        // Validate input
        if (!priorities_name) {
            return res.status(400).json({
                error: "priorities_name is required"
            });
        }

        // Check if priority exists first
        const existingPriority = await priorityModel.getPriorityById(id);
        if (!existingPriority) {
            return res.status(404).json({
                error: "Priority not found"
            });
        }

        const result = await priorityModel.updatePriority(id, priorities_name);
        res.status(200).json(result);

    } catch (err) {
        console.error('Controller error:', err);
        res.status(500).json({
            error: err.message || 'Failed to update priority'
        });
    }
};



const deletePriority = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if priority exists before deleting
        const existingPriority = await priorityModel.getPriorityById(id);
        if (!existingPriority) {
            return res.status(404).json({ 
                error: "Priority not found" 
            });
        }

        const result = await priorityModel.deletePriority(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error in deletePriority controller:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = {getAllpriority , getAllPriorityById, createPriority, updatePriority, deletePriority};