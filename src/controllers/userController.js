// src/controllers/userController.js
const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const { email } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from URL parameters
        const updates = req.body; // Extract updates from request body

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params; // Extract ID from URL parameters

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
