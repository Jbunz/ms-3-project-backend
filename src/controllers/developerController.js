const User = require('../models/User');

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

// Assign a developer to a recruiter
exports.assignDeveloperToRecruiter = async (req, res) => {
    try {
        const { developerId, recruiterId } = req.body;

        const recruiter = await User.findById(recruiterId);
        if (!recruiter || recruiter.role !== 'recruiter') {
            return res.status(400).json({ error: 'Invalid recruiter' });
        }

        const developer = await User.findByIdAndUpdate(developerId, { recruiter: recruiterId }, { new: true });
        if (!developer || developer.role !== 'developer') {
            return res.status(400).json({ error: 'Invalid developer' });
        }

        res.status(200).json(developer);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
