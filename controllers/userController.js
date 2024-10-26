const Database = require('../utils/mongodb');
const { hashPassword } = require('../utils/methods');

class UserController {
  static async addUser(req, res) {
    const { name, email, password } = req.body;
    const user = await Database.db.collection('users').findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = Database.db.collection('users').insertOne({ name, email, hashedPassword });
    return res.status(201).json({ message: 'User added successfully', data: newUser });
  }

  static async getUsers(req, res) {
    const users = await Database.db.collection('users').find().toArray();
    if (!users) {
      return res.status(404).json({ message: 'No users found' });
    }
    return res.status(200).json({ users });
  }

  static async getUserById(req, res) {
    const { id } = req.params;
    const user = await Database.db.collection('users').findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.status(200).json({ user });
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const user = await Database.db.collection('users').findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const hashedPassword = await hashPassword(password);
    const updatedUser = await Database.db.collection('users').updateOne({ _id: id }, { $set: { name, email, hashedPassword } });
    return res.status(200).json({ message: 'User updated successfully', data: updatedUser });
  }

  static async removeUser(req, res) {
    const { id } = req.params;
    const user = await Database.db.collection('users').findOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const removedUser = await Database.db.collection('users').deleteOne({ _id: id });
    return res.status(200).json({ message: 'User removed successfully', data: removedUser });
  }
}

module.exports = UserController;