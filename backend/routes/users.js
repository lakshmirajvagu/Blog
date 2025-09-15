// routes/usersRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authMiddleware } = require('../middleware/auth');

// Protected: current user
router.get('/me', authMiddleware, userController.getMe);
router.put('/me', authMiddleware, userController.updateMe);

// Public: fetch by uid or id and their posts
router.get('/:identifier', userController.getUserProfile);
router.get('/:identifier/posts', userController.getUserPosts);

module.exports = router;
