const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',  // Change to your DB host
    user: 'root',       // Change to your DB user
    password: 'shwen24',       // Change to your DB password
    database: 'netflixdb'  // Change to your DB name
});

db.connect(err => {
    if (err) {
        console.log('Error connecting to db', err);
    } else {
        console.log('Successfully Connected to db');
    }
});

// Add a series route
app.post('/addSeries', (req, res) => {
    const { title, description, image } = req.body;
    const sql = 'INSERT INTO series (title, description, image) VALUES (?, ?, ?)';
    db.query(sql, [title, description, image], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Series added successfully!', id: result.insertId });
    });
});

// ✅ Corrected: Update a series
app.put('/updateSeries/:id', (req, res) => {
    const { title, description, image } = req.body;
    const { id } = req.params;
    const sql = 'UPDATE series SET title=?, description=?, image=? WHERE id=?';
    
    db.query(sql, [title, description, image, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Series not found' });
        }
        res.json({ message: 'Series updated successfully!' });
    });
});

// ✅ Corrected: Delete a series
app.delete('/deleteSeries/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM series WHERE id=?';

    db.query(sql, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Series not found' });
        }
        res.json({ message: 'Series deleted successfully!' });
    });
});

// Start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
