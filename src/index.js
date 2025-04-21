const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import routes
const usersRouter = require('./routes/usersRoutes');
const documentsRouter = require('./routes/documentsRoutes');
const taskAssigneesRouter = require('./routes/taskAssigneesRoutes');
const tasksRouter = require('./routes/tasksRoute');
const projectsRouter = require('./routes/projectsRoute');
const roleRouter = require('./routes/rolesRoute');
const priorityRouter = require('./routes/priorityRoute');
const taskStatusRouter = require('./routes/taskStatusRoute');
const projectStatusRouter = require('./routes/projectStatusRoute');
const userProjectsRouter = require('./routes/userProjectRoutes');
const meetingMinutesRouter = require('./routes/meetingMinutesRoutes');
const reportsRouter = require('./routes/reportsRoute');

const app = express();
const PORT = process.env.PORT || 3307;

// Middlewares
app.use(cors());
app.use(express.json());

// Serve uploaded files statically
//app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Define routes
app.use('/api', usersRouter);
app.use('/api', tasksRouter);
app.use('/api', projectsRouter);
app.use('/api', roleRouter);
app.use('/api', priorityRouter);
app.use('/api', documentsRouter);
app.use('/api', taskStatusRouter);
app.use('/api', projectStatusRouter);
app.use('/api', taskAssigneesRouter);
app.use('/api', userProjectsRouter);
app.use('/api', meetingMinutesRouter);
app.use('/api', reportsRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 