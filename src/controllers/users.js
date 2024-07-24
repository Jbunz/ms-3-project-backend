// controllers/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example route to get all users
// router.get('/', async (req, res) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server error');
//   }
// });

module.exports = router;
