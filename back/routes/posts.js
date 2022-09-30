// Connexions
const express = require('express');
const router = express.Router();

// Importations
const postsCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');
const auth = require('../middleware/auth');

// Route Ctrl post
router.post('/', auth, multer, postsCtrl.createPost);
router.put('/:id', auth, multer, postsCtrl.modifyPost);
router.get('/:id', auth, postsCtrl.getOnePost);
router.get('/', auth, postsCtrl.getAllPost);
router.delete('/:id', auth, postsCtrl.deletePost);
router.post('/:id/like', auth, postsCtrl.likePost);

// Routes des commentaires
router.patch('/comment-post/:id', auth, postsCtrl.commentPost);
router.patch('/edit-comment-post/:id', auth, postsCtrl.editCommentPost);
router.patch('/delete-comment-post/:id', auth, postsCtrl.deleteCommentPost);

module.exports = router;