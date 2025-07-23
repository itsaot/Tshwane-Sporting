const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
  res.json({ token, user });
};

const register = async (req, res) => {
  const { name, email, password, role } = req.body;
  const passwordHash = bcrypt.hashSync(password, 10);
  const newUser = new User({ name, email, passwordHash, role });
  await newUser.save();
  res.status(201).json({ message: 'User created', user: newUser });
};

module.exports = { login, register };
