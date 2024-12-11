const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '3664',
    database: 'mytasks',
});


db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Fetch all tasks
app.get('/tasks', (req, res) => {
    const query = 'SELECT * FROM tasks';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching tasks:', err);
            res.status(500).json({ error: 'Failed to fetch tasks' });
        } else {
            res.json(results);
        }
    });
});

// Add a new task
app.post('/tasks', (req, res) => {
    const { title, description } = req.body;
    const query = 'INSERT INTO tasks (title, description, status) VALUES (?, ?, "Pending")';
    db.query(query, [title, description], (err, result) => {
        if (err) {
            console.error('Error adding task:', err);
            res.status(500).json({ error: 'Failed to add task' });
        } else {
            res.json({ id: result.insertId, title, description, status: 'Pending' });
        }
    });
});

// Update task status
// Update task status
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // "Complete" or "Pending"
    const query = 'UPDATE tasks SET status = ? WHERE id = ?';
    db.query(query, [status, id], (err, result) => {
        if (err) {
            console.error('Error updating task status:', err);
            res.status(500).json({ error: 'Failed to update task status' });
        } else {
            res.json({ message: 'Task status updated successfully' });
        }
    });
});


// Delete a task
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM tasks WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting task:', err);
            res.status(500).json({ error: 'Failed to delete task' });
        } else {
            res.json({ message: 'Task deleted successfully' });
        }
    });
});

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});
