const express = require('express');
const router = express.Router();
const { requireAuth, admin } = require('../middleware/requireAuth');
const { signupUser, loginUser, getUsers } = require('../controllers/userController');

// Retrieve all users
router.get('/', requireAuth, admin, getUsers);

// Signup route
router.post('/register', signupUser);

// Login route
router.post('/login', loginUser);

module.exports = router;