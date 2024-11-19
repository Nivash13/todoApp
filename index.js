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

// Root route for base URL
app.get('/', (req, res) => {
    res.send('<h1>Welcome to the To-Do List API</h1><p>Use the following endpoints to interact with the API:</p><ul><li><strong>GET /todos</strong> - Retrieve all to-dos</li><li><strong>POST /todos</strong> - Create a new to-do</li><li><strong>GET /todos/:id</strong> - Retrieve a specific to-do</li><li><strong>PUT /todos/:id</strong> - Update a to-do</li><li><strong>DELETE /todos/:id</strong> - Delete a to-do</li></ul>');
});

// Import and register routes
const todosRoutes = require('./routes/todos');
app.use('/todos', todosRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
