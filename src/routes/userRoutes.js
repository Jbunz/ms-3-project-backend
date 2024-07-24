// src/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.put('/:id', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 

module.exports = router;
