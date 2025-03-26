const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// MySQL Database Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Change if using another user
    password: 'shwen24', // Set your MySQL password
    database: 'netflixdb' // Ensure this database exists
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL Database');
});

// Add a new series
app.post('/addSeries', (req, res) => {
    const { title, description, image } = req.body;
    const query = 'INSERT INTO series (title, description, image) VALUES (?, ?, ?)';
    db.query(query, [title, description, image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Series added successfully!', id: result.insertId });
    });
});

// Update a series
app.put('/updateSeries/:id', (req, res) => {
    const { id } = req.params;
    const { title, description, image } = req.body;
    const query = 'UPDATE series SET title = ?, description = ?, image = ? WHERE id = ?';
    db.query(query, [title, description, image, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Series updated successfully!' });
    });
});

// Delete a series
app.delete('/deleteSeries/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM series WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Series deleted successfully!' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
