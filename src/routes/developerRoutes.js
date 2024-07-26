const express = require('express');
const router = express.Router();
const developerController = require('../controllers/developerController');

router.put('/update', developerController.updateDeveloperProfile);
router.delete('/delete', developerController.deleteDeveloperProfile);
router.post('/assign', developerController.assignDeveloperToRecruiter);

module.exports = router;
