// routes/postsRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { authMiddleware } = require('../middleware/auth'); // or require the function you use

// Public
router.get('/', postController.getPosts);
router.get('/:id', postController.getPost);

// Protected (requires Authorization: Bearer <idToken>)
router.post('/', authMiddleware, postController.createPost);
router.put('/:id', authMiddleware, postController.updatePost);
router.delete('/:id', authMiddleware, postController.deletePost);

// Optional extra actions
router.post('/:id/like', authMiddleware, postController.toggleLike);
router.post('/:id/bookmark', authMiddleware, postController.toggleBookmark);

module.exports = router;
