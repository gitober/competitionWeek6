const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/goalController');

// Route for getting goals (GET /api/goals)

router.get('/api/goals', protect, getGoals);

// Route for creating a new goal (POST /api/goals)

router.post('/api/goals', protect, setGoal);

// Route for updating a goal by ID (PUT /api/goals/:id)

router.put('/api/goals/:id', protect, updateGoal);

// Route for deleting a goal by ID (DELETE /api/goals/:id)

router.delete('/api/goals/:id', protect, deleteGoal);

module.exports = router;
