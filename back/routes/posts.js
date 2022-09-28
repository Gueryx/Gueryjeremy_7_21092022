// Connexions
const express = require('express');
const router = express.Router();

// Importations
const postsCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Route Ctrl pour Post/Ajout une sauce 
router.post('/', auth, multer, postsCtrl.createPost);

// Route Ctrl pour Put pour la modification d'un produit
router.put('/:id', auth, multer, postsCtrl.modifyPost);

// Route pour trouver un seul objet par son id
router.get('/:id', auth, postsCtrl.getOnePost);

// Route pour avoir tout les produits
router.get('/', auth, postsCtrl.getAllPost);

// Route pour la suppression d'un produit
router.delete('/:id', auth, postsCtrl.deletePost);

// Route pour les liked un produit
router.post('/:id/like', auth, postsCtrl.likePost);


module.exports = router;