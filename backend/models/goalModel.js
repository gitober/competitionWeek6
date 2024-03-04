const mongoose = require('mongoose');
const { Schema } = mongoose;

const goalSchema = new Schema({
  text: { type: String, required: true },
  dueDate: { type: Date, required: true },
  priority: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Goal', goalSchema);