const express = require('express');
const { getAllRoles, getRoleById, createRole, updateRole, deleteRole } = require('../controller/rolesController');

const roleRouter = express.Router();

roleRouter.get("/getroles", getAllRoles);
roleRouter.get("/role/:id", getRoleById);
roleRouter.post("/role", createRole);
roleRouter.put("/role/:id", updateRole);
roleRouter.delete("/role/:id", deleteRole);

module.exports = roleRouter;
