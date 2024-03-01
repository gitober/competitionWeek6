const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get goals
// @route   GET /api/goals
// @access  Private
const getGoals = async (req, res, next) => {
  try {
    // Assuming the user's ID is stored in req.user._id after authentication
    const goals = await Goal.find({ user: req.user._id });
    console.log('Received data:', req.body)
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
    // Ensure the goal is associated with the authenticated user's ID
    const newGoal = await Goal.create({ user: req.user._id, ...req.body });
    console.log('Created goal:', newGoal)
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
    // Find the goal by ID and ensure it belongs to the user before updating
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });
    console.log('Received data:', req.body);
    
    if (!goal) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log('Updated goal:', updatedGoal)
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
    
    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

    if (!goal) {
      return res.status(404).json({ success: false, error: 'Goal not found' });
    }

    
    console.log("Deleted goal:", goal);

    
    await Goal.findByIdAndDelete(req.params.id);

    
    return res.status(200).json({ success: true, data: goal });
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
