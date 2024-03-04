const Goal = require('../models/goalModel');

const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createGoal = async (req, res) => {
  const { text, dueDate, priority } = req.body;

  try {
    console.log('User ID from token:', req.user._id);

    const goal = await Goal.create({
      text,
      dueDate,
      priority,
      user: req.user._id,
    });

    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const updateGoal = async (req, res) => {
  const { text, dueDate, priority } = req.body;

  try {
    const goal = await Goal.findByIdAndUpdate(
      req.params.id,
      { text, dueDate, priority },
      { new: true }
    );

    res.status(200).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteGoal = async (req, res) => {
  try {
    const goalId = req.params.id;
    console.log('Received goal ID for deletion:', goalId);

    const goal = await Goal.findByIdAndDelete(goalId);

    if (!goal) {
      console.log('Goal not found');
      return res.status(404).json({ error: 'Goal not found' });
    }

    console.log('Goal deleted successfully');
    res.status(200).json({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.error('Error deleting goal:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
