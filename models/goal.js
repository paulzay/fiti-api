const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  exerciseMinutes: {
    type: Number,
  },
  exerciseFrequency: {
    type: Number,
  },
  exerciseType: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;