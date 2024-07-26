// src/controllers/developerController.js
const User = require('../models/user');

// Update a developer profile
exports.updateDeveloperProfile = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a developer profile
exports.deleteDeveloperProfile = async (req, res) => {
    try {
        const { id } = req.body;
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'Profile deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
