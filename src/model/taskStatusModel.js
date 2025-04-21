const  { connection} = require("../config/db");

const getTaskStatus = async () => {
    const [rows] = await connection.promise().query("SELECT * FROM task_statuses");
    return rows;
};

const getTaskStatusById = async (id) => {
    const [rows] = await connection.promise().query("SELECT *FROM task_statuses WHERE id =?", [id]);
    return rows.length ? rows[0] : null;
};

const createTaskStatus = async (status_name) => {
    try {
        if (!status_name || typeof status_name !== 'string') {
            throw new Error('Invalid status_name format');
        }

        const [result] = await connection.promise().query('INSERT INTO task_statuses (status_name) VALUES (?)', [status_name]);

        if (result.affectedRows === 0) {
            throw new Error('Failed to create status');
        }

        return {
            id: result.insertId, status_name
        };
    } catch (error) {
        console.error('Error in createStatus model', error);
        throw new Error(error.message);
    }
};

const updateTaskStatus = async (id, status_name) => {
    try {
        console.log('Updating Task status with:', { id, status_name });

        if (!id || !status_name) {
            throw new Error('ID and status_name are required');
        }

        const [result] = await connection.promise().query(
            'UPDATE task_statuses SET status_name = ? WHERE id = ?', 
            [String(status_name), Number(id)] 
        );

        console.log('Query result:', result);

        if (result.affectedRows === 0) {
            throw new Error('Task Status not found or no changes made');
        }

        return { 
            id: Number(id), 
            status_name: String(status_name),
            message: 'Task Status updated successfully'
        };
    } catch (error) {
        console.error('Error details:', error);
        throw error;
    }
};


const deleteTaskStatus = async (id) => {
    try {
        console.log('Deleting Task Status with ID:', id); 

        const [result] = await connection.promise().query(
            'DELETE FROM task_statuses WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Task status not found or already deleted');
        }

        return {
            message: 'Task Status deleted successfully',
            id: parseInt(id)
        };
    } catch (error) {
        console.error('Error in deleteTaskStatus model:', error);
        throw error;
    }
};

module.exports = { getTaskStatus,  getTaskStatusById ,createTaskStatus, updateTaskStatus, deleteTaskStatus, }


