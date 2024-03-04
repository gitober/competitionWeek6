const express = require('express');
const router = express.Router();
const { getGoals, createGoal, updateGoal, deleteGoal } = require('../controllers/goalController');
const { requireAuth } = require('../middleware/requireAuth');

// require auth for all goal routes
router.use(requireAuth);

// Retrieve all goals
router.get('/', getGoals);

// Create a new goal
router.post('/', createGoal);

// Update a goal
router.put('/:id', updateGoal);

// Delete a goal
router.delete('/:id', deleteGoal);

module.exports = router;