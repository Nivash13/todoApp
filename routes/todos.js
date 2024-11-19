const express = require('express');
const router = express.Router();

// Mock data for testing
let todos = [];

// POST /todos - Create a new to-do
router.post('/', (req, res) => {
    const { title, description } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    const todo = { id: todos.length + 1, title, description, completed: false };
    todos.push(todo);
    res.status(201).json(todo);
});

// GET /todos - Retrieve all to-dos
router.get('/', (req, res) => {
    res.status(200).json(todos);
});

// GET /todos/:id - Retrieve a specific to-do
router.get('/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
});

// PUT /todos/:id - Update a specific to-do
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id == req.params.id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const { title, description, completed } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    todo.title = title;
    todo.description = description;
    todo.completed = completed;
    res.status(200).json(todo);
});

// DELETE /todos/:id - Delete a specific to-do
router.delete('/:id', (req, res) => {
    const index = todos.findIndex(t => t.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    todos.splice(index, 1);
    res.status(200).json({ message: 'Todo deleted successfully' });
});

module.exports = router;
