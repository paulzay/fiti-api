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
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;