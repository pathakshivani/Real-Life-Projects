const { connection } = require("../config/db");
// connection ko recieve krnege aur require krenge db.js ko usmein
//then saari queries likhenge one by one

const getPriority = async () => {
    const [rows] = await connection.promise().query(`SELECT * FROM priorities`); //promises avoid "callback hell"
    return rows;
};


const getPriorityById = async (id) => {
    const [rows] = await connection.promise().query(`SELECT * FROM priorities WHERE id = ?`, [id]);
    return rows.length ? rows[0] : null;
};



const createPriority = async (priorities_name) => {
    try {
        if (!priorities_name || typeof priorities_name !== 'string') {
            throw new Error('Invalid priorities_name format');
        }

        const [result] = await connection.promise().query(
            'INSERT INTO priorities (priorities_name) VALUES (?)',
            [priorities_name]
        );

        if (result.affectedRows === 0) {
            throw new Error('Failed to create priority');
        }

        return { 
            id: result.insertId, 
            priorities_name 
        };
    } catch (error) {
        console.error('Error in createPriority model:', error);
        throw new Error(error.message);
    }
};


const updatePriority = async (id, priorities_name) => {
    try {
        
        console.log('Updating priority with:', { id, priorities_name });
        
        if (!id || !priorities_name) {
            throw new Error('ID and priorities_name are required');
        }

        const [result] = await connection.promise().query(
            'UPDATE priorities SET priorities_name = ? WHERE id = ?', 
            [String(priorities_name), Number(id)] 
        );

        console.log('Query result:', result);

        if (result.affectedRows === 0) {
            throw new Error('Priority not found or no changes made');
        }

        return { 
            id: Number(id), 
            priorities_name: String(priorities_name),
            message: 'Priority updated successfully'
        };
    } catch (error) {
        console.error('Error details:', error);
        throw error;
    }
};



const deletePriority = async (id) => {
    try {
        console.log('Deleting priority with ID:', id); 

        const [result] = await connection.promise().query(
            'DELETE FROM priorities WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            throw new Error('Priority not found or already deleted');
        }

        return {
            message: 'Priority deleted successfully',
            id: parseInt(id)
        };
    } catch (error) {
        console.error('Error in deletePriority model:', error);
        throw error;
    }
};

module.exports = { getPriority, getPriorityById, createPriority, updatePriority, deletePriority};
