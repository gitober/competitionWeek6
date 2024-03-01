const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Assuming you have your JWT secret key stored in your environment variables
const secretKey = process.env.JWT_SECRET;

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from the authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, secretKey);

            // Find user by ID (excluding the password from the result)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error('Authentication error:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

module.exports = { protect };
