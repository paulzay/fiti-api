const Database = require('../utils/mongodb');
const ExerciseLog = require('../models/exercise_log')

const db = Database.db.collection('exercise_logs');

class ExerciseLogController {

  static async create(req, res) {
    const { duration, exercise, sets, reps, category } = req.body;
    const date = new Date();
    if (!date || !duration || !exercise || !sets || !reps || !category) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const log = new ExerciseLog(date, duration, exercise, sets, reps, category);
    const newLog = await db.insertOne(log);
    return res.status(201).json({ message: 'Log added successfully', data: newLog });
  }

  static async get(req, res) {
    const logs = await db.find().toArray();
    if (!logs) {
      return res.status(404).json({ message: 'No logs found' });
    }
    return res.status(200).json({ data: logs });
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const log = await db.findOne({ _id: id });
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    return res.status(200).json({ data: log });
  }

  static async update(req, res) {
    const { id } = req.params;
    const { date, duration, exercise, sets, reps, category } = req.body;

    const log = await db.findOne({ _id: id });
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }

    const updatedLog = await db.findOneAndUpdate({ _id: id }, { $set: { date, duration, exercise, sets, reps, category } });
    return res.status(200).json({ message: 'Log updated successfully', data: updatedLog });
  }

  static async delete(req, res) {
    const { id } = req.params;
    const log = await db.findOne({ _id: id });
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }
    await db.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Log deleted successfully' });
  }
}

module.exports = ExerciseLogController;
