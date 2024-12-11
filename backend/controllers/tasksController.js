const db = require('../db/connection');

exports.getTasks = (req, res) => {
    db.query('SELECT * FROM tasks', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.addTask = (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)', [title, description, 'Pending'], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id: results.insertId, title, description, status: 'Pending' });
    });
};

exports.updateTaskStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    db.query('UPDATE tasks SET status = ? WHERE id = ?', [status, id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ id, status });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Task deleted successfully' });
    });
};
