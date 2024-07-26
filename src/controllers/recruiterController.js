const User = require('../models/user');

// Get all developers (for recruiters)
exports.getAllDevelopers = async (req, res) => {
    try {
        const developers = await User.find({ role: 'developer' });
        res.status(200).json(developers);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get developers for a specific recruiter
exports.getDevelopersForRecruiter = async (req, res) => {
    try {
        const { recruiterId } = req.params;
        const developers = await User.find({ recruiter: recruiterId, role: 'developer' });
        res.status(200).json(developers);
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
