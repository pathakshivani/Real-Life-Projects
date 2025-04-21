const { connection } = require("../config/db");

const getAllDocuments = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM documents");
        return rows;
    } catch (error) {
        console.error("Error fetching documents:", error);
        throw new Error("Failed to fetch documents.");
    }
};

const getDocumentById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM documents WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching document with ID ${id}:`, error);
        throw new Error("Failed to fetch document.");
    }
};

const createDocument = async (name, project_id, uploaded_by, file_path) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO documents (name, project_id, uploaded_by, file_path) VALUES (?, ?, ?, ?)",
            [name, project_id, uploaded_by, file_path]
        );
        return { id: result.insertId, name, project_id, uploaded_by, file_path };
    } catch (error) {
        console.error("Error creating document:", error);
        throw new Error("Failed to create document.");
    }
};

const updateDocument = async (id, name, project_id, uploaded_by, file_path) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE documents SET name = ?, project_id = ?, uploaded_by = ?, file_path = ? WHERE id = ?",
            [name, project_id, uploaded_by, file_path, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, name, project_id, uploaded_by, file_path };
    } catch (error) {
        console.error(`Error updating document with ID ${id}:`, error);
        throw new Error("Failed to update document.");
    }
};

const deleteDocument = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM documents WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "Document deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting document with ID ${id}:`, error);
        throw new Error("Failed to delete document.");
    }
};

module.exports = { getAllDocuments, getDocumentById, createDocument, updateDocument, deleteDocument };