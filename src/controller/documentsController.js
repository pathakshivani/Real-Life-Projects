const documentsModel = require("../model/documentsModel");

const getAllDocuments = async (req, res) => {
    try {
        const documents = await documentsModel.getAllDocuments();
        res.status(200).json({ documents });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDocumentById = async (req, res) => {
    try {
        const { id } = req.params;
        const document = await documentsModel.getDocumentById(id);
        if (!document) return res.status(404).json({ message: "Document not found" });
        res.status(200).json(document);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createDocument = async (req, res) => {
    try {
        const { name, project_id, uploaded_by, file_path } = req.body;
        if (!name || !project_id || !uploaded_by || !file_path) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const document = await documentsModel.createDocument(name, project_id, uploaded_by, file_path);
        res.status(201).json(document);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateDocument = async (req, res) => {
    try {
        const { name, project_id, uploaded_by, file_path } = req.body;
        const document = await documentsModel.updateDocument(req.params.id, name, project_id, uploaded_by, file_path);
        if (!document) return res.status(404).json({ message: "Document not found" });
        res.json(document);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        const result = await documentsModel.deleteDocument(req.params.id);
        if (!result) return res.status(404).json({ message: "Document not found" });
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllDocuments, getDocumentById, createDocument, updateDocument, deleteDocument };