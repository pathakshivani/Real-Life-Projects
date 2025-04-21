const { connection } = require("../config/db");
const bcrypt = require('bcrypt')

const getAllUsers = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT u.id, u.name, u.email, u.password, u.role_id , r.role_name FROM pms_db.users u  inner join pms_db.roles r on r.id = u.role_id ");
        return rows;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to fetch users.");
    }
};

const getUserById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT u.id, u.name, u.email, u.password, u.role_id , r.role_name FROM pms_db.users u  inner join pms_db.roles r on r.id = u.role_id  WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching user with ID ${id}:`, error);
        throw new Error("Failed to fetch user.");
    }
};

const createUser = async (name, email, password, role_id) => {
    debugger
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
            [name, email, password, role_id]
        );
        return { id: result.insertId, name, email, role_id };
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Failed to create user.");
    }
};

const updateUser = async (id, name, email, password, role_id) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE users SET name = ?, email = ?, password = ?, role_id = ? WHERE id = ?",
            [name, email, password, role_id, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, name, email, role_id };
    } catch (error) {
        console.error(`Error updating user with ID ${id}:`, error);
        throw new Error("Failed to update user.");
    }
};

const deleteUser = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM users WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "User deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting user with ID ${id}:`, error);
        throw new Error("Failed to delete user.");
    }
};

const getUserByEmail = async (email) => {
    debugger
    const [rows] = await connection.promise().query(
        // `SELECT * FROM users WHERE email = ?`,
        `SELECT u.id, u.name, u.email, u.password, u.role_id , r.role_name 
FROM pms_db.users u  inner join pms_db.roles r on r.id = u.role_id  WHERE email = ?`,
        [email]
    );
    return rows.length ? rows[0] : null;
};

const loginUser = async (email, password) => {
    try {
        const user = await getUserByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            throw new Error("Invalid password");
        }

        return user; 
    } catch (error) {
        console.error("Error in loginUser model:", error);
        throw error;
    }
};



module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser, getUserByEmail, loginUser };