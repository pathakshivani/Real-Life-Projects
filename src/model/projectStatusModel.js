const { connection } = require("../config/db")

const getProjectStatus = async () => {
    const [rows] = await connection.promise().query("SELECT * FROM project_status");
    return rows;
};

const getProjectStatusById = async (id) => {
    const [rows] = await connection.promise().query("SELECT * FROM project_status WHERE id = ?", [id]);
    return rows.length ? rows[0] : null;
};

const createProjectStatus = async (status_name) => {
    try {
        if (!status_name || typeof status_name !== 'string'){
            throw new Error('Invalid status_name format');
        }

        const [result] = await connection.promise().query('INSERT INTO project_status (status_name) VALUES (?)', [status_name]);

        if (result.affectedRows === 0) {
            throw new Error('Failed to create status');
        }

        return {
            id: result.insertId,
            status_name
        };
        
    } catch (error) {
        console.error('Error in createStatus model:', error);
        throw new Error(error.message);
    }
};

const updateProjectStatus = async (id, status_name) => {
    try {
        console.log('Updating status with:', { id, status_name });

        if (!id || !status_name) {
            throw new Error('ID and status_name are required');
        }

        const [result] = await connection.promise().query(
            'UPDATE project_status SET status_name = ? WHERE id = ?', 
            [String(status_name), Number(id)] 
        );

        console.log('Query result:', result);

        if (result.affectedRows === 0) {
            throw new Error('status not found or no changes made');
        }

        return { 
            id: Number(id), 
            status_name: String(status_name),
            message: 'project status updated successfully'
        };
    } catch (error) {
        console.error('Error details:', error);
        throw error;
    }
};

const deleteProjectStatus = async (id) => {
    try {
        console.log('Deleting status with ID:', id); 

        const [result] = await connection.promise().query(
            'DELETE FROM project_status WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Status not found or already deleted');
        }

        return {
            message: 'status deleted successfully',
            id: parseInt(id)
        };
    } catch (error) {
        console.error('Error in deletestatus model:', error);
        throw error;
    }
};

module.exports = {getProjectStatus, getProjectStatusById, createProjectStatus, updateProjectStatus, deleteProjectStatus};