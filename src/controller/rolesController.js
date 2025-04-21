const express = require('express');
const roleModel = require('../model/rolesModel');

const getAllRoles = async (req, res) => {
    try {
        const roles = await roleModel.getRoles();
        res.status(200).json({ roles });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getRoleById = async (req, res) => {
    try {
        const { id } = req.params;  // Changed from req.body to req.params
        console.log('Fetching role with ID:', id); // Debug log

        const role = await roleModel.getRoleById(id);
        
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        
        res.status(200).json({ role });
    } catch (err) {
        console.error('Error in getRoleById:', err);
        res.status(500).json({ error: err.message });
    }
};

const createRole = async (req, res) => {
    try {
        const { role_name } = req.body;

        if (!role_name || typeof role_name !== 'string') {
            return res.status(400).json({
                error: "role_name is required and must be a string"
            });
        }

        console.log("Attempting to create role:", role_name); // Debug log

        const role = await roleModel.createRole(role_name);
        res.status(201).json(role);
    } catch (err) {
        console.error("Error in createRole controller:", err);
        res.status(500).json({ error: err.message });
    }
};

const updateRole = async (req, res) => {
    try {
        const { id } = req.params;
        const { role_name } = req.body;

        console.log('Received request:', {
            id,
            role_name,
            body: req.body
        });

        if (!role_name) {
            return res.status(400).json({
                error: "role_name is required"
            });
        }

        const existingRole = await roleModel.getRoleById(id);
        if (!existingRole) {
            return res.status(404).json({
                error: "Role not found"
            });
        }

        const result = await roleModel.updateRole(id, role_name);
        res.status(200).json(result);

    } catch (err) {
        console.error('Controller error:', err);
        res.status(500).json({
            error: err.message || 'Failed to update role'
        });
    }
};

const deleteRole = async (req, res) => {
    try {
        const { id } = req.params;

        const existingRole = await roleModel.getRoleById(id);
        if (!existingRole) {
            return res.status(404).json({ 
                error: "Role not found" 
            });
        }

        const result = await roleModel.deleteRole(id);
        res.status(200).json(result);
    } catch (err) {
        console.error("Error in deleteRole controller:", err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllRoles, getRoleById, createRole, updateRole, deleteRole };
