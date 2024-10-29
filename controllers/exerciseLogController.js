const Database = require('../utils/mongodb');
//            

const db = Database.db.collection('exercise_log');

class ExerciseLogController {
  static async create(req, res) {
    const user = req.user;
    const { date, duration, name, sets, reps, type } = req.body;

    if (!date || !duration || !name || !sets || !reps || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // const log = new ExerciseLog(date, duration, name, sets, reps, type, user);
    const newLog = await db.insertOne({ date, duration, name, sets, reps, type, user: user.name.id });
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
    const { date, duration, exercise, sets, reps, type } = req.body;

    const log = await db.findOne({ _id: id });
    if (!log) {
      return res.status(404).json({ message: 'Log not found' });
    }

    const updatedLog = await db.findOneAndUpdate({ _id: id }, { $set: { date, duration, name, sets, reps, type } });
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
  static async getUserLogs(req, res) {
    const user = req.user;
    console.log(user);
    const logs = await db.find({ 'user': user.name.id }).toArray();
    if (!logs) {
      return res.status(404).json({ message: 'No logs found for this user' });
    }
    return res.status(200).json({ data: logs });
  }
  // static createUserLog(req, res) {
  //   const { user } = req.params.id;
  //   const { date, duration, exercise, sets, reps, type } = req.body;
  //   const log = new ExerciseLog(date, duration, exercise, sets, reps, type, user);
  //   db.insertOne(log);
  //   return res.status(201).json({ message: 'Log added successfully', data: log });
  // }
}

module.exports = ExerciseLogController;
