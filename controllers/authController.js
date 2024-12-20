const Database = require('../utils/mongodb');
const { hashPassword, comparePassword, generateAccessToken } = require('../utils/methods');

class AuthController {
  static async register(req, res) {
    const { name, email, password } = req.body;
    const user = await Database.db.collection('users').findOne({ email });
    if (user) {
      return res.status(200).json({ message: 'User already exists' });
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await Database.db.collection('users').insertOne({ name, email, password: hashedPassword });
    return res.status(201).json({ message: 'User added successfully', data: newUser });
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await Database.db.collection('users').findOne({ email });

    if (!user) {
      return res.status(200).json({ message: 'User not found' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = generateAccessToken({ name: user.name, email: user.email, id: user._id });

    return res.status(200).json({ data: { token: token, user: { name: user.name, email: user.email } } });
  }
}

module.exports = AuthController;
