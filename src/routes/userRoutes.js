// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define your routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
// Add other routes as needed

module.exports = router;
