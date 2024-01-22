// src/routes/userRoutes.js
const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/registerUser', UserController.registerUser);
router.get('/loginUser', UserController.loginUser);
router.get('/getAllUser', UserController.getAllUser);
// router.put('/:id', UserController.updateUser);
// router.delete('/:id', UserController.deleteUser);

module.exports = router;

