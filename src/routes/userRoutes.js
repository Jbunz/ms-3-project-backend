const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User routes
router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 

// Developer routes
router.get('/developers/by-language', userController.findDevelopersByLanguage);
router.put('/developers/update', userController.updateDeveloperProfile);
router.delete('/developers/delete', userController.deleteDeveloperProfile);
router.post('/developers/assign', userController.assignDeveloperToRecruiter);
router.get('/developers', userController.getAllDevelopers);
router.get('/developers/:recruiterId', userController.getDevelopersForRecruiter);

module.exports = router;
