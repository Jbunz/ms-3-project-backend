// src/routes/recruiterRoutes.js
const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

// Recruiter routes
router.get('/developers', recruiterController.getAllDevelopers);

module.exports = router;
