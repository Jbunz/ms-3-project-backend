const express = require('express');
const router = express.Router();
const User = require('../models/User');

// New route for fetching all developers
router.get("/devs", async (req, res) => {
  try {
    const developers = await User.find({ role: "Developer" });
    res.status(200).json(developers);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
