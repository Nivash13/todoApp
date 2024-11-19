const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Failed to connect to MongoDB:', err);
    });

// Import routes
const todosRoutes = require('./routes/todos');

// Register routes
app.use('/todos', todosRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
