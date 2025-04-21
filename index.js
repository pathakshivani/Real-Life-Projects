const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");

const priorityRouter = require('./src/routes/priorityRoute');
const roleRouter = require('./src/routes/rolesRoute');
const projectStatusRouter = require('./src/routes/projectStatusRoute');
const taskStatusRouter = require('./src/routes/taskStatusRoute');
const projectsRouter = require('./src/routes/projectsRoute');
const tasksRouter = require('./src/routes/tasksRoute');
const documentsRouter = require('./src/routes/documentsRoutes');
const logsRouter = require('./src/routes/logsRoute');
const meetingMinutesRouter = require('./src/routes/meetingMinutesRoutes');
const notificationsRouter = require('./src/routes/notificationsRoute');
const reportsRouter = require('./src/routes/reportsRoute');
const userProjectsRouter = require('./src/routes/userProjectRoutes');
const taskAssigneesRouter = require('./src/routes/taskAssigneesRoutes');
const usersRouter = require('./src/routes/usersRoutes');


dotenv.config();
const app = express();
const port = process.env.PORT || 3307;

app.use(cors({
    origin: "http://localhost:5173",  // Allow frontend to access backend
    credentials: true
}));
app.use(express.json());
app.use('/api', priorityRouter);
app.use('/api', roleRouter);
app.use('/api', projectStatusRouter);
app.use('/api', taskStatusRouter);
app.use('/api', tasksRouter);
app.use('/api', projectsRouter);
app.use('/api', documentsRouter);
app.use('/api', meetingMinutesRouter);
app.use('/api', logsRouter);
app.use('/api', notificationsRouter);
app.use('/api', reportsRouter);
app.use('/api', userProjectsRouter);
app.use('/api', taskAssigneesRouter);
app.use('/api', usersRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: 'Server is running' });
});

app.listen(port, () => {
    console.log(`✅ Server running on port ${port}`);
});
