const express = require('express');
const Todo = require('../models/todo');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const newTodo = new Todo({
            title,
            description: description || '',
        });

        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create to-do item' });
    }
});

router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve to-dos' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'To-do not found' });
        }

        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve to-do' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { title, description, completed } = req.body;

        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'To-do not found' });
        }

        if (!title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        todo.title = title;
        todo.description = description || todo.description;
        todo.completed = completed !== undefined ? completed : todo.completed;

        await todo.save();
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update to-do' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);

        if (!todo) {
            return res.status(404).json({ error: 'To-do not found' });
        }

        res.status(200).json({ message: 'To-do item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete to-do' });
    }
});

module.exports = router;
