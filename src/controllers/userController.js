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
        console.error("Error occurred:", err); // Detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
};

// Fetch all users
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        console.error("Error occurred:", err); // Detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find and update the user
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error occurred:", err); // Detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the user
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.error("Error occurred:", err); // Detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
};

// Update a developer profile
exports.updateDeveloperProfile = async (req, res) => {
    try {
        const { id, ...updateData } = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error("Error occurred:", err); // Detailed error logging
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
        console.error("Error occurred:", err); // Detailed error logging
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
        console.error("Error occurred:", err); // Detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
};

// Get all developers (for recruiters)
exports.getAllDevelopers = async (req, res) => {
    try {
        const developers = await User.find({ role: 'developer' });
        res.status(200).json(developers);
    } catch (err) {
        console.error("Error occurred:", err); // Detailed error logging
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
        console.error("Error occurred:", err); // Detailed error logging
        res.status(500).json({ error: 'Server error' });
    }
};

// Find developers by language
exports.findDevelopersByLanguage = async (req, res) => {
    try {
        const { languages } = req.query;
        if (!languages) {
            return res.status(400).json({ error: 'Languages query parameter is required' });
        }

        const languageArray = languages.split(',');

        const developers = await User.find({ 
            role: 'developer', 
            'profile.languages': { $in: languageArray }
        });

        const developerIds = developers.map(dev => dev._id);

        res.status(200).json({ developerIds });
    } catch (err) {
        console.error('Error in findDevelopersByLanguage:', err); // Log error details
        res.status(500).json({ error: 'Server error' });
    }
};
