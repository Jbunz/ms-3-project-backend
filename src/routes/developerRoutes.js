// src/routes/developerRoutes.js
const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');

// Developer routes
router.put('/profile', developerController.updateDeveloperProfile);
router.delete('/profile', developerController.deleteDeveloperProfile);

module.exports = router;
