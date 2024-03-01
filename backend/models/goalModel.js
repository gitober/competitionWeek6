const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  dueDate: {
    type: Date,
    required: true
  },
  priority: {
    type: String,
    required: true,
    enum: ['Low', 'Medium', 'High'] // Only allows these values
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User' // Assuming you have a User model
  }
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;
