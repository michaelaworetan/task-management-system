const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db'); // Import database connection function
// Import task routes
const taskRoutes = require('./routes/tasks');

const app = express();

// Middleware setup
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to the database
connectDB();

// Use task routes for handling API requests
app.use('/api', taskRoutes);

// Root endpoint for health check
app.get('/', (req, res) => {
    res.send('Task management API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

module.exports = app;
