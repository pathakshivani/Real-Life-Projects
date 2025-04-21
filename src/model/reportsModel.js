const { connection } = require("../config/db");

const getAllReports = async () => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM reports");
        return rows;
    } catch (error) {
        console.error("Error fetching reports:", error);
        throw new Error("Failed to fetch reports.");
    }
};

const getReportById = async (id) => {
    try {
        const [rows] = await connection.promise().query("SELECT * FROM reports WHERE id = ?", [id]);
        return rows.length ? rows[0] : null;
    } catch (error) {
        console.error(`Error fetching report with ID ${id}:`, error);
        throw new Error("Failed to fetch report.");
    }
};

const createReport = async (project_id, generated_by, report_type, data) => {
    try {
        const [result] = await connection.promise().query(
            "INSERT INTO reports (project_id, generated_by, report_type, data) VALUES (?, ?, ?, ?)",
            [project_id, generated_by, report_type, data]
        );
        return { 
            id: result.insertId, 
            project_id, 
            generated_by, 
            report_type, 
            data 
        };
    } catch (error) {
        console.error("Error creating report:", error);
        throw new Error("Failed to create report.");
    }
};

const updateReport = async (id, project_id, generated_by, report_type, data) => {
    try {
        const [result] = await connection.promise().query(
            "UPDATE reports SET project_id = ?, generated_by = ?, report_type = ?, data = ? WHERE id = ?",
            [project_id, generated_by, report_type, data, id]
        );
        if (result.affectedRows === 0) return null;
        return { id, project_id, generated_by, report_type, data };
    } catch (error) {
        console.error(`Error updating report with ID ${id}:`, error);
        throw new Error("Failed to update report.");
    }
};

const deleteReport = async (id) => {
    try {
        const [result] = await connection.promise().query("DELETE FROM reports WHERE id = ?", [id]);
        if (result.affectedRows === 0) return null;
        return { message: "Report deleted successfully", id };
    } catch (error) {
        console.error(`Error deleting report with ID ${id}:`, error);
        throw new Error("Failed to delete report.");
    }
};

const getAggregateReport = async () => {
    try {
        const [rows] = await connection.promise().query(`
            SELECT 
                p.id AS project_id,
                p.name AS project_name,
                COUNT(t.id) AS total_tasks,
                SUM(CASE WHEN ts.status_name = 'Completed' THEN 1 ELSE 0 END) AS completed_tasks,
                SUM(CASE WHEN ts.status_name = 'Pending' THEN 1 ELSE 0 END) AS pending_tasks,
                ROUND((SUM(CASE WHEN ts.status_name = 'Completed' THEN 1 ELSE 0 END) / COUNT(t.id)) * 100, 2) AS completion_percentage,
                ps.status_name AS project_status
            FROM projects p
            LEFT JOIN tasks t ON p.id = t.project_id
            LEFT JOIN task_statuses ts ON t.status_id = ts.id
            LEFT JOIN project_status ps ON p.status_id = ps.id
            GROUP BY p.id, p.name, ps.status_name;
        `);
        return rows;
    } catch (error) {
        console.error("Database error in getAggregateReport:", error);
        throw error;
    }
};



module.exports = { 
    getAllReports, 
    getReportById, 
    createReport, 
    updateReport, 
    deleteReport, 
    getAggregateReport
};