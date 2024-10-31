const Goal = require('../models/goal');
const { ObjectId } = require('mongodb');
const Database = require('../utils/mongodb');
const db = Database.db.collection('goals');

class GoalController {
  static async create(req, res) {
    const { exerciseMinutes, exerciseFrequency, exerciseType } = req.body;
    const user = req.user;
    if (!exerciseMinutes || !exerciseFrequency || !exerciseType) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // const goal = new Goal({ exerciseMinutes, exerciseFrequency, exerciseType, user: user._id });

    const data = await db.insertOne({ exerciseMinutes, exerciseFrequency, exerciseType, user: user.name.id });
    console.log(data)
    return res.status(201).json({ message: 'Goal created successfully', data });
  }

  static async get(req, res) {
    const data = await db.find().toArray();
    return res.status(200).json({ data });
  }

  static async getOne(req, res) {
    const { id } = req.params;
    const data = await db.findOne({ _id: new ObjectId(id) });
    if (!data) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    return res.status(200).json({ data });
  }

  static async update(req, res) {
    const { id } = req.params;
    const { exerciseMinutes, exerciseFrequency, exerciseType } = req.body;
    const data = await db.findOne({ _id: new ObjectId(id) });
    if (!data) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    const updatedData = await db.findOneAndUpdate({ _id: id }, { $set: { exerciseMinutes, exerciseFrequency, exerciseType } });
    return res.status(200).json({ message: 'Goal updated successfully', data: updatedData });

  }

  static async delete(req, res) {
    const { id } = req.params;
    const data = await db.findOne({ _id: new ObjectId(id) });
    if (!data) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    await db.deleteOne({ _id: id });
    return res.status(200).json({ message: 'Goal deleted successfully' });
  }

  static async getUserGoals(req, res) {
    const user = req.user;
    const data = await db.find({ user: user.name.id }).toArray();
    if (!data) {
      return res.status(404).json({ message: 'No goals found' });
    }
    return res.status(200).json({ data: data });
  }
}

module.exports = GoalController;