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
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    res.status(200).json({ _id: deletedGoal._id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getGoals, createGoal, updateGoal, deleteGoal };
