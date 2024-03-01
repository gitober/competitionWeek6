const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Register a new user

router.post('/api/users', registerUser);

// Log in a user

router.post('/api/users/login', loginUser);

// Get user data

router.get('/api/users/profile', protect, getMe);

module.exports = router;
