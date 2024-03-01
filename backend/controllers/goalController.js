const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    return res.status(200).json({ success: true, data: goals });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Set goal
// @route   POST /api/goals
// @access  Private
const setGoal = async (req, res, next) => {
  try {
    const newGoal = await Goal.create({ userId: req.user.id, ...req.body });
    return res.status(201).json({ success: true, data: newGoal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = async (req, res, next) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedGoal) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }
    return res.status(200).json({ success: true, data: updatedGoal });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = async (req, res, next) => {
  try {
    const deletedGoal = await Goal.findByIdAndDelete(req.params.id);
    if (!deletedGoal) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }
    return res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};