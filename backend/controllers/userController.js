const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signupUser = async (req, res) => {
  try {
    // Extract user data from the request body
    const { username, email, password, date_of_birth, phone_number, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    // Create a new user with the provided data, including the role
    const user = new User({
      username,
      email,
      password, 
      date_of_birth,
      phone_number,
      roles: role ? [role] : ['user'], // Set the role to 'user' if not provided
    });

    // Save the user to the database
    await user.save();

    // Return user information (no token is generated during signup)
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) throw new Error('Incorrect username');

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error('Incorrect password');

    // Generate a JWT token for the user during login
    const token = jwt.sign({ _id: user._id }, process.env.SECRET, { expiresIn: '3h' });

    res.status(200).json({ _id: user._id, username, email: user.email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { signupUser, loginUser, getUsers };
