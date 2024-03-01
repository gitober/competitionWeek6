const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user

router.post('/users/register', registerUser);

// Log in a user

router.post('/users/login', loginUser);

// Get user data

router.get('/users/profile', protect, getMe);

module.exports = router;
