const express = require('express');
const router = express.Router();
const recruiterController = require('../controllers/recruiterController');

router.get('/developers', recruiterController.getAllDevelopers);
router.get('/:recruiterId/developers', recruiterController.getDevelopersForRecruiter);

module.exports = router;
