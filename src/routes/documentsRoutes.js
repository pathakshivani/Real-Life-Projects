const express = require("express");
const { getAllDocuments, getDocumentById, createDocument, updateDocument, deleteDocument } = require("../controller/documentsController");
const {authenticateUser} = require('../middleware/authMiddleware');
const {access} = require('../middleware/accessMiddleware')

const documentsRouter = express.Router();

documentsRouter.get('/getDocuments', getAllDocuments);
documentsRouter.get('/documents/:id', getDocumentById);
documentsRouter.post('/documents',authenticateUser, access(1, 3), createDocument);
documentsRouter.put('/documents/:id',authenticateUser, access(1, 3), updateDocument);
documentsRouter.delete('/documents/:id',authenticateUser, access(1, 3), deleteDocument);

module.exports = documentsRouter;