const { connection } = require("../config/db");


const getRoles = async () => {
    const [rows] = await connection.promise().query(`SELECT * FROM roles`);
    return rows;
};


const getRoleById = async (id) => {
    const [rows] = await connection.promise().query(`SELECT * FROM roles WHERE id = ?`, [id]);
    return rows.length ? rows[0] : null;
};


const createRole = async (role_name) => {
    try {
        if (!role_name || typeof role_name !== 'string') {
            throw new Error('Invalid role_name format');
        }

        const [result] = await connection.promise().query(
            'INSERT INTO roles (role_name) VALUES (?)',
            [role_name]
        );

        if (result.affectedRows === 0) {
            throw new Error('Failed to create role');
        }

        return { 
            id: result.insertId, 
            role_name 
        };
    } catch (error) {
        console.error('Error in createRole model:', error);
        throw new Error(error.message);
    }
};


const updateRole = async (id, role_name) => {
    try {
        console.log('Updating role with:', { id, role_name });

        if (!id || !role_name) {
            throw new Error('ID and role_name are required');
        }

        const [result] = await connection.promise().query(
            'UPDATE roles SET role_name = ? WHERE id = ?', 
            [String(role_name), Number(id)] 
        );

        console.log('Query result:', result);

        if (result.affectedRows === 0) {
            throw new Error('Role not found or no changes made');
        }

        return { 
            id: Number(id), 
            role_name: String(role_name),
            message: 'Role updated successfully'
        };
    } catch (error) {
        console.error('Error details:', error);
        throw error;
    }
};


const deleteRole = async (id) => {
    try {
        console.log('Deleting role with ID:', id); 

        const [result] = await connection.promise().query(
            'DELETE FROM roles WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Role not found or already deleted');
        }

        return {
            message: 'Role deleted successfully',
            id: parseInt(id)
        };
    } catch (error) {
        console.error('Error in deleteRole model:', error);
        throw error;
    }
};

module.exports = { getRoles, getRoleById, createRole, updateRole, deleteRole };
