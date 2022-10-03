// Connexions
const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

// Créations des routes pour les informations
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/logout', userCtrl.logout);
router.get('/', userCtrl.getAllUsers);
router.get('/:id', userCtrl.getOneUser);
router.put('/:id', userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);

// Exporter le router
module.exports = router;