const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Recipe = require('../models/Recipe');

// Create a new comment
router.post('/', async (req, res) => {
    const { recipeId, user, text } = req.body;
    try {
        const recipe = await Recipe.findById(recipeId);
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }

        const newComment = new Comment({ recipeId, user, text });
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create comment', error });
    }
});

// Get all comments for a recipe
router.get('/:recipeId', async (req, res) => {
    try {
        const comments = await Comment.find({ recipeId: req.params.recipeId });
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get comments', error });
    }
});

module.exports = router;