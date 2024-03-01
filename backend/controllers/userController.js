const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password, date_of_birth, phone_number } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, error: 'User already exists' });
    }

    const newUser = await User.create({
      username,
      email,
      password,
      date_of_birth,
      phone_number,
    });

    const token = createToken(newUser._id);

    // Create a response object with only the desired fields
    const responseData = {
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token,
    };

    console.log('User registered:', responseData);
    res.status(201).json({ success: true, data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = createToken(user._id);

    // Create a response object with only the desired fields
    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      token,
    };

    console.log('Login successful.');
    console.log('User data:', responseData);
    res.status(200).json({ success: true, data: responseData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server Error' });
  }
};

// Get user data
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

module.exports = { registerUser, loginUser, getMe };
