const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Update a developer profile
router.put('/update', async (req, res) => {
    try {
        const { id, firstName, lastName, email, profile } = req.body;

        if (!id || !profile || !Array.isArray(profile.languages)) {
            return res.status(400).json({ error: 'Invalid request data' });
        }

        const user = await User.findOne({ _id: id, role: 'Developer' });
        if (!user) {
            console.log('User not found or not a Developer');
            return res.status(404).json({ error: 'User not found or not a Developer' });
        }

        await User.updateOne(
            { _id: id, role: 'Developer' },
            {
                $set: {
                    firstName,
                    lastName,
                    email,
                    'profile.languages': profile.languages
                }
            }
        );
        
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);
    } catch (err) {
        console.error('Server Error:', err);
        res.status(500).json({ error: 'Server error' });
    }
});


// Delete a developer profile
router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.body;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Profile deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Assign a developer to a recruiter
router.put("/assign", async (req, res) => {
  try {
    const { developerId, recruiterId } = req.body;

    const recruiter = await User.findById(recruiterId);
    if (!recruiter || recruiter.role !== "recruiter") {
      return res.status(400).json({ error: "Invalid recruiter" });
    }

    const developer = await User.findByIdAndUpdate(
      developerId,
      { recruiter: recruiterId },
      { new: true }
    );
    if (!developer || developer.role !== "developer") {
      return res.status(400).json({ error: "Invalid developer" });
    }

    res.status(200).json(developer);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
